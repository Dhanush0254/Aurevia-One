import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, Clock, ChevronRight, X, GraduationCap,
  Lightbulb, CheckCircle2, Brain, Coins, BarChart3,
  AlertTriangle, TrendingUp, Target
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { learningArticles } from '../data/mockData'

const categories = ['All', 'Basics', 'Core Concepts', 'Strategy']

const difficultyColors = {
  Beginner: 'bg-emerald-50 text-emerald-700',
  Intermediate: 'bg-blue-50 text-blue-700',
  Advanced: 'bg-purple-50 text-purple-700',
}

const iconMap = {
  coins: Coins,
  barchart: BarChart3,
  alerttriangle: AlertTriangle,
  trendingup: TrendingUp,
  lightbulb: Lightbulb,
  target: Target,
}

export default function LearningHub() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedArticle, setSelectedArticle] = useState(null)

  const filtered = activeCategory === 'All'
    ? learningArticles
    : learningArticles.filter((a) => a.category === activeCategory)

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-xs text-emerald-700 font-medium mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            Learning Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Learn to invest with confidence
          </h1>
          <p className="text-sm text-slate-400">
            Simple, jargon-free articles to help you understand investing from the ground up.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((article, index) => {
            const IconComponent = iconMap[article.iconName] || BookOpen
            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-xl p-5 border border-slate-100 hover:border-emerald-200 cursor-pointer group transition-all"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                  <IconComponent className="w-5 h-5 text-emerald-600" />
                </div>

                <div className="flex items-center gap-2 mb-2.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${difficultyColors[article.difficulty]}`}>
                    {article.difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-slate-800 mb-1.5 group-hover:text-emerald-700 transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {article.summary}
                </p>

                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 group-hover:gap-1.5 transition-all">
                  Read Article <ChevronRight className="w-3 h-3" />
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* Quick Tips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-emerald-600 rounded-2xl p-6 sm:p-10 text-white"
        >
          <div className="flex items-center gap-2 mb-5">
            <Lightbulb className="w-5 h-5" />
            <h2 className="text-lg font-bold">Quick Investing Tips</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              'Start with SIPs as low as ₹500/month — consistency beats timing',
              'Never invest emergency funds — keep 3-6 months expenses safe',
              'Diversify across fund types — don\'t put all eggs in one basket',
              'Stay invested for 5+ years in equity — time reduces risk',
              'Review your portfolio quarterly — not daily',
              'Understand the fund before investing — read the factsheet',
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 bg-white/10 rounded-lg">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-200" />
                <p className="text-xs text-white/90 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <div className="mt-8 bg-white rounded-xl p-6 sm:p-8 border border-slate-100 text-center">
          <Brain className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">Still have questions?</h3>
          <p className="text-sm text-slate-400 mb-4 max-w-xs mx-auto">
            Our AI assistant can answer your investing questions in simple language.
          </p>
          <Link
            to="/ai-assistant"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Chat with AI <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (() => {
          const IconComponent = iconMap[selectedArticle.iconName] || BookOpen
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/30 backdrop-blur-sm"
              onClick={() => setSelectedArticle(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                className="bg-white rounded-t-2xl sm:rounded-2xl p-6 w-full sm:max-w-lg max-h-[85vh] overflow-y-auto border-t sm:border border-slate-100"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">{selectedArticle.title}</h2>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${difficultyColors[selectedArticle.difficulty]}`}>
                          {selectedArticle.difficulty}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Clock className="w-3 h-3" /> {selectedArticle.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  {selectedArticle.content}
                </p>

                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="text-xs font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    Key Points
                  </h4>
                  <ul className="space-y-2">
                    {selectedArticle.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="w-full mt-5 px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Got it
                </button>
              </motion.div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </div>
  )
}
