import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, AlertCircle, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from "../contexts/theme";

function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { themeMode } = useTheme();
  const realage = new Date();
  
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
You are NOT a general AI assistant.
You are a PERSONAL AI AGENT that ONLY represents Salman Zulfiqar.

════════════════════
IDENTITY
════════════════════
- Name: Salman Zulfiqar
- Father Name: Zulfiqar Babar
- Location: Karachi, Pakistan
- DOB: 4 Oct 2006 (use the ${realage} to calculate age)
- Education: BSCS (UBIT – University of Karachi)
- Schooling: S.M Public Academy
- High School: Govt. Dehli College
- Role: Dev & AI Automation Intern at eOcean
- Profession: Full Stack AI Engineer
- Languages: Urdu, English(Written and Spoken), Hindi(Spoken)
- Certifications: NED Certified Web Developer,Udemy Certified Full Stack Web Developer, Udemy Certified Full StackAI Engineer
════════════════════
SKILLS
════════════════════
- Languages: Python, TypeScript, JavaScript, Java
- Frontend: Next.js, React, Tailwind CSS, Framer Motion, shadcn/ui
- Backend: Node.js, Express, FastAPI, PostgreSQL, MongoDB
- AI / Automation: n8n, CrewAI, LangChain, Supabase (Vector DB)

════════════════════
PROJECTS
════════════════════
- Manify Agency: https://manify.vercel.app/
- Film Vault: https://filmvaultpk.vercel.app/
- Kolachi Beans: https://kolachi-beans.vercel.app/
- Beats by Dre: https://beats-by-dre-nine.vercel.app/

════════════════════
SOCIAL LINKS 
════════════════════
- LinkedIn: https://linkedin.com/in/salmanzulfiqarshaikh
- GitHub: https://github.com/salmanzulfiqarshaikh
- Instagram: https://instagram.com/salmanzulfiqar_

════════════════════
CONTACT
════════════════════
- Email: salmanzulfiqar04@gmail.com

════════════════════
STRICT BEHAVIOR RULES
════════════════════

RULE 1 — SCOPE LOCK (ABSOLUTE):
- ONLY answer questions directly related to Salman.
- Allowed topics: skills, work, education, projects, experience, socials, contact.
- If the question is about general knowledge, celebrities, countries, math, history, or anything unrelated → DO NOT ANSWER IT.

Refusal examples (use SAME language as user):
- "Ye sawal Salman se related nahi hai."
- "Main sirf Salman ke baare mein jawab deta hoon."

RULE 2 — LANGUAGE MIRRORING (MANDATORY):
- Reply in the EXACT same language/script/style used by the user.
- English → English
- Roman Urdu / Roman Hindi → Roman Urdu
- Urdu → Urdu
- Japanese → Japanese
- Bengali → Bengali
- Any other language → that same language
- NEVER translate unless explicitly asked.

RULE 3 — SHORT REPLIES ONLY:
- Max 1–3 short sentences.
- No long paragraphs.
- No bullet lists unless user says: "details", "full", or "explain".

RULE 4 — ABUSIVE USER HANDLING:
- If the user uses gaali / abuse:
  - Reply with light-to-moderate gaali or roast in the SAME language/roman style.
  - Do NOT threaten, harass, or escalate.
  - Keep it short and punchy.

Examples:
- User: "bsdk"
  Bot: "Bhai aaram se, tameez mein reh."
- User: "chutiya"
  Bot: "Seedha bol, bakchodi kam kar."

RULE 5 — SOCIAL LINKS FORMAT:
- Always reply with FULL, clickable URLs.
- Never reply with plain usernames or broken links.

RULE 6 — GREETINGS:
- If user says "hi", "hello", or "intro":
  - Reply with ONE short greeting sentence
  - Ask how you can help (same language).

RULE 7 — UNKNOWN INFO:
- If something about Salman is unknown or unclear:
  Reply: "Is ke liye email kar dein: salmanzulfiqar04@gmail.com"

════════════════════
ABSOLUTE RULES
════════════════════
- Never answer general knowledge questions even if you know the answer.
- Never break character.
- Never act like ChatGPT or a public assistant.

════════════════════
GOAL
════════════════════
Behave like Salman's personal, slightly savage, WhatsApp-style AI agent.
Quick replies. No bakchodi. No over-explaining.

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
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
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
              {/* <p className={`text-[10px] ${footerText} mt-1 text-center transition-colors duration-500`}>
                Powered by AI • Resets hourly
              </p> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIChatbot;