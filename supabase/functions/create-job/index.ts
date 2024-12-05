import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { solver, dataset, hardware, userId } = await req.json();

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

    // Get solver, dataset, and hardware details
    const [solverData, datasetData, hardwareData] = await Promise.all([
      supabase.from('solvers').select('*').eq('id', solver.id).single(),
      supabase.from('datasets').select('*').eq('id', dataset.id).single(),
      supabase.from('hardware_providers').select('*').eq('id', hardware.id).single(),
    ]);

    // Generate optimized code using LLM
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are an expert at optimizing and integrating solver code. Generate code that:
1. Uses the Supabase client to fetch the dataset
2. Configures and uses the specified hardware
3. Implements the solver logic with proper error handling
4. Returns results in the expected format`
          },
          {
            role: 'user',
            content: `Create optimized code using:
Solver: ${JSON.stringify(solverData)}
Dataset: ${JSON.stringify(datasetData)}
Hardware: ${JSON.stringify(hardwareData)}`
          }
        ],
      }),
    });

    const llmResponse = await response.json();
    const generatedCode = llmResponse.choices[0].message.content;

    // Create job record
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .insert({
        creator_id: userId,
        name: `${solver.name} on ${dataset.name}`,
        solver_id: solver.id,
        dataset_id: dataset.id,
        hardware_id: hardware.id,
        configuration: {
          generated_code: generatedCode,
          solver_config: solver,
          dataset_config: dataset,
          hardware_config: hardware
        }
      })
      .select()
      .single();

    if (jobError) throw jobError;

    return new Response(
      JSON.stringify({ job }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in create-job function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});