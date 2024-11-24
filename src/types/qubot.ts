export interface Selection {
  start: number;
  end: number;
  text: string;
}

export interface QubotInput {
  name: string;
  description?: string;
  repository_url?: string | null;
  file_path?: string | null;
  input_parameters: Record<string, any>[];
  cost_function?: string | null;
  algorithm_logic?: string | null;
  is_public: boolean;
}