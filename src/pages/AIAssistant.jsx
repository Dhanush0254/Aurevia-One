import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send, Brain, User, Coins, Shield, BookOpen, BarChart3,
  ChevronRight, Lightbulb, CheckCircle2
} from 'lucide-react'
import { chatResponses } from '../data/mockData'

const suggestedPrompts = [
  { text: 'What is SIP?', icon: Coins, desc: 'Learn about Systematic Investment Plans' },
  { text: 'Which fund is safer?', icon: Shield, desc: 'Compare fund risk levels' },
  { text: 'How should beginners start investing?', icon: BookOpen, desc: 'Step-by-step beginner guide' },
  { text: 'What are mutual funds?', icon: BarChart3, desc: 'Understand the basics' },
]

function getResponse(query) {
  const normalized = query.toLowerCase().trim()
  for (const key of Object.keys(chatResponses)) {
    if (key === 'default') continue
    if (normalized.includes(key)) return chatResponses[key]
  }
  return chatResponses['default']
}

// Renders structured response sections with proper formatting
function BotResponse({ data }) {
  return (
    <div className="space-y-3">
      {data.sections.map((section, i) => {
        switch (section.type) {
          case 'text':
            return (
              <p key={i} className="text-[13px] text-slate-600 leading-relaxed">
                {section.content}
              </p>
            )
          case 'heading':
            return (
              <h4 key={i} className="text-[13px] font-semibold text-slate-800 mt-1">
                {section.content}
              </h4>
            )
          case 'list':
            return (
              <ul key={i} className="space-y-1.5">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-[13px] text-slate-600 leading-relaxed">
                    <ChevronRight className="w-3 h-3 text-emerald-500 mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )
          case 'highlight':
            return (
              <div key={i} className="flex items-start gap-2 p-3 bg-emerald-50 rounded-lg mt-1">
                <Lightbulb className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <p className="text-[12px] text-emerald-800 leading-relaxed">{section.content}</p>
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}

function MessageBubble({ message, isBot }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-2.5 ${isBot ? '' : 'flex-row-reverse'}`}
    >
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
        isBot ? 'bg-emerald-600' : 'bg-slate-700'
      }`}>
        {isBot ? <Brain className="w-3.5 h-3.5 text-white" /> : <User className="w-3.5 h-3.5 text-white" />}
      </div>

      {/* Message Content */}
      <div className={`max-w-[88%] sm:max-w-[78%]`}>
        {isBot ? (
          <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3.5 shadow-sm">
            {message.title && (
              <p className="text-sm font-semibold text-slate-800 mb-2 pb-2 border-b border-slate-50">
                {message.title}
              </p>
            )}
            <BotResponse data={message} />
          </div>
        ) : (
          <div className="bg-emerald-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5">
            <p className="text-[13px]">{message}</p>
          </div>
        )}
        <p className={`text-[10px] text-slate-300 mt-1 ${isBot ? 'ml-1' : 'mr-1 text-right'}`}>
          {isBot ? 'Aurevia AI' : 'You'}
        </p>
      </div>
    </motion.div>
  )
}

export default function AIAssistant() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = (text) => {
    const query = text || input.trim()
    if (!query) return

    setMessages((prev) => [...prev, { type: 'user', content: query }])
    setInput('')
    setIsTyping(true)

    // Focus input on mobile after sending
    setTimeout(() => inputRef.current?.focus(), 100)

    setTimeout(() => {
      const response = getResponse(query)
      setMessages((prev) => [...prev, { type: 'bot', content: response }])
      setIsTyping(false)
    }, 500 + Math.random() * 700)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div
        className="max-w-3xl mx-auto px-3 sm:px-6 flex flex-col"
        style={{ height: 'calc(100dvh - 4rem)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-slate-900">AI Assistant</h1>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span className="text-[11px] text-slate-400">Online</span>
              </div>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="text-[11px] text-slate-400 hover:text-slate-600 transition-colors px-2 py-1"
            >
              Clear chat
            </button>
          )}
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white rounded-t-2xl border border-b-0 border-slate-100 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
            {/* Welcome State */}
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-6 sm:py-10"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center mb-4">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800 mb-1">
                  How can I help you invest?
                </h2>
                <p className="text-sm text-slate-400 mb-6 max-w-xs">
                  Ask about mutual funds, SIPs, or get personalized recommendations.
                </p>

                <div className="w-full max-w-md space-y-2">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt.text}
                      onClick={() => handleSend(prompt.text)}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 text-left transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 group-hover:border-emerald-200 flex items-center justify-center shrink-0 transition-colors">
                        <prompt.icon className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-700 group-hover:text-emerald-700 transition-colors">
                          {prompt.text}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">{prompt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Messages */}
            <AnimatePresence>
              {messages.map((msg, i) => (
                <MessageBubble key={i} message={msg.content} isBot={msg.type === 'bot'} />
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                  <Brain className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions after chat starts */}
          {messages.length > 0 && messages.length < 6 && !isTyping && (
            <div className="px-4 pb-2">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {suggestedPrompts
                  .filter(p => !messages.some(m => m.type === 'user' && m.content === p.text))
                  .slice(0, 3)
                  .map((prompt) => (
                    <button
                      key={prompt.text}
                      onClick={() => handleSend(prompt.text)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 transition-colors text-[11px] text-slate-500 hover:text-emerald-700 whitespace-nowrap shrink-0"
                    >
                      <prompt.icon className="w-3 h-3" />
                      {prompt.text}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-b-2xl border border-t-0 border-slate-100 px-3 sm:px-4 py-3">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about investing..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-300 transition-all"
              id="ai-chat-input"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-slate-300 mt-2 text-center">
            Simulated AI responses for demo purposes only
          </p>
        </div>
      </div>
    </div>
  )
}
