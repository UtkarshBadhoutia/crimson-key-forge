import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  sender_type: string;
  sender_id?: string;
  created_at: string;
  metadata?: any;
}

interface Conversation {
  id: string;
  status: string;
  assigned_agent_id?: string;
  is_bot_conversation: boolean;
}

export const useChat = (userId?: string) => {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  // Initialize conversation
  const initializeConversation = useCallback(async () => {
    if (!userId) return;

    try {
      // Check if user has an active conversation
      const { data: existingConv } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single();

      if (existingConv) {
        setConversation(existingConv);
        loadMessages(existingConv.id);
      } else {
        // Create new conversation
        const { data: newConv, error } = await supabase
          .from('conversations')
          .insert({
            user_id: userId,
            is_bot_conversation: true,
            status: 'active'
          })
          .select()
          .single();

        if (error) throw error;
        setConversation(newConv);
      }
    } catch (error) {
      console.error('Error initializing conversation:', error);
      toast({
        title: "Error",
        description: "Failed to initialize chat",
        variant: "destructive",
      });
    }
  }, [userId, toast]);

  // Load messages
  const loadMessages = useCallback(async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  }, []);

  // Send message
  const sendMessage = useCallback(async (content: string) => {
    if (!conversation || !userId) return;

    setIsLoading(true);
    setIsTyping(true);

    try {
      if (conversation.is_bot_conversation) {
        // Send to AI bot
        const { data, error } = await supabase.functions.invoke('chat-ai', {
          body: {
            message: content,
            conversationId: conversation.id,
            userId: userId
          }
        });

        if (error) throw error;
      } else {
        // Save message for human agent
        const { error } = await supabase
          .from('messages')
          .insert({
            conversation_id: conversation.id,
            content: content,
            sender_type: 'user',
            sender_id: userId
          });

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }, [conversation, userId, toast]);

  // Request human agent
  const requestHumanAgent = useCallback(async () => {
    if (!conversation) return;

    try {
      const { error } = await supabase
        .from('conversations')
        .update({ 
          is_bot_conversation: false,
          status: 'active'
        })
        .eq('id', conversation.id);

      if (error) throw error;

      // Add system message
      await supabase
        .from('messages')
        .insert({
          conversation_id: conversation.id,
          content: 'Customer has requested to speak with a human agent.',
          sender_type: 'bot',
          metadata: { system: true }
        });

      setConversation(prev => prev ? { ...prev, is_bot_conversation: false } : null);
      
      toast({
        title: "Agent Requested",
        description: "We're connecting you with a human agent. Please wait...",
      });
    } catch (error) {
      console.error('Error requesting human agent:', error);
      toast({
        title: "Error",
        description: "Failed to request human agent",
        variant: "destructive",
      });
    }
  }, [conversation, toast]);

  // Real-time subscription
  useEffect(() => {
    if (!conversation?.id) return;

    const channel = supabase
      .channel('messages-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversation.id}`
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new as Message]);
          setIsTyping(false);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversation?.id]);

  useEffect(() => {
    if (userId) {
      initializeConversation();
    }
  }, [userId, initializeConversation]);

  return {
    conversation,
    messages,
    isLoading,
    isTyping,
    sendMessage,
    requestHumanAgent,
    initializeConversation
  };
};