import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const MAX_CODE_SIZE = 10000;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are an expert at analyzing and transforming optimization algorithms. Your task is to:

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
    const { code, description } = await req.json();

    if (!code || code.length > MAX_CODE_SIZE) {
      throw new Error(`Code size exceeds maximum limit of ${MAX_CODE_SIZE} characters`);
    }

    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    console.log('Processing code analysis request...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `Code:\n${code}\n\nDescription:\n${description}` }
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData}`);
    }

    // Set up streaming response
    const stream = response.body;
    const reader = stream?.getReader();
    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        if (!reader) return;
        
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const text = new TextDecoder().decode(value);
            const lines = text.split('\n');
            
            for (const line of lines) {
              if (line.trim() === '') continue;
              if (line.trim() === 'data: [DONE]') continue;
              
              if (line.startsWith('data: ')) {
                try {
                  const json = JSON.parse(line.slice(6));
                  const content = json.choices[0]?.delta?.content || '';
                  if (content) {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
                  }
                } catch (e) {
                  console.error('Error parsing JSON:', e);
                }
              }
            }
          }
        } catch (error) {
          console.error('Error reading stream:', error);
          controller.error(error);
        } finally {
          controller.close();
          reader.releaseLock();
        }
      },
    });

    return new Response(readableStream, {
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