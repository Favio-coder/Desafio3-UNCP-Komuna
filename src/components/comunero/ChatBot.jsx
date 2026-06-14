import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, RefreshCw } from 'lucide-react';
import { iniciarSesion, enviarMensaje, resetConversacion } from '../../services/api';
import ReactMarkdown from 'react-markdown';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    initChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const initChat = async () => {
    try {
      const response = await iniciarSesion();
      setSessionId(response.session_id);
      setMessages([{ text: response.mensaje, isUser: false }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([{ 
        text: '❌ Error al conectar. Por favor, recarga la página.', 
        isUser: false 
      }]);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await enviarMensaje(userMessage);
      setMessages(prev => [...prev, { text: response.mensaje, isUser: false }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: '❌ Error al procesar tu mensaje. Por favor, intenta de nuevo.', 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    setIsLoading(true);
    try {
      const response = await resetConversacion();
      setMessages([{ text: response.mensaje, isUser: false }]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-4 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bot size={24} />
            <div>
              <h2 className="font-bold">KomuBot</h2>
              <p className="text-xs opacity-90">Asistente virtual</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="Nueva conversación"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex space-x-2 max-w-[80%] ${msg.isUser ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.isUser ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                {msg.isUser ? <User size={16} className="text-white" /> : <Bot size={16} className="text-gray-600" />}
              </div>
              <div className={`p-3 rounded-lg ${
                msg.isUser 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-800 shadow-sm'
              }`}>
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                    em: ({ children }) => <em className="italic">{children}</em>,
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe tu problema o necesidad..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Ejemplo: "Mis cuyes están muriendo por las heladas"
        </p>
      </div>
    </div>
  );
};

export default ChatBot;