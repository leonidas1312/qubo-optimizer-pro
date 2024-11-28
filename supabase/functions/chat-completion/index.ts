import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, command, fileContent, fileName } = await req.json();
    console.log('Processing chat completion request:', { command, fileName });

    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    let systemMessage = 'You are a helpful AI assistant that helps users understand and modify code.';
    
    if (command === 'ADD_SOLVER') {
      systemMessage = `You are a specialized AI for analyzing and adapting solver code.
      Your task is to analyze the provided code and suggest modifications to make it compatible with our platform's solver format.
      
      Guidelines:
      1. The solver must have a main function with the same name as the file (without extension)
      2. It must accept a QUBO matrix and optional parameters as input
      3. It must return a tuple: (best_solution, best_cost, costs_per_iteration, elapsed_time)
      4. Parameters should be consistent with other solvers
      
      Current file: ${fileName}
      
      Please analyze the code and provide:
      1. Required modifications to match our format
      2. Any potential issues or optimizations
      3. Example of how to use the modified solver`;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(error.error?.message || 'Failed to get response from OpenAI');
    }

    const data = await response.json();
    console.log('OpenAI API response:', data);

    return new Response(JSON.stringify({
      id: data.id,
      content: data.choices[0].message.content,
      additional_kwargs: {},
      response_metadata: {
        tokenUsage: data.usage,
        finish_reason: data.choices[0].finish_reason,
        system_fingerprint: data.system_fingerprint
      },
      tool_calls: [],
      invalid_tool_calls: [],
      usage_metadata: {
        input_tokens: data.usage.prompt_tokens,
        output_tokens: data.usage.completion_tokens,
        total_tokens: data.usage.total_tokens
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat completion function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});