import React, { useState, useEffect } from 'react';
import { useChatContext } from '@/context/ChatContext';
import { Message } from '../types';
import { analyzeUserTask, processFollowUp, areAllSubtasksCompleted, getCurrentConversationTitle } from '../services/deepseekService';

interface Subtask {
  id: string;
  description: string;
  status: 'pending' | 'completed' | 'needs_more_info';
  required_info: string[];
  collected_info: Record<string, string>;
}

interface TaskState {
  intent: string;
  subtasks: Subtask[];
  currentSubtaskIndex: number;
}

const TaskManager: React.FC = () => {
  const { taskManager, addMessage, setTyping, createSession, addSession, setActiveSession } = useChatContext();
  const { messages, activeSessionId, sessions, isTyping } = taskManager;

  const [currentInput, setCurrentInput] = useState('');
  const [currentTask, setCurrentTask] = useState<TaskState | null>(null);

  const analyzeUserInput = async (input: string) => {
    try {
      setTyping(true, 'taskManager');
      const analysis = await analyzeUserTask(input);

      setCurrentTask({
        intent: analysis.intent,
        subtasks: analysis.subtasks,
        currentSubtaskIndex: 0,
      });

      addMessage({
        role: 'assistant',
        content: `**${analysis.conversation_title || 'New Task'}**\n${analysis.response_to_user}`,
      }, 'taskManager');

    } catch (error) {
      console.error('Error analyzing user task:', error);
      addMessage({
        role: 'system',
        content: 'Sorry, I encountered an error while analyzing your request.'
      }, 'taskManager');
    } finally {
      setTyping(false, 'taskManager');
    }
  };

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
      // Process follow-up
      try {
        setTyping(true, 'taskManager');
        const analysis = await processFollowUp(currentInput);
        
        // Update current task with new subtask statuses/info
        setCurrentTask(prev => prev ? { ...prev, subtasks: analysis.subtasks, currentSubtaskIndex: prev.currentSubtaskIndex + 1 } : null);

        addMessage({
          role: 'assistant',
          content: analysis.response_to_user
        }, 'taskManager');

        if (areAllSubtasksCompleted()) {
          addMessage({
            role: 'assistant',
            content: `All subtasks are completed for: **${getCurrentConversationTitle()}**`
          }, 'taskManager');
          // Reset for new conversation
          setCurrentTask(null);
        }

      } catch (error) {
        console.error('Error processing follow-up:', error);
        addMessage({
          role: 'system',
          content: 'Sorry, I encountered an error while processing your response.'
        }, 'taskManager');
      } finally {
        setTyping(false, 'taskManager');
      }
    }

    setCurrentInput('');
  };

  const handleNewSession = () => {
    const newSession = createSession('New Task Manager Session', 'Start a new task here.', []);
    addSession(newSession, 'taskManager');
    setActiveSession(newSession.id, 'taskManager');
    setCurrentTask(null); // Reset task for new session
    setCurrentInput('');
  };

  return (
    <div className="flex flex-col h-full bg-gray-800 text-white">
      <header className="bg-gray-900 p-4 flex items-center justify-between shadow-md">
        <h1 className="text-xl font-bold">Task Manager</h1>
        <button
          onClick={handleNewSession}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out"
        >
          New Task
        </button>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xl p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-700' : 'bg-gray-700'}`}
            >
              <p className="font-semibold">{message.role === 'user' ? 'You' : 'Assistant'}:</p>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-xl p-3 rounded-lg bg-gray-700">
              <p className="font-semibold">Assistant:</p>
              <p>Typing...</p>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 bg-gray-900 border-t border-gray-700">
        <form onSubmit={handleUserInput} className="flex space-x-2">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder="Type your task or response..."
            className="flex-1 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskManager; 