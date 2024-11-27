import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_MESSAGES = {
  analyzer: `You are LLM A, a specialized language model for code analysis.
Your primary responsibilities include:
- Code Parsing: Analyze the user's codebase to identify functions, classes, modules, and their interdependencies.
- Dependency Mapping: Create dependency graphs and module interaction diagrams.
- Code Summarization: Generate concise summaries of code components.
- Data Extraction: Identify areas where the code interacts with datasets and external solvers.
Focus on understanding the overall architecture without modifying the code.`,

  modifier: `You are LLM B, a specialized language model for code modification and refactoring.
Your primary responsibilities include:
- Integration Planning: Determine where and how code should be modified for platform integration.
- Code Refactoring: Generate code modifications that replace external solver calls with platform APIs.
- Dependency Management: Adjust code to handle dependencies compatible with the platform.
- Maintain Functionality: Preserve core functionality while making necessary changes.
Write clear, efficient, and well-documented code following best practices.`,

  communicator: `You are LLM C, a specialized language model for user communication and interaction.
Your primary responsibilities include:
- Explanation Generation: Present findings and code modifications in clear, user-friendly language.
- User Guidance: Walk users through proposed changes, highlighting benefits and addressing concerns.
- Interactive Dialogue: Engage with users to answer questions and gather preferences.
- Documentation: Generate summaries that help users understand the integration process.
Communicate professionally and empathetically, avoiding technical jargon unless appropriate.`
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, fileContent, role = 'communicator' } = await req.json();
    console.log('Processing request with role:', role);

    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    // Select the appropriate system message based on the role
    const systemMessage = fileContent 
      ? `${SYSTEM_MESSAGES[role]}\n\nHere is the current file content:\n\n${fileContent}`
      : SYSTEM_MESSAGES[role];

    // Select the appropriate model based on the role
    const model = role === 'analyzer' ? 'gpt-4o' : 'gpt-4o-mini';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemMessage },
          ...messages
        ],
        stream: true,
      }),
    });

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error in AI assistant function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});