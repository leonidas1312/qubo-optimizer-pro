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