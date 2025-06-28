// This file is responsible for all communication with the DeepSeek LLM (Large Language Model)
// via the Hugging Face Inference API.
import axios from 'axios';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY; // OpenRouter API key
console.log('[DeepSeekService] API Key present:', !!OPENROUTER_API_KEY);
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'; // OpenRouter endpoint
const OPENROUTER_MODEL = 'deepseek-ai/deepseek-chat';

// Types for our conversation state
interface Subtask {
  id: string; // Unique identifier for the subtask
  description: string; // Description of the subtask
  status: 'pending' | 'completed' | 'needs_more_info'; // Status of the subtask
  required_info: string[]; // List of required information for the subtask
  collected_info: Record<string, string>; // Collected information for the subtask
}

interface TaskAnalysis {
  type: 'subtask_breakdown' | 'follow_up' | 'summary'; // Type of the task analysis
  intent: string; // Intent of the task
  subtasks: Subtask[]; // List of subtasks
  response_to_user: string; // Response to the user
  current_subtask_id?: string; // Current subtask ID
  next_subtask_id?: string; // Next subtask ID
  conversation_title?: string; // Title of the conversation
}

interface Message {
  role: 'user' | 'assistant'; // Role of the message
  content: string; // Content of the message
  timestamp?: number; // Optional, as not all messages might have it
}

interface ConversationState {
  history: Message[]; // History of the conversation
  currentTask: {
    intent: string; // Intent of the task
    subtasks: Subtask[]; // List of subtasks
    currentSubtaskIndex: number; // Index of the current subtask
    conversationTitle: string; // Title of the conversation
  } | null; // Current task
}

// Global conversation state
let conversationState: ConversationState = {
  history: [], // History of the conversation
  currentTask: null // Current task
};

// This is the base prompt for the DeepSeek LLM.
const getBasePrompt = () => `You are a helpful assistant that breaks down user tasks into subtasks. You should return a JSON object with the following structure:
{
  "type": "subtask_breakdown",
  "intent": "user's main goal",
  "conversation_title": "A concise title for this conversation",
  "subtasks": [
    {
      "id": "unique_id",
      "description": "detailed description",
      "status": "pending",
      "required_info": ["list of required information"],
      "collected_info": {}
    }
  ],
  "response_to_user": "A friendly response acknowledging the task"
}

If the user asks a casual question not related to task management, respond naturally without the JSON structure.`;

// Helper to format messages for OpenRouter
const formatMessagesForOpenRouter = (messages: Message[]): { role: string; content: string }[] => {
  return messages.map(msg => ({
    role: msg.role,
    content: msg.content,
  }));
};

console.log('[DeepSeekService] Using OpenRouter API URL:', OPENROUTER_API_URL);
console.log('[DeepSeekService] Using OpenRouter Model:', OPENROUTER_MODEL);
console.log('[DeepSeekService] API Key present:', !!OPENROUTER_API_KEY);

// This function analyzes the user's task and returns a TaskAnalysis object.
export async function analyzeUserTask(userInput: string, conversationHistory: Message[] = []): Promise<TaskAnalysis> {
  console.log('[analyzeUserTask] userInput:', userInput);
  console.log('[analyzeUserTask] conversationHistory:', conversationHistory);
  const currentMessages: Message[] = [
    { role: 'user', content: `${getBasePrompt()}\n\nPlease break down the following task into subtasks: ${userInput}` },
  ];
  const formattedMessages = formatMessagesForOpenRouter([
    ...conversationHistory,
    ...currentMessages
  ]);
  console.log('[analyzeUserTask] formattedMessages:', formattedMessages);
  try {
    const response = await axios.post(OPENROUTER_API_URL, {
      model: OPENROUTER_MODEL,
      messages: formattedMessages,
    }, {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('[analyzeUserTask] API response:', response.data);
    const text = response.data.choices?.[0]?.message?.content || '';
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(text);
      console.log('[analyzeUserTask] Parsed JSON response:', parsedResponse);
    } catch (e) {
      console.warn('[analyzeUserTask] Response is not JSON. Raw text:', text);
      // If the response isn't JSON, it's a casual conversation
      return {
        type: 'subtask_breakdown',
        intent: 'casual',
        subtasks: [],
        response_to_user: text,
        conversation_title: 'Casual Conversation'
      };
    }
    // Update conversation state
    conversationState.currentTask = {
      intent: parsedResponse.intent,
      subtasks: parsedResponse.subtasks,
      currentSubtaskIndex: 0,
      conversationTitle: parsedResponse.conversation_title || 'New Task'
    };
    // Add to conversation history
    conversationState.history.push({
      role: 'user',
      content: userInput,
      timestamp: Date.now()
    });
    conversationState.history.push({
      role: 'assistant',
      content: parsedResponse.response_to_user,
      timestamp: Date.now()
    });
    return parsedResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('[analyzeUserTask] API Error:', error.response?.status, error.message, error.response?.data);
      throw new Error(`Failed to fetch response from OpenRouter API: ${error.response?.data?.error || error.message}`);
    } else {
      console.error('[analyzeUserTask] Unknown Error:', error);
      throw error;
    }
  }
}

// This function processes the user's follow-up question and returns a TaskAnalysis object.
export async function processFollowUp(userInput: string): Promise<TaskAnalysis> {
  if (!conversationState.currentTask) {
    console.error('[processFollowUp] No active task found');
    throw new Error('No active task found');
  }
  console.log('[processFollowUp] userInput:', userInput);
  const messages: Message[] = [
    { role: 'user', content: `Given the following subtasks: ${JSON.stringify(conversationState.currentTask.subtasks)}, \nand the user's response: ${userInput},\nplease provide the next question or update the task status.` },
  ];
  const formattedMessages = formatMessagesForOpenRouter([
    ...conversationState.history,
    ...messages
  ]);
  console.log('[processFollowUp] formattedMessages:', formattedMessages);
  try {
    const response = await axios.post(OPENROUTER_API_URL, {
      model: OPENROUTER_MODEL,
      messages: formattedMessages,
    }, {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('[processFollowUp] API response:', response.data);
    const text = response.data.choices?.[0]?.message?.content || '';
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(text);
      console.log('[processFollowUp] Parsed JSON response:', parsedResponse);
    } catch (e) {
      console.warn('[processFollowUp] Response is not JSON. Raw text:', text);
      // If the response isn't JSON, it's a casual conversation
      return {
        type: 'follow_up',
        intent: 'casual',
        subtasks: conversationState.currentTask.subtasks,
        response_to_user: text,
        conversation_title: conversationState.currentTask.conversationTitle
      };
    }
    // Update conversation state
    conversationState.currentTask.subtasks = parsedResponse.subtasks;
    conversationState.currentTask.currentSubtaskIndex++;
    // Add to conversation history
    conversationState.history.push({
      role: 'user',
      content: userInput,
      timestamp: Date.now()
    });
    conversationState.history.push({
      role: 'assistant',
      content: parsedResponse.response_to_user,
      timestamp: Date.now()
    });
    return parsedResponse;
  } catch (error) {
    console.error('[processFollowUp] Error:', error);
    throw error;
  }
}

// This function checks if all subtasks are completed.
export const areAllSubtasksCompleted = (): boolean => {
  if (!conversationState.currentTask) return false;
  
  return conversationState.currentTask.subtasks.every(
    subtask => subtask.status === 'completed'
  );
};

// This function gets the current subtask.
export const getCurrentSubtask = (): Subtask | null => {
  if (!conversationState.currentTask) return null;
  
  return conversationState.currentTask.subtasks[conversationState.currentTask.currentSubtaskIndex];
};

// This function gets the conversation history.
export const getConversationHistory = () => {
  return conversationState.history;
};

// This function gets the current conversation title.
export const getCurrentConversationTitle = (): string => {
  return conversationState.currentTask?.conversationTitle || 'New Task';
};

export const resetConversationState = () => {
  conversationState = {
    history: [],
    currentTask: null,
  };
}; 