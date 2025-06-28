import mongoose, { Schema, Document } from 'mongoose';

interface Subtask {
  id: string;
  description: string;
  status: string;
  required_info: string[];
  collected_info: Record<string, string>;
}

interface Message {
  role: string;
  content: string;
  timestamp?: Date;
}

export interface TaskSessionDocument extends Document {
  intent: string;
  subtasks: Subtask[];
  messages: Message[];
  createdAt: Date;
}

const SubtaskSchema = new Schema<Subtask>({
  id: String,
  description: String,
  status: String,
  required_info: [String],
  collected_info: Object,
});

const MessageSchema = new Schema<Message>({
  role: String,
  content: String,
  timestamp: { type: Date, default: Date.now }
});

const TaskSessionSchema = new Schema<TaskSessionDocument>({
  intent: String,
  subtasks: [SubtaskSchema],
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<TaskSessionDocument>('TaskSession', TaskSessionSchema); 