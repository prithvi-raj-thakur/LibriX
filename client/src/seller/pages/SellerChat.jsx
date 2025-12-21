import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Search, 
  IndianRupee,
  Check,
  CheckCheck,
  ArrowLeft,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

// ✅ Dummy conversations
const sampleConversations = [
  {
    id: '1',
    user_name: 'Amit Kumar',
    last_message: 'Is Clean Code available?',
    last_message_time: new Date().toISOString(),
    unread: 2,
    avatar: 'AK'
  },
  {
    id: '2',
    user_name: 'Priya Sharma',
    last_message: 'I can offer ₹400 for it',
    last_message_time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    unread: 0,
    avatar: 'PS'
  },
  {
    id: '3',
    user_name: 'Rahul Verma',
    last_message: 'Thanks, I\'ll pick it up tomorrow',
    last_message_time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    unread: 0,
    avatar: 'RV'
  }
];

// ✅ Dummy messages
const sampleMessages = [
  { id: '1', sender_id: 'buyer', message: 'Hi, is Clean Code available?', created_date: new Date(Date.now() - 30 * 60 * 1000).toISOString() },
  { id: '2', sender_id: 'seller', message: 'Yes, it\'s available! It\'s in great condition.', created_date: new Date(Date.now() - 28 * 60 * 1000).toISOString() },
  { id: '3', sender_id: 'buyer', message: 'What\'s the price?', created_date: new Date(Date.now() - 25 * 60 * 1000).toISOString() },
  { id: '4', sender_id: 'seller', message: 'I\'ve listed it for ₹450. But I can do ₹420 if you pick it up today.', created_date: new Date(Date.now() - 22 * 60 * 1000).toISOString() },
  { id: '5', sender_id: 'buyer', message: 'Can you do ₹400?', created_date: new Date(Date.now() - 10 * 60 * 1000).toISOString(), message_type: 'counter_offer', offer_amount: 400 },
];

export default function SellerChat() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(sampleMessages);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setMessages([...messages, {
      id: Date.now().toString(),
      sender_id: 'seller',
      message,
      created_date: new Date().toISOString()
    }]);
    setMessage('');
  };

  const handleSendOffer = (amount) => {
    setMessages([...messages, {
      id: Date.now().toString(),
      sender_id: 'seller',
      message: `I can accept ₹${amount}`,
      message_type: 'offer',
      offer_amount: amount,
      created_date: new Date().toISOString()
    }]);
  };

  const filteredConversations = sampleConversations.filter(conv =>
    conv.user_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-64px)] bg-slate-50 flex">
      {/* Conversations List */}
      <div className={`w-full md:w-80 lg:w-96 bg-white border-r border-slate-200 flex flex-col ${selectedConversation ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="divide-y divide-slate-100">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`w-full p-4 text-left hover:bg-slate-50 ${
                  selectedConversation?.id === conv.id ? 'bg-indigo-50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                      {conv.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-semibold">{conv.user_name}</span>
                      <span className="text-xs text-slate-400">
                        {format(new Date(conv.last_message_time), 'HH:mm')}
                      </span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-sm text-slate-500 truncate">{conv.last_message}</p>
                      {conv.unread > 0 && (
                        <Badge className="bg-indigo-600 text-white text-xs">
                          {conv.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col ${!selectedConversation ? 'hidden md:flex' : 'flex'}`}>
        {selectedConversation ? (
          <>
            {/* Header */}
            <div className="bg-white border-b p-4 flex items-center gap-3">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSelectedConversation(null)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                  {selectedConversation.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">{selectedConversation.user_name}</h3>
                <p className="text-xs text-green-600">Online</p>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5 text-slate-400" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <AnimatePresence>
                {messages.map((msg) => {
                  const isSeller = msg.sender_id === 'seller';
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${isSeller ? 'justify-end' : 'justify-start'} mb-3`}
                    >
                      <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        isSeller ? 'bg-indigo-600 text-white' : 'bg-white border'
                      }`}>
                        {msg.message_type && (
                          <div className="text-xs mb-1 opacity-80">
                            ₹{msg.offer_amount}
                          </div>
                        )}
                        <p>{msg.message}</p>
                        <div className="text-xs text-right opacity-70 flex justify-end gap-1">
                          {format(new Date(msg.created_date), 'HH:mm')}
                          {isSeller && <CheckCheck className="w-3 h-3" />}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                <div ref={messagesEndRef} />
              </AnimatePresence>
            </ScrollArea>

            {/* Quick Actions */}
            <div className="bg-white border-t p-2 flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleSendOffer(400)}>
                <Check className="w-3 h-3 mr-1" /> Accept ₹400
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleSendOffer(420)}>
                <IndianRupee className="w-3 h-3 mr-1" /> Counter ₹420
              </Button>
            </div>

            {/* Input */}
            <div className="bg-white border-t p-4 flex gap-3">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} disabled={!message.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-slate-500">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}
