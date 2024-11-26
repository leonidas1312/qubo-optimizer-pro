export interface ChatMessage {
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
}