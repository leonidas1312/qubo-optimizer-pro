import OpenAI from "https://deno.land/x/openai@v4.50.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
});

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

    if (!code) {
      throw new Error('No code provided');
    }

    console.log('Processing code analysis request...');
    console.log('Code length:', code.length);

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Code:\n${code}\n\nDescription:\n${description}` }
      ],
      stream: true,
      temperature: 0.1,
      max_tokens: 2000,
    });

    // Create a readable stream that processes the OpenAI response
    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of response.toReadableStream()) {
          const text = JSON.stringify(chunk);
          controller.enqueue(encoder.encode(`data: ${text}\n\n`));
        }
        controller.close();
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