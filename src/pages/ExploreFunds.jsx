import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Star, Brain, Info, TrendingUp, X
} from 'lucide-react'
import { mutualFunds } from '../data/mockData'

const categories = ['All', 'Large Cap', 'Flexi Cap', 'Mid Cap', 'Small Cap', 'Hybrid', 'Sectoral', 'Large & Mid Cap']
const riskLevels = ['All Risk', 'Low', 'Moderate', 'High', 'Very High']

const tagColors = {
  'Best for Beginners': 'bg-emerald-50 text-emerald-700',
  'Stable Growth': 'bg-blue-50 text-blue-700',
  'High Risk High Return': 'bg-red-50 text-red-600',
  'Long-Term Wealth': 'bg-purple-50 text-purple-700',
}

const riskColors = {
  Low: 'bg-emerald-50 text-emerald-700',
  Moderate: 'bg-amber-50 text-amber-700',
  High: 'bg-orange-50 text-orange-700',
  'Very High': 'bg-red-50 text-red-600',
}

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-3 h-3 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
      ))}
    </div>
  )
}

export default function ExploreFunds() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeRisk, setActiveRisk] = useState('All Risk')
  const [selectedFund, setSelectedFund] = useState(null)

  const filtered = useMemo(() => {
    return mutualFunds.filter((fund) => {
      const matchSearch = fund.name.toLowerCase().includes(search.toLowerCase()) ||
        fund.category.toLowerCase().includes(search.toLowerCase())
      const matchCategory = activeCategory === 'All' || fund.category === activeCategory
      const matchRisk = activeRisk === 'All Risk' || fund.risk === activeRisk
      return matchSearch && matchCategory && matchRisk
    })
  }, [search, activeCategory, activeRisk])

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">Explore Funds</h1>
          <p className="text-sm text-slate-400">Discover AI-curated mutual funds for your goals</p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-100 mb-5">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search funds by name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-300 transition-all"
              id="fund-search"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {riskLevels.map((risk) => (
              <button
                key={risk}
                onClick={() => setActiveRisk(risk)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  activeRisk === risk
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                }`}
              >
                {risk}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-3">
          Showing <span className="font-medium text-slate-600">{filtered.length}</span> funds
        </p>

        {/* Fund Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {filtered.map((fund, index) => (
              <motion.div
                key={fund.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                className="bg-white rounded-xl p-5 border border-slate-100 hover:border-emerald-200 transition-all group cursor-pointer"
                onClick={() => setSelectedFund(fund)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors truncate">
                      {fund.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] text-slate-400">{fund.category}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${riskColors[fund.risk]}`}>
                        {fund.risk}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 shrink-0 ml-3">
                    <Brain className="w-3 h-3 text-emerald-600" />
                    <span className="text-xs font-bold text-emerald-700">{fund.aiScore}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {fund.tags.map((tag) => (
                    <span key={tag} className={`px-2 py-0.5 rounded text-[10px] font-medium ${tagColors[tag]}`}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { label: '1Y', value: fund.returns1y },
                    { label: '3Y', value: fund.returns3y },
                    { label: '5Y', value: fund.returns5y },
                  ].map((r) => (
                    <div key={r.label} className="text-center p-2 bg-slate-50 rounded-lg">
                      <p className="text-[10px] text-slate-400">{r.label}</p>
                      <p className="text-xs font-semibold text-emerald-600">{r.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                  <div className="flex items-center gap-3">
                    <StarRating rating={fund.rating} />
                    <span className="text-[11px] text-slate-400">Min ₹{fund.minInvestment}</span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedFund(fund) }}
                    className="px-4 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Invest
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-slate-400">No funds match your criteria</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('All'); setActiveRisk('All Risk') }}
              className="mt-3 text-xs text-emerald-600 font-medium hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Fund Modal */}
        <AnimatePresence>
          {selectedFund && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/30 backdrop-blur-sm"
              onClick={() => setSelectedFund(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                className="bg-white rounded-t-2xl sm:rounded-2xl p-6 sm:p-7 w-full sm:max-w-lg max-h-[85vh] overflow-y-auto border-t sm:border border-slate-100"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 mb-1">{selectedFund.name}</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-400">{selectedFund.category}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${riskColors[selectedFund.risk]}`}>
                        {selectedFund.risk} Risk
                      </span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedFund(null)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-700">AI Score: {selectedFund.aiScore}/100</span>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed mb-5">{selectedFund.description}</p>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: '1Y Returns', value: selectedFund.returns1y },
                    { label: '3Y Returns', value: selectedFund.returns3y },
                    { label: '5Y Returns', value: selectedFund.returns5y },
                  ].map((r) => (
                    <div key={r.label} className="text-center p-3 bg-slate-50 rounded-lg">
                      <p className="text-[10px] text-slate-400">{r.label}</p>
                      <p className="text-base font-bold text-emerald-600">{r.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg mb-5">
                  <div>
                    <p className="text-[10px] text-slate-400">Min Investment</p>
                    <p className="text-sm font-semibold text-slate-700">₹{selectedFund.minInvestment}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">AUM</p>
                    <p className="text-sm font-semibold text-slate-700">{selectedFund.aum}</p>
                  </div>
                  <StarRating rating={selectedFund.rating} />
                </div>

                <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg mb-5">
                  <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <p className="text-[11px] text-emerald-700">This is a demo. No real investment will be made.</p>
                </div>

                <div className="flex gap-2.5">
                  <button onClick={() => setSelectedFund(null)} className="flex-1 px-5 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
                    Close
                  </button>
                  <button
                    onClick={() => { alert('This is a demo! No real investment is made.'); setSelectedFund(null) }}
                    className="flex-1 px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Invest Now
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
