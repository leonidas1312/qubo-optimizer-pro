import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple code analysis function that doesn't rely on external ML models
function analyzeCode(code: string) {
  const analysis = {
    inputParameters: [] as string[],
    costFunction: "",
    algorithmLogic: "",
    suggestions: [] as string[],
  };

  // Split code into lines for analysis
  const lines = code.split('\n');
  
  // Basic pattern matching for common Python patterns
  lines.forEach((line, index) => {
    // Look for function definitions with parameters
    if (line.includes('def ')) {
      const match = line.match(/def\s+(\w+)\s*\((.*?)\)/);
      if (match) {
        const [_, funcName, params] = match;
        if (params) {
          analysis.inputParameters.push(...params.split(',').map(p => p.trim()));
        }
      }
    }

    // Look for cost function patterns
    if (line.toLowerCase().includes('cost') || line.toLowerCase().includes('objective')) {
      let costBlock = '';
      for (let i = index; i < Math.min(index + 5, lines.length); i++) {
        costBlock += lines[i] + '\n';
      }
      if (!analysis.costFunction) {
        analysis.costFunction = costBlock.trim();
      }
    }

    // Look for algorithm logic patterns
    if (line.includes('while') || line.includes('for') || 
        line.includes('if') || line.includes('return')) {
      let logicBlock = '';
      for (let i = index; i < Math.min(index + 10, lines.length); i++) {
        logicBlock += lines[i] + '\n';
      }
      if (!analysis.algorithmLogic) {
        analysis.algorithmLogic = logicBlock.trim();
      }
    }
  });

  // Add basic suggestions
  if (!analysis.costFunction) {
    analysis.suggestions.push("Consider adding a clear cost/objective function");
  }
  if (!analysis.inputParameters.length) {
    analysis.suggestions.push("Consider documenting input parameters");
  }
  if (!analysis.algorithmLogic) {
    analysis.suggestions.push("Add core algorithm logic with proper control flow");
  }

  return analysis;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code } = await req.json();
    
    if (!code) {
      throw new Error('No code provided');
    }

    console.log('Analyzing code...');
    const analysis = analyzeCode(code);
    console.log('Analysis complete:', analysis);

    return new Response(
      JSON.stringify(analysis),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error in analyze-code function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});