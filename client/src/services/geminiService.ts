import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

// Configuration for the model
const MODEL_CONFIG = {
  model: 'gemini-1.5-flash',
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 2048,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
};

console.log('VITE_GEMINI_API_KEY:', import.meta.env.VITE_GEMINI_API_KEY);

// Types for our conversation state
interface Subtask {
  id: string;
  description: string;
  status: 'pending' | 'completed' | 'needs_more_info';
  required_info: string[];
  collected_info: string[];
}

interface TaskAnalysis {
  type: 'subtask_breakdown' | 'follow_up' | 'summary';
  intent: string;
  subtasks: Subtask[];
  response_to_user: string;
  current_subtask_id?: string;
  next_subtask_id?: string;
}

interface ConversationState {
  history: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
  }>;
  currentTask: {
    intent: string;
    subtasks: Subtask[];
    currentSubtaskIndex: number;
  } | null;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const validateTaskAnalysis = (analysis: any): analysis is TaskAnalysis => {
  if (!analysis || typeof analysis !== 'object') return false;
  if (!analysis.type || !['subtask_breakdown', 'follow_up', 'summary'].includes(analysis.type)) return false;
  if (!analysis.intent || typeof analysis.intent !== 'string') return false;
  if (!Array.isArray(analysis.subtasks)) return false;
  if (!analysis.response_to_user || typeof analysis.response_to_user !== 'string') return false;
  
  return analysis.subtasks.every((subtask: any) => 
    typeof subtask === 'object' &&
    typeof subtask.id === 'string' &&
    typeof subtask.description === 'string' &&
    ['pending', 'completed', 'needs_more_info'].includes(subtask.status) &&
    Array.isArray(subtask.required_info) &&
    Array.isArray(subtask.collected_info)
  );
};

// Global conversation state
let conversationState: ConversationState = {
  history: [],
  currentTask: null
};

const getSystemPrompt = () => `
You are SmartRecommend, an AI assistant designed to help users break down complex requests into manageable subtasks.
Your goal is to gather all necessary information by asking clear, concise follow-up questions, one subtask at a time.
Maintain a friendly and helpful tone. Always remember past user input and the status of each subtask.

Guidelines:
1. Break down complex requests into logical, atomic subtasks
2. Ask one question at a time
3. Validate user responses and ask for clarification when needed
4. Keep track of conversation context
5. Provide clear, actionable responses
6. Use a friendly, professional tone
7. Acknowledge user input and confirm understanding
8. Guide users through the process step by step
`;

const getInitialBreakdownPrompt = (userInput: string) => `
${getSystemPrompt()}

The user has provided the following request: "${userInput}"

Your task is to:
1. Identify the main intent of the request
2. Break it down into logical, atomic subtasks
3. For each subtask, identify the required information
4. Prioritize the subtasks in a logical order
5. Ask the first question about the first subtask

Return your response in the following JSON format:
{
  "type": "subtask_breakdown",
  "intent": "string (one of: shopping, travel, hotel, forex)",
  "subtasks": [
    {
      "id": "string (unique identifier)",
      "description": "string (clear description of the subtask)",
      "status": "pending",
      "required_info": ["list", "of", "required", "information"],
      "collected_info": []
    }
  ],
  "response_to_user": "string (friendly introduction, explain the subtasks, and ask the first question about the first subtask)"
}

IMPORTANT: Your response_to_user MUST include:
1. A friendly greeting
2. A brief explanation of how you'll help
3. A clear question about the first piece of information needed for the first subtask
`;

const getFollowUpPrompt = (userInput: string, currentState: ConversationState) => {
  if (!currentState.currentTask) {
    throw new Error('No active task found');
  }

  const currentSubtask = currentState.currentTask.subtasks[currentState.currentTask.currentSubtaskIndex];
  
  return `
${getSystemPrompt()}

Current Task Context:
- Intent: ${currentState.currentTask.intent}
- Current Subtask: ${currentSubtask.description}
- Status: ${currentSubtask.status}
- Required Info: ${currentSubtask.required_info.join(', ')}
- Collected Info: ${currentSubtask.collected_info.join(', ')}

User's latest response: "${userInput}"

Your task is to:
1. Evaluate if the user's response provides all required information for the current subtask
2. If yes:
   - Mark the current subtask as completed
   - Move to the next subtask
   - Ask a clear question about the next required information
3. If no:
   - Identify missing information
   - Ask a specific follow-up question about the missing information
4. Update the conversation state accordingly

Return your response in the following JSON format:
{
  "type": "follow_up",
  "intent": "${currentState.currentTask.intent}",
  "subtasks": [updated subtasks array],
  "response_to_user": "string (acknowledge the user's response and ask the next question)",
  "current_subtask_id": "${currentSubtask.id}",
  "next_subtask_id": "string or null"
}

IMPORTANT: Your response_to_user MUST:
1. Acknowledge the user's previous response
2. Ask a clear, specific question about the next required information
3. If moving to a new subtask, briefly explain what information you need next
`;
};

const getSummaryPrompt = (currentState: ConversationState) => {
  if (!currentState.currentTask) {
    throw new Error('No active task found');
  }

  return `
${getSystemPrompt()}

All subtasks have been completed. Please provide a comprehensive summary of the collected information.

Task Context:
- Intent: ${currentState.currentTask.intent}
- Completed Subtasks: ${JSON.stringify(currentState.currentTask.subtasks, null, 2)}

Return your response in the following JSON format:
{
  "type": "summary",
  "intent": "${currentState.currentTask.intent}",
  "subtasks": [final subtasks array],
  "response_to_user": "string (comprehensive summary of all collected information and next steps)"
}

IMPORTANT: Your response_to_user MUST:
1. Thank the user for providing all the information
2. Provide a clear summary of all collected information
3. Suggest next steps or actions
4. Ask if there's anything else the user needs help with
`;
};

export const analyzeUserTask = async (userInput: string): Promise<TaskAnalysis> => {
  let lastError: Error | null = null;
  
  // Add user input to conversation history
  conversationState.history.push({
    role: 'user',
    content: userInput,
    timestamp: Date.now()
  });
  
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const model = genAI.getGenerativeModel(MODEL_CONFIG);
      
      // Determine which prompt to use based on conversation state
      const prompt = !conversationState.currentTask
        ? getInitialBreakdownPrompt(userInput)
        : getFollowUpPrompt(userInput, conversationState);

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      
      // Attempt to extract JSON from a markdown block if present
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        text = jsonMatch[1];
      } else {
        text = text.trim();
      }

      // Parse and validate the JSON response
      const analysis = JSON.parse(text);
      
      if (!validateTaskAnalysis(analysis)) {
        throw new Error('Invalid response format from Gemini');
      }

      // Update conversation state
      if (analysis.type === 'subtask_breakdown') {
        conversationState.currentTask = {
          intent: analysis.intent,
          subtasks: analysis.subtasks,
          currentSubtaskIndex: 0
        };
      } else if (analysis.type === 'follow_up') {
        if (conversationState.currentTask) {
          conversationState.currentTask.subtasks = analysis.subtasks;
          if (analysis.next_subtask_id) {
            const nextIndex = analysis.subtasks.findIndex(st => st.id === analysis.next_subtask_id);
            if (nextIndex !== -1) {
              conversationState.currentTask.currentSubtaskIndex = nextIndex;
            }
          }
        }
      }

      // Add assistant response to conversation history
      conversationState.history.push({
        role: 'assistant',
        content: analysis.response_to_user,
        timestamp: Date.now()
      });

      return analysis;
    } catch (error) {
      lastError = error as Error;
      console.warn(`Attempt ${attempt} failed:`, error);
      
      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY * attempt);
      }
    }
  }

  throw new Error(`Failed to analyze task after ${MAX_RETRIES} attempts: ${lastError?.message}`);
};

export const generateSummary = async (): Promise<TaskAnalysis> => {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const model = genAI.getGenerativeModel(MODEL_CONFIG);
      const prompt = getSummaryPrompt(conversationState);

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      
      // Attempt to extract JSON from a markdown block if present
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        text = jsonMatch[1];
      } else {
        text = text.trim();
      }

      // Parse and validate the JSON response
      const analysis = JSON.parse(text);
      
      if (!validateTaskAnalysis(analysis)) {
        throw new Error('Invalid response format from Gemini');
      }

      // Add summary to conversation history
      conversationState.history.push({
        role: 'assistant',
        content: analysis.response_to_user,
        timestamp: Date.now()
      });

      // Reset conversation state
      conversationState.currentTask = null;

      return analysis;
    } catch (error) {
      lastError = error as Error;
      console.warn(`Attempt ${attempt} failed:`, error);
      
      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY * attempt);
      }
    }
  }

  throw new Error(`Failed to generate summary after ${MAX_RETRIES} attempts: ${lastError?.message}`);
};

// Helper function to check if all subtasks are completed
export const areAllSubtasksCompleted = (): boolean => {
  if (!conversationState.currentTask) return false;
  
  return conversationState.currentTask.subtasks.every(
    subtask => subtask.status === 'completed'
  );
};

// Helper function to get the current subtask
export const getCurrentSubtask = (): Subtask | null => {
  if (!conversationState.currentTask) return null;
  
  return conversationState.currentTask.subtasks[conversationState.currentTask.currentSubtaskIndex];
};

// Helper function to get conversation history
export const getConversationHistory = () => {
  return conversationState.history;
}; 