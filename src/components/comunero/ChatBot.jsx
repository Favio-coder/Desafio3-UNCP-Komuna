import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, RefreshCw, MessageCircle, Phone, QrCode, Copy, Check } from 'lucide-react';
import { iniciarSesion, enviarMensaje, resetConversacion } from '../../services/api';
import ReactMarkdown from 'react-markdown';
import whatsappImage from '../../assets/whatsapp.jpeg';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [copied, setCopied] = useState(false);
  const messagesEndRef = useRef(null);

  // Número de Twilio WhatsApp Sandbox
  const WHATSAPP_NUMBER = "+14155238886";
  const JOIN_CODE = "join driven-tea";

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

  const handleWhatsAppClick = () => {
    // URL de WhatsApp con el código pre-llenado
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(JOIN_CODE)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(JOIN_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Chat Principal */}
      <div className="flex-1 flex flex-col h-[600px] bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-600 p-4 text-white">
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
            💡 Ejemplo: "Mis cuyes están muriendo por las heladas"
          </p>
        </div>
      </div>

      {/* Sidebar - WhatsApp Integration */}
      <div className="w-full lg:w-80 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
          <div className="flex items-center space-x-2">
            <MessageCircle size={24} />
            <h3 className="font-bold">WhatsApp KomuBot</h3>
          </div>
          <p className="text-xs opacity-90 mt-1">Chatea también por WhatsApp</p>
        </div>

        {/* Imagen de WhatsApp */}
        <div className="p-4 border-b">
          <img 
            src={whatsappImage} 
            alt="Escanea el código QR de WhatsApp"
            className="w-full h-48 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Código QR y número */}
        <div className="p-4 space-y-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-xl mb-3">
              <QrCode size={32} className="text-gray-600" />
            </div>
            <p className="text-sm text-gray-600 font-medium">Escanea el código QR</p>
            <p className="text-xs text-gray-400">o sigue estos pasos:</p>
          </div>

          {/* Pasos para conectar */}
          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
              <span className="text-gray-700">Guarda el número:</span>
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center space-x-1 text-green-600 hover:text-green-700 font-medium"
              >
                <Phone size={14} />
                <span className="text-sm">{WHATSAPP_NUMBER}</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
              <span className="text-gray-700">Envía el código:</span>
              <button
                onClick={handleCopyCode}
                className="flex items-center space-x-1 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-lg transition-colors"
              >
                <code className="text-sm font-mono">{JOIN_CODE}</code>
                {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
              </button>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">3</span>
              <span className="text-gray-700">¡Listo! Empieza a chatear</span>
            </div>
          </div>

          {/* Botón principal de WhatsApp */}
          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center space-x-2 font-medium shadow-md"
          >
            <MessageCircle size={18} />
            <span>Chatear por WhatsApp</span>
          </button>

          <p className="text-xs text-gray-400 text-center mt-2">
            Respuesta inmediata • Asistencia 24/7
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;