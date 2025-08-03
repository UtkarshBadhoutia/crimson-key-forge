import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useChat } from '@/hooks/useChat';
import { supabase } from '@/integrations/supabase/client';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { 
    conversation, 
    messages, 
    isLoading, 
    isTyping, 
    sendMessage, 
    requestHumanAgent 
  } = useChat(user?.id);

  useEffect(() => {
    // Get current user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const messageToSend = message.trim();
    setMessage('');
    await sendMessage(messageToSend);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderMessage = (msg: any) => {
    const isUser = msg.sender_type === 'user';
    const isBot = msg.sender_type === 'bot';
    const isSystem = msg.metadata?.system;

    if (isSystem) {
      return (
        <div key={msg.id} className="flex justify-center my-4">
          <Badge variant="secondary" className="text-xs">
            {msg.content}
          </Badge>
        </div>
      );
    }

    return (
      <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`flex items-start gap-2 max-w-[80%] ${isUser ? 'flex-row-reverse' : ''}`}>
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? 'bg-primary text-primary-foreground' : 
            isBot ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground'
          }`}>
            {isUser ? <User size={16} /> : isBot ? <Bot size={16} /> : <Headphones size={16} />}
          </div>
          <div className={`rounded-lg p-3 ${
            isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
          }`}>
            <p className="text-sm">{msg.content}</p>
            <p className={`text-xs mt-1 opacity-70`}>
              {formatTime(msg.created_at)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
          size="icon"
        >
          <MessageCircle size={24} />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 h-96 flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="font-semibold text-sm">
              {conversation?.is_bot_conversation ? 'AI Assistant' : 'Customer Support'}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-6 w-6"
          >
            <X size={16} />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground text-sm py-8">
              <Bot className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Hi! How can I help you today?</p>
            </div>
          )}
          
          {messages.map(renderMessage)}
          
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t p-4">
          {conversation?.is_bot_conversation && (
            <div className="mb-3">
              <Button
                variant="outline"
                size="sm"
                onClick={requestHumanAgent}
                className="text-xs"
              >
                <Headphones size={14} className="mr-1" />
                Speak with Human Agent
              </Button>
            </div>
          )}
          
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading || !user}
              className="flex-1"
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={isLoading || !message.trim() || !user}
            >
              <Send size={16} />
            </Button>
          </form>
          
          {!user && (
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Please sign in to use live chat
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default LiveChat;