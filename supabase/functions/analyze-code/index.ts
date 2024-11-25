import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GPT4All } from 'https://esm.sh/gpt4all@2.2.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code } = await req.json();

    // Initialize GPT4All with a local model
    const gpt4all = new GPT4All('gpt4all-j-v1.3-groovy');
    await gpt4all.load();

    // Generate analysis of the code
    const prompt = `Analyze this Python optimization algorithm and provide feedback:
    ${code}
    
    Focus on:
    1. Algorithm correctness
    2. Performance considerations
    3. Potential improvements`;

    const response = await gpt4all.generate(prompt, {
      maxTokens: 500,
      temperature: 0.7,
    });

    await gpt4all.cleanup();

    return new Response(
      JSON.stringify({ analysis: response }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});