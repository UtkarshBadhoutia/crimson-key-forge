import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const openaiApiKey = Deno.env.get('OPENAI_API_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationId, userId } = await req.json();

    // Save user message
    const { error: messageError } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        content: message,
        sender_type: 'user',
        sender_id: userId
      });

    if (messageError) {
      throw new Error(`Failed to save message: ${messageError.message}`);
    }

    // Get conversation history for context
    const { data: messages } = await supabase
      .from('messages')
      .select('content, sender_type')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })
      .limit(10);

    // Prepare conversation context for OpenAI
    const conversationHistory = messages?.map(msg => ({
      role: msg.sender_type === 'user' ? 'user' : 'assistant',
      content: msg.content
    })) || [];

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful customer service assistant for KeyboardHub, an online gaming keyboard and accessories store. Help customers with product information, orders, technical support, and general inquiries. Be friendly, professional, and concise. If a customer needs human assistance for complex issues, let them know they can request to speak with a human agent.'
          },
          ...conversationHistory
        ],
        temperature: 0.7,
        max_tokens: 500
      }),
    });

    const aiResponse = await response.json();
    const aiMessage = aiResponse.choices[0].message.content;

    // Save AI response
    const { error: aiMessageError } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        content: aiMessage,
        sender_type: 'bot',
        metadata: { model: 'gpt-4o-mini' }
      });

    if (aiMessageError) {
      throw new Error(`Failed to save AI message: ${aiMessageError.message}`);
    }

    return new Response(JSON.stringify({ message: aiMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat-ai function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});