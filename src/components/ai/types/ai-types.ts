export interface AIResponseMetadata {
  tokenUsage?: {
    completionTokens: number;
    promptTokens: number;
    totalTokens: number;
  };
  finish_reason?: string;
  system_fingerprint?: string;
}

export interface AIResponse {
  id: string;
  content: string;
  additional_kwargs: Record<string, unknown>;
  response_metadata: AIResponseMetadata;
  tool_calls: unknown[];
  invalid_tool_calls: unknown[];
  usage_metadata: {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
  };
}