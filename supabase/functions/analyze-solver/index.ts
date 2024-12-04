import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are an expert at analyzing and transforming optimization algorithms. Your task is to:

1. Analyze the provided solver code and understand its core logic
2. Transform it to match our platform's requirements:
   - Main function should accept (qubo_matrix: np.ndarray, parameters: dict = None)
   - Return tuple: (best_solution, best_cost, costs_per_iteration, elapsed_time)
3. Verify logical equivalence by:
   - Identifying key mathematical operations
   - Ensuring optimization objectives remain unchanged
   - Preserving the core algorithm steps
   - Adding detailed comments explaining the transformation

Provide both the transformed code and verification steps that prove logical equivalence.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, description } = await req.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `Code:\n${code}\n\nDescription:\n${description}` }
        ],
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze code');
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Parse the AI response to extract code and verification steps
    const codeMatch = aiResponse.match(/```python\n([\s\S]*?)```/);
    const transformedCode = codeMatch ? codeMatch[1] : '';
    
    // Extract verification steps (everything after the code block)
    const verificationSteps = aiResponse
      .split('```')[2]
      .trim()
      .split('\n')
      .filter(step => step.trim().length > 0);

    return new Response(
      JSON.stringify({
        transformedCode,
        verificationSteps,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in analyze-solver function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});