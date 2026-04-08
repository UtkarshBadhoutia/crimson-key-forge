import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const faqResponses: Record<string, string> = {
  'shipping': 'We offer free shipping on all orders! Standard delivery takes 3-5 business days. Express shipping (1-2 days) is available at checkout.',
  'return': 'We have a 30-day return policy. Items must be in original condition. Visit our Support page to initiate a return.',
  'warranty': 'All Strafion products come with a 2-year limited warranty covering manufacturing defects.',
  'switch': 'Our keyboards feature hot-swappable switches! You can swap switches without soldering using the included switch puller.',
  'custom': 'Visit our Custom Build page to design your perfect keyboard. Choose your layout, switches, keycaps, and extras!',
  'payment': 'We accept all major credit cards, UPI, net banking, and EMI options for orders above ₹3,000.',
  'track': 'You can track your order from your Profile page under the Orders tab.',
};

const findResponse = (message: string): string => {
  const lower = message.toLowerCase();
  for (const [key, response] of Object.entries(faqResponses)) {
    if (lower.includes(key)) return response;
  }
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
    return "Hello! 👋 I'm Strafion's virtual assistant. I can help with shipping, returns, warranty, switches, custom builds, and payment questions. How can I help?";
  }
  if (lower.includes('price') || lower.includes('cost') || lower.includes('how much')) {
    return "You can find pricing on each product page. Browse our categories: Keyboards, Mice, Audio, and Accessories. Anything specific you're looking for?";
  }
  return "I'm not sure about that. You can reach our support team at support@strafion.com or visit our Support page for more help. Is there anything else I can help with?";
};

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg: ChatMessage = { id: crypto.randomUUID(), content: message.trim(), sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setMessage('');

    // Bot response after short delay
    setTimeout(() => {
      const botMsg: ChatMessage = { id: crypto.randomUUID(), content: findResponse(userMsg.content), sender: 'bot', timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-20 lg:bottom-6 right-6 z-50 hidden md:block">
        <Button onClick={() => setIsOpen(true)} className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow" size="icon">
          <MessageCircle size={24} />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 hidden md:block">
      <Card className="w-80 h-96 flex flex-col shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="font-semibold text-sm">Strafion Assistant</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6">
            <X size={16} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground text-sm py-8">
              <Bot className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Hi! How can I help you today?</p>
              <p className="text-xs mt-2">Ask about shipping, returns, warranty, switches, and more.</p>
            </div>
          )}
          
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
              <div className={`flex items-start gap-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                  msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
                }`}>
                  {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`rounded-lg p-3 ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t p-4">
          <form onSubmit={handleSend} className="flex gap-2">
            <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." className="flex-1" />
            <Button type="submit" size="icon" disabled={!message.trim()}>
              <Send size={16} />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default LiveChat;
