import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, fileContent } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    // Create an assistant
    const assistantResponse = await fetch('https://api.openai.com/v1/assistants', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify({
        name: "Code Assistant",
        instructions: "You are a specialized AI assistant for analyzing and modifying code.",
        tools: [{ type: "code_interpreter" }],
        model: "gpt-4o"
      })
    });

    const assistant = await assistantResponse.json();

    // Create a thread
    const threadResponse = await fetch('https://api.openai.com/v1/threads', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      }
    });

    const thread = await threadResponse.json();

    // Add a message to the thread
    await fetch(`https://api.openai.com/v1/threads/${thread.id}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify({
        role: "user",
        content: messages[messages.length - 1].content
      })
    });

    // Run the assistant
    const runResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/runs`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify({
        assistant_id: assistant.id
      })
    });

    const run = await runResponse.json();

    // Stream the response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        while (true) {
          const statusResponse = await fetch(
            `https://api.openai.com/v1/threads/${thread.id}/runs/${run.id}`,
            {
              headers: {
                'Authorization': `Bearer ${openAIApiKey}`,
                'OpenAI-Beta': 'assistants=v2'
              }
            }
          );

          const status = await statusResponse.json();

          if (status.status === 'completed') {
            const messagesResponse = await fetch(
              `https://api.openai.com/v1/threads/${thread.id}/messages`,
              {
                headers: {
                  'Authorization': `Bearer ${openAIApiKey}`,
                  'OpenAI-Beta': 'assistants=v2'
                }
              }
            );

            const messages = await messagesResponse.json();
            const lastMessage = messages.data[0];

            controller.enqueue(encoder.encode(JSON.stringify({
              content: lastMessage.content[0].text.value,
              status: 'completed'
            })));
            controller.close();
            break;
          } else if (status.status === 'failed') {
            throw new Error('Assistant run failed');
          }

          // Wait before checking again
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });

  } catch (error) {
    console.error('Error in AI assistant function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});