import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const MAX_CODE_SIZE = 10000; // Maximum characters for code input

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

    // Validate input size
    if (!code || code.length > MAX_CODE_SIZE) {
      throw new Error(`Code size exceeds maximum limit of ${MAX_CODE_SIZE} characters`);
    }

    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    console.log('Processing code analysis request...');

    // Set up AbortController for timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000); // 25 second timeout

    try {
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
          max_tokens: 2000,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('OpenAI API error:', errorData);
        throw new Error(`OpenAI API error: ${errorData}`);
      }

      const data = await response.json();
      console.log('Successfully received OpenAI response');

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
      clearTimeout(timeout);
      if (error.name === 'AbortError') {
        throw new Error('Request timed out after 25 seconds');
      }
      throw error;
    }

  } catch (error) {
    console.error('Error in analyze-solver function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        details: error instanceof Error ? error.stack : undefined
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});