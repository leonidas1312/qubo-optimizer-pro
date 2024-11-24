export interface Selection {
  start: number;
  end: number;
  text: string;
}

export interface QubotInput {
  name: string;
  description?: string;
  repository_url?: string;
  file_path?: string;
  input_parameters: Record<string, any>[];
  cost_function?: string;
  algorithm_logic?: string;
  is_public: boolean;
}