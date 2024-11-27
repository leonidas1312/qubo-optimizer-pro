export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface Repository {
  owner: string;
  name: string;
}

export interface ChatHeaderProps {
  selectedFile: string | null;
}

export interface ChatInputProps {
  onSend: (content: string) => Promise<void>;
  isLoading: boolean;
  placeholder?: string;
}

export interface ChatMessageProps {
  message: Message;
}

export interface AIAssistantSidebarProps {
  onFileSelect: (path: string, repo: Repository) => void;
}