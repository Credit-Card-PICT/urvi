import React, { useState, useEffect } from 'react';
import { useChatContext } from '@/context/ChatContext';
import { Message } from '../types';
import { analyzeUserTask, generateSummary } from '../services/geminiService';

interface Subtask {
  id: string;
  question: string;
  answer?: string;
}

interface TaskAnalysis {
  intent: string;
  subtasks: Subtask[];
}

const TaskManager: React.FC = () => {
  const { taskManager, addMessage, setTyping, setActiveContext } = useChatContext();
  const { messages, isTyping } = taskManager;
  const [currentInput, setCurrentInput] = useState('');
  const [currentTask, setCurrentTask] = useState<TaskAnalysis | null>(null);
  const [currentSubtaskIndex, setCurrentSubtaskIndex] = useState(0);
  const [conversationMemory, setConversationMemory] = useState<Record<string, string>>({});

  useEffect(() => {
    setActiveContext('taskManager');
    // Clean up when component unmounts
    return () => {
      setActiveContext('main');
    };
  }, [setActiveContext]);

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

  // Handle user input
  const handleUserInput = async () => {
    if (!currentInput.trim()) return;

    // Add user message
    addMessage({
      role: 'user',
      content: currentInput
    }, 'taskManager');

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

    setCurrentInput('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Chat messages display area */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-blue-100 ml-auto' 
                  : message.role === 'system'
                  ? 'bg-gray-100'
                  : 'bg-white'
              } max-w-[80%] shadow-sm`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="p-4 border-t bg-white">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isTyping) {
                handleUserInput();
              }
            }}
            placeholder={isTyping ? 'Processing...' : 'Type your message...'}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isTyping}
          />
          <button
            onClick={handleUserInput}
            disabled={isTyping}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskManager; 