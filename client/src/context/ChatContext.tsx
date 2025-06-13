import React, { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { Message, ModuleType } from '../types';
import { initialMessages, initialActiveModule, initialIsTyping } from './initialChatState';

// Define a type for chat session to be stored in the sidebar
export interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messages: Message[];
}

// UUID generator for session IDs (moved here for global access if needed)
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Create a mock session for demo purposes (can be adapted for real sessions later)
const createSession = (title: string, lastMessage: string, messages: Message[] = []): ChatSession => {
  return {
    id: generateId(),
    title,
    lastMessage,
    timestamp: new Date(),
    messages,
  };
};

interface ChatState {
  messages: Message[];
  activeModule: ModuleType;
  isTyping: boolean;
  sessions: ChatSession[];
  activeSessionId: string | null;
}

interface ChatContextType {
  // Main chat states and actions
  main: ChatState;
  taskManager: ChatState;
  
  // Current active context (main or taskManager)
  activeContext: 'main' | 'taskManager';
  setActiveContext: (context: 'main' | 'taskManager') => void;

  // Actions for the currently active context
  addMessage: (message: Message, context?: 'main' | 'taskManager') => void;
  setActiveModule: (moduleType: ModuleType, context?: 'main' | 'taskManager') => void;
  setTyping: (typing: boolean, context?: 'main' | 'taskManager') => void;
  clearMessages: (context?: 'main' | 'taskManager') => void;
  addSession: (session: ChatSession, context?: 'main' | 'taskManager') => void;
  setActiveSession: (sessionId: string, context?: 'main' | 'taskManager') => void;
  updateSessionMessages: (sessionId: string, newMessages: Message[], context?: 'main' | 'taskManager') => void;
  
  // Publicly expose the session creation utility
  createSession: (title: string, lastMessage: string, messages?: Message[]) => ChatSession;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initial states for main and taskManager contexts
  const [mainState, setMainState] = useState<ChatState>({
    messages: initialMessages,
    activeModule: initialActiveModule,
    isTyping: initialIsTyping,
    sessions: [createSession('Default Chat', 'Welcome to SmartRecommend!', initialMessages)],
    activeSessionId: null,
  });

  const [taskManagerState, setTaskManagerState] = useState<ChatState>({
    messages: [], // Task Manager starts with no messages
    activeModule: 'home', // Default for now, can be updated if needed
    isTyping: false,
    sessions: [createSession('Task 1', 'Break down project X')], // Initial task manager session
    activeSessionId: null,
  });

  const [activeContext, internalSetActiveContext] = useState<'main' | 'taskManager'>('main');

  // Set initial active session IDs
  useEffect(() => {
    setMainState(prev => ({
      ...prev,
      activeSessionId: prev.sessions[0]?.id || null
    }));
    setTaskManagerState(prev => ({
      ...prev,
      activeSessionId: prev.sessions[0]?.id || null
    }));
  }, []); // Run only once on mount

  const getCurrentStateAndSetter = (contextOverride?: 'main' | 'taskManager'): [ChatState, React.Dispatch<React.SetStateAction<ChatState>>] => {
    const current = contextOverride || activeContext;
    return current === 'main'
      ? [mainState, setMainState]
      : [taskManagerState, setTaskManagerState];
  };

  const addMessage = useCallback((message: Message, contextOverride?: 'main' | 'taskManager') => {
    const [currentState, setCurrentState] = getCurrentStateAndSetter(contextOverride);
    setCurrentState((prev: ChatState) => {
      const updatedMessages = [...prev.messages, message];
      const updatedSessions = prev.sessions.map((session: ChatSession) =>
        session.id === prev.activeSessionId
          ? { ...session, messages: updatedMessages, lastMessage: message.content, timestamp: new Date() }
          : session
      );
      return { ...prev, messages: updatedMessages, sessions: updatedSessions };
    });
  }, [activeContext]);

  const setActiveModule = useCallback((moduleType: ModuleType, contextOverride?: 'main' | 'taskManager') => {
    const [currentState, setCurrentState] = getCurrentStateAndSetter(contextOverride);
    setCurrentState((prev: ChatState) => ({ ...prev, activeModule: moduleType }));
  }, [activeContext]);

  const setTyping = useCallback((typing: boolean, contextOverride?: 'main' | 'taskManager') => {
    const [currentState, setCurrentState] = getCurrentStateAndSetter(contextOverride);
    setCurrentState((prev: ChatState) => ({ ...prev, isTyping: typing }));
  }, [activeContext]);

  const clearMessages = useCallback((contextOverride?: 'main' | 'taskManager') => {
    const [currentState, setCurrentState] = getCurrentStateAndSetter(contextOverride);
    setCurrentState((prev: ChatState) => {
      const clearedMessages = contextOverride === 'taskManager' ? [] : initialMessages;
      const updatedSessions = prev.sessions.map((session: ChatSession) =>
        session.id === prev.activeSessionId
          ? { ...session, messages: clearedMessages, lastMessage: 'Conversation cleared.', timestamp: new Date() }
          : session
      );
      return { ...prev, messages: clearedMessages, sessions: updatedSessions };
    });
  }, [activeContext]);

  const addSession = useCallback((session: ChatSession, contextOverride?: 'main' | 'taskManager') => {
    const [currentState, setCurrentState] = getCurrentStateAndSetter(contextOverride);
    setCurrentState((prev: ChatState) => ({ ...prev, sessions: [session, ...prev.sessions], activeSessionId: session.id, messages: session.messages }));
  }, [activeContext]);

  const setActiveSession = useCallback((sessionId: string, contextOverride?: 'main' | 'taskManager') => {
    const [currentState, setCurrentState] = getCurrentStateAndSetter(contextOverride);
    setCurrentState((prev: ChatState) => {
      const selectedSession = prev.sessions.find(s => s.id === sessionId);
      return { ...prev, activeSessionId: sessionId, messages: selectedSession ? selectedSession.messages : [] };
    });
  }, [activeContext]);
  
  const updateSessionMessages = useCallback((sessionId: string, newMessages: Message[], contextOverride?: 'main' | 'taskManager') => {
    const [currentState, setCurrentState] = getCurrentStateAndSetter(contextOverride);
    setCurrentState((prev: ChatState) => ({
      ...prev,
      sessions: prev.sessions.map((session: ChatSession) =>
        session.id === sessionId ? { ...session, messages: newMessages, lastMessage: newMessages[newMessages.length - 1]?.content || session.lastMessage } : session
      ),
      messages: prev.activeSessionId === sessionId ? newMessages : prev.messages, // Update displayed messages if active session
    }));
  }, [activeContext]);

  const value = {
    main: mainState,
    taskManager: taskManagerState,
    activeContext,
    setActiveContext: internalSetActiveContext,
    addMessage,
    setActiveModule,
    setTyping,
    clearMessages,
    addSession,
    setActiveSession,
    updateSessionMessages,
    createSession,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
