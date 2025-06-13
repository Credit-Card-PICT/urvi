import React, { useState, useRef, useEffect } from 'react';
import { useChatContext } from '@/context/ChatContext';
import { Message } from '../types';
import { analyzeUserTask, generateSummary } from '../services/geminiService';

const NAVBAR_HEIGHT_PX = 64; // Adjust if your navbar is taller/shorter

interface Subtask {
  id: string;
  question: string;
  answer?: string;
}

interface TaskAnalysis {
  intent: string;
  subtasks: Subtask[];
}

const TaskManagerPage: React.FC = () => {
  const { taskManager, addMessage, setTyping, createSession, addSession, setActiveSession, updateSessionMessages } = useChatContext();
  const { messages, activeSessionId, sessions, isTyping } = taskManager;

  const [currentInput, setCurrentInput] = useState('');
  const [currentTask, setCurrentTask] = useState<TaskAnalysis | null>(null);
  const [currentSubtaskIndex, setCurrentSubtaskIndex] = useState(0);
  const [conversationMemory, setConversationMemory] = useState<Record<string, string>>({});
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  // Function to analyze user input using Gemini
  const analyzeUserInput = async (input: string) => {
    try {
      setTyping(true, 'taskManager');
      
      const analysis = await analyzeUserTask(input);
      setCurrentTask(analysis);
      setCurrentSubtaskIndex(0);
      
      // Add system message about number of subtasks
      addMessage({
        role: 'system',
        content: `I've broken down your request into ${analysis.subtasks.length} subtasks. Let's go through them one by one.`
      }, 'taskManager');

      // Add first question
      addMessage({
        role: 'assistant',
        content: analysis.subtasks[0].question
      }, 'taskManager');

    } catch (error) {
      console.error('Error analyzing input:', error);
      addMessage({
        role: 'system',
        content: 'Sorry, I encountered an error while analyzing your request.'
      }, 'taskManager');
    } finally {
      setTyping(false, 'taskManager');
    }
  };

  // Generate summary from conversation memory
  const generateSummaryFromMemory = async () => {
    try {
      setTyping(true, 'taskManager');
      const summary = await generateSummary(conversationMemory);
      return summary;
    } catch (error) {
      console.error('Error generating summary:', error);
      return 'Error generating summary. Please try again.';
    } finally {
      setTyping(false, 'taskManager');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    // Add user message
    const userMessage: Message = { role: 'user', content: currentInput };
    const updatedMessages = [...messages, userMessage];
    updateSessionMessages(activeSessionId!, updatedMessages, 'taskManager');
    setCurrentInput(''); // Clear the input field immediately

    if (!currentTask) {
      // First message - analyze the task
      await analyzeUserInput(currentInput);
    } else {
      // Store answer for current subtask
      const currentSubtask = currentTask.subtasks[currentSubtaskIndex];
      setConversationMemory(prev => ({
        ...prev,
        [currentSubtask.id]: currentInput
      }));

      // Move to next subtask or finish
      if (currentSubtaskIndex < currentTask.subtasks.length - 1) {
        setCurrentSubtaskIndex(prev => prev + 1);
        addMessage({
          role: 'assistant',
          content: currentTask.subtasks[currentSubtaskIndex + 1].question
        }, 'taskManager');
      } else {
        // Generate and display summary
        const summary = await generateSummaryFromMemory();
        addMessage({
          role: 'assistant',
          content: `Here's a summary of your request:\n${summary}`
        }, 'taskManager');
        
        // Reset for new conversation
        setCurrentTask(null);
        setCurrentSubtaskIndex(0);
        setConversationMemory({});
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-indigo-50 dark:bg-indigo-900/30 relative">
      {/* Messages area - adjusted padding to account for fixed navbar */}
      <div
        className="flex-1 overflow-y-auto px-0 sm:px-0 md:px-0 pb-32 max-w-2xl w-full mx-auto"
        style={{ paddingTop: `${NAVBAR_HEIGHT_PX + 16}px` }} // 16px extra for spacing
      >
        <div className="flex flex-col gap-4 p-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 dark:text-gray-500 mt-12 text-lg">
              Start by entering your main task or project below.
            </div>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={
                msg.role === 'user'
                  ? 'self-end max-w-[80%] bg-indigo-600 text-white rounded-xl px-5 py-3 shadow-md text-base font-medium animate-fade-in'
                  : 'self-start max-w-[80%] bg-white dark:bg-gray-800 border border-indigo-100 dark:border-indigo-700 rounded-xl px-5 py-3 shadow-sm text-gray-800 dark:text-gray-100 text-base font-medium animate-fade-in'
              }
              style={{ wordBreak: 'break-word' }}
            >
              {msg.content}
            </div>
          ))}
          <div ref={messagesEndRef} style={{ scrollMarginTop: `${NAVBAR_HEIGHT_PX + 16}px` }} />
        </div>
      </div>

      {/* Input bar at the bottom */}
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 left-0 w-full flex justify-center bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4 z-20"
        style={{ boxShadow: '0 -2px 16px 0 rgba(0,0,0,0.04)' }}
      >
        <div className="flex w-full max-w-2xl items-center px-4">
          <input
            type="text"
            value={currentInput}
            onChange={e => setCurrentInput(e.target.value)}
            placeholder={isTyping ? 'LLM is typing...' : 'Ask about tasks, sub-tasks, or project breakdown...'}
            className="flex-1 text-lg px-4 py-3 rounded-l-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition"
            autoFocus
            disabled={isTyping}
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-r-xl transition-colors duration-200 text-lg shadow"
            disabled={isTyping}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskManagerPage; 