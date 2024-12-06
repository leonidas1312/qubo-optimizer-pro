import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const SYSTEM_MESSAGE = `You are an expert at analyzing and transforming optimization algorithms. Your task is to:

1. First, analyze the provided solver code and explain your findings step by step
2. Then, transform it to match our platform's requirements:
   - Main function should accept (qubo_matrix: np.ndarray, parameters: dict = None)
   - Return tuple: (best_solution, best_cost, costs_per_iteration, elapsed_time)
3. Finally, verify logical equivalence by:
   - Identifying key mathematical operations
   - Ensuring optimization objectives remain unchanged
   - Preserving the core algorithm steps

Format your response like this:
# Analysis
[Your step-by-step analysis]

# Transformed Code
\`\`\`python
[Your transformed code]
\`\`\`

# Verification Steps
[Your verification steps]`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl!, supabaseKey!);

    // Verify the JWT token
    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
    
    if (authError || !user) {
      throw new Error('Invalid authorization token');
    }

    const { code, description } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    console.log('Analyzing solver code with length:', code.length);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: SYSTEM_MESSAGE
          },
          {
            role: 'user',
            content: `Code:\n${code}\n\nDescription:\n${description}`
          }
        ],
        stream: true,
      }),
    });

    // Return the stream
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error in analyze-solver function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }),
      { 
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});