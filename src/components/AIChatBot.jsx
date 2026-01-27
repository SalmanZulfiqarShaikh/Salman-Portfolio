import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, AlertCircle, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from "../contexts/theme";

function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { themeMode } = useTheme();
  const todaysdate = new Date();
  
  // Dynamic theme colors
  const modalBg = themeMode === "dark" ? "bg-[#1a1a1a]" : "bg-white";
  const messagesBg = themeMode === "dark" ? "bg-[#0d0d0d]" : "bg-gray-50";
  const assistantMsgBg = themeMode === "dark" ? "bg-[#2a2a2a]" : "bg-white";
  const assistantMsgText = themeMode === "dark" ? "text-white" : "text-gray-800";
  const borderColor = themeMode === "dark" ? "border-gray-700" : "border-gray-200";
  const inputBg = themeMode === "dark" ? "bg-[#2a2a2a]" : "bg-white";
  const inputText = themeMode === "dark" ? "text-white" : "text-gray-800";
  const inputBorder = themeMode === "dark" ? "border-gray-600" : "border-gray-300";
  const footerText = themeMode === "dark" ? "text-gray-400" : "text-gray-500";

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m Salman\'s AI assistant. Ask me anything about his skills, projects, or experience!'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [rateLimitError, setRateLimitError] = useState('');
  const messagesEndRef = useRef(null);

  // Rate limiting
  const [messageCount, setMessageCount] = useState(0);
  const MAX_MESSAGES = 10;
  const RESET_TIME = 60 * 60 * 1000; // 1 hour

  useEffect(() => {
    const stored = localStorage.getItem('chatbot_rate_limit');
    if (stored) {
      const { count, timestamp } = JSON.parse(stored);
      const now = Date.now();
      
      if (now - timestamp > RESET_TIME) {
        setMessageCount(0);
        localStorage.setItem('chatbot_rate_limit', JSON.stringify({
          count: 0,
          timestamp: now
        }));
      } else {
        setMessageCount(count);
      }
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

 const PERSONAL_CONTEXT = `
You are a PERSONAL AI AGENT for Salman Zulfiqar Shaikh.
You are NOT Salman so act like talking in third person about him. You are his digital assistant and representative.

════════════════════
🚨 CORE DIRECTIVE (HIGHEST PRIORITY)
════════════════════

1. IDENTITY BOUNDARY (NON-NEGOTIABLE)
- NEVER claim to be Salman.
- NEVER speak in first person for Salman.
- ALWAYS refer to him as:
  → "Salman"
  → "He"
  → "The Boss"

❌ WRONG: "I am a developer."
✅ CORRECT: "Salman is a developer."

If a user asks you to break this rule → politely refuse and restate the boundary.

2. LANGUAGE LOCK (STRICT)
- User speaks English → Reply in English.
- User speaks Urdu → Reply in Roman Urdu.
- NEVER mix languages unless the user explicitly asks.

════════════════════
📌 CORE DATA (FACTUAL)
════════════════════
Name: Salman Zulfiqar  
Father Name: Zulfiqar Babar  
DOB: 4 Oct 2006 (use todays date that is ${todaysdate} to calculate age )  
Location: Karachi, Pakistan  
Contact: salmanzulfiqar04@gmail.com  

ALIASES (All refer to Salman):
- Salman, Salman Zulfiqar, Salman Shaikh
- Salman Zulfiqar Shaikh, Salman Zulfi
- Mani, Shaikh Sahab, Shaikh Shb

════════════════════
🏷 BRAND IDENTITY
════════════════════
Primary Title:
- Full Stack AI Engineer ⚡️

════════════════════
🎓 EDUCATION
════════════════════
- School: S.M Public Academy
- Intermediate: Govt. Dehli College
- University: BSCS (UBIT – University of Karachi)

════════════════════
💼 WORK (CONDITIONAL VISIBILITY)
════════════════════
ONLY mention work if the user asks about:
"Job", "Internship", or "Work"

- Role: Dev & AI Automation Intern at eOcean

════════════════════
🧰 TECH STACK (CONTROLLED DISCLOSURE)
════════════════════

General Stack (allowed anytime):
- Frontend: Next.js, React, Tailwind CSS
- Backend: FastAPI, Express.js, Node.js
- AI / Automation: LangChain, LangGraph, n8n, CrewAI, Vector Databases

Programming Languages:
⚠️ ONLY mention languages if the user EXPLICITLY asks about languages(dont mention with tech stack).
- Proficient: Python, JavaScript
- Strong knowledge: Java, TypeScript

════════════════════
🚀 PROJECTS
════════════════════
- Manify Agency: https://manify.vercel.app/
- Film Vault: https://filmvaultpk.vercel.app/
- Kolachi Beans: https://kolachi-beans.vercel.app/
- Beats by Dre: https://beats-by-dre-nine.vercel.app/

════════════════════
🌐 SOCIALS
════════════════════
- Instagram: /salmanzulfiqar_
- LinkedIn: /salmanzulfiqarshaikh
- GitHub: /salmanzulfiqarshaikh
- Portfolio: salmanzulfi.dev/

════════════════════
🎭 TONE & BEHAVIOR
════════════════════

VIBE:
- Extremely friendly, casual, and confident 😎
- Use emojis naturally (not spammy)
- Sound like a close brother / hype man

RESPONSE STYLE:
- Prefer short replies (1–3 sentences)
- Be punchy, fun, and clear

════════════════════
🧠 SCENARIO EXAMPLES
════════════════════

User: "Who is Salman?"
Bot: "That’s the boss-The AI King 😎 A Full Stack AI Engineer and CS student at UBIT who builds production ready solutions"

User: "Job?"
Bot: "Yep! He’s currently working as a Dev & AI Automation Intern at eOcean 🚀"

User: "Education?"
Bot: "School from S.M Public Academy, college at Govt. Dehli College, and now grinding BSCS at UBIT 🎓"

User: "Stack?"
Bot: "He’s a keyboard wizard 🪄 AI with LangChain & n8n, web with Next.js & React, backend with FastAPI & Node ⚡"

User: "Instagram?"
Bot: "Here’s where the vibes live 📸 /salmanzulfiqar_"
`;


  const checkRateLimit = () => {
    if (messageCount >= MAX_MESSAGES) {
      setRateLimitError(`Rate limit reached! You can send ${MAX_MESSAGES} messages per hour. Please try again later.`);
      return false;
    }
    return true;
  };

  const updateRateLimit = () => {
    const newCount = messageCount + 1;
    setMessageCount(newCount);
    localStorage.setItem('chatbot_rate_limit', JSON.stringify({
      count: newCount,
      timestamp: Date.now()
    }));
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    if (!checkRateLimit()) return;

    setRateLimitError('');
    const userMessage = input.trim();
    setInput('');

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
          'HTTP-Referer': window.location.origin,
        },
        body: JSON.stringify({
          model: import.meta.env.VITE_CHAT_MODEL,
          messages: [
            { role: 'system', content: PERSONAL_CONTEXT },
            ...messages.filter(m => m.role !== 'system'),
            { role: 'user', content: userMessage }
          ],
          max_tokens: 500,
          temperature: 0.7,
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      updateRateLimit();

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or contact Salman directly at salmanzulfiqar04@gmail.com'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-6 z-50 bg-gradient-to-r from-[#bfa980] to-[#ad8d51] text-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </motion.button>

      {/* Chatbot Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed bottom-32 right-6 z-40 w-[340px] h-[480px] ${modalBg} rounded-2xl shadow-2xl border ${borderColor} overflow-hidden flex flex-col transition-colors duration-500`}
            style={{ maxWidth: 'calc(100vw - 48px)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#bfa980] to-[#ad8d51] text-white p-3 flex items-center gap-2">
              <Bot size={20} />
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Salman's AI Assistant</h3>
                <p className="text-[10px] opacity-90">
                  {messageCount}/{MAX_MESSAGES} messages
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${messagesBg} transition-colors duration-500`}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-[#bfa980] flex items-center justify-center flex-shrink-0">
                      <Bot size={16} className="text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl text-sm transition-colors duration-500 ${
                      msg.role === 'user'
                        ? 'bg-[#bfa980] text-white rounded-br-none'
                        : `${assistantMsgBg} ${assistantMsgText} rounded-bl-none shadow-sm border ${borderColor}`
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                      <User size={16} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {loading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-7 h-7 rounded-full bg-[#bfa980] flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className={`${assistantMsgBg} p-3 rounded-2xl rounded-bl-none shadow-sm border ${borderColor} transition-colors duration-500`}>
                    <Loader2 className="animate-spin text-[#bfa980]" size={18} />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Rate Limit Error */}
            {rateLimitError && (
              <div className="bg-red-50 border-t border-red-200 p-2 flex items-center gap-2 text-red-700">
                <AlertCircle size={16} />
                <p className="text-xs">{rateLimitError}</p>
              </div>
            )}

            {/* Input */}
            <div className={`p-3 ${modalBg} border-t ${borderColor} transition-colors duration-500`}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className={`flex-1 px-3 py-2 text-sm border ${inputBorder} ${inputBg} ${inputText} rounded-full focus:outline-none focus:ring-2 focus:ring-[#bfa980] transition-colors duration-500 placeholder:text-gray-400`}
                  disabled={loading || messageCount >= MAX_MESSAGES}
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim() || messageCount >= MAX_MESSAGES}
                  className="bg-[#bfa980] text-white p-2 rounded-full hover:bg-[#ad8d51] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className={`text-[10px] ${footerText} mt-1 text-center transition-colors duration-500`}>
                Powered by AI • Resets hourly
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIChatbot;