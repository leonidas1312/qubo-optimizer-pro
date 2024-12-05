export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
  };
}

export interface ChatHeaderProps {
  selectedFile: string | null;
  selectedRepo?: string | null;
}

export interface ChatInputProps {
  onSend: (content: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export interface ChatMessageProps {
  message: Message;
}

export interface ChatContainerProps {
  messages: Message[];
  showFilePreview: boolean;
  generatedFileContent: string | null;
  setShowFilePreview: (show: boolean) => void;
  onSendMessage: (content: string) => void;
}