import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Search, TrendingUp, Clock, Brain, Sparkles,
  ChevronRight, Star, Shield, AlertTriangle, Zap, Check,
  IndianRupee, CreditCard, Building2, Lock, CheckCircle2,
  ArrowUpRight, Info, BarChart3, X, Landmark, Copy
} from 'lucide-react'
import {
  quickInvestFunds, trendingFundIds, recentlyInvestedFundIds,
  aiRecommendedFundIds, userBankAccount
} from '../data/mockData'

// ─── Helpers ─────────────────────────────────────────────
function formatCurrency(num) {
  return '₹' + num.toLocaleString('en-IN')
}

function estimateFutureValue(amount, rate, years) {
  return Math.round(amount * Math.pow(1 + rate / 100, years))
}

const riskColorMap = {
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
}

const stepLabels = ['Select Fund', 'Fund Details', 'Amount', 'Review', 'Success']

// ─── Animation Variants ─────────────────────────────────
const pageVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

// ─── Progress Bar ────────────────────────────────────────
function ProgressBar({ currentStep, totalSteps }) {
  return (
    <div className="flex gap-1.5 w-full max-w-xs mx-auto">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div key={i} className="flex-1 h-1 rounded-full bg-slate-200 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: i < currentStep ? '100%' : i === currentStep ? '50%' : '0%' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      ))}
    </div>
  )
}

// ─── Fund Card ───────────────────────────────────────────
function FundCard({ fund, onSelect }) {
  const colors = riskColorMap[fund.riskColor] || riskColorMap.amber
  return (
    <motion.button
      variants={staggerItem}
      onClick={() => onSelect(fund)}
      className="w-full text-left bg-white rounded-xl p-4 border border-slate-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-50 transition-all duration-300 group"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between mb-2.5">
        <div className="flex-1 min-w-0 pr-3">
          <h3 className="text-sm font-semibold text-slate-800 truncate group-hover:text-emerald-700 transition-colors">
            {fund.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] text-slate-400 font-medium">{fund.category}</span>
            <span className="text-slate-200">•</span>
            <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded ${colors.bg} ${colors.text}`}>
              {fund.risk}
            </span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-lg font-bold text-emerald-600">{fund.return3y}</p>
          <p className="text-[10px] text-slate-400">3Y Returns</p>
        </div>
      </div>

      <p className="text-xs text-slate-500 mb-3 leading-relaxed">{fund.oneLiner}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[11px] font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3" />
            {fund.aiTag}
          </span>
          <span className="text-[11px] text-slate-400">
            Min {formatCurrency(fund.minInvestment)}
          </span>
        </div>
        <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          Invest Now <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </motion.button>
  )
}

// ─── Skeleton Loader ─────────────────────────────────────
function SkeletonLoader() {
  return (
    <div className="space-y-4 p-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-xl p-4 border border-slate-100">
          <div className="flex justify-between mb-3">
            <div>
              <div className="h-4 w-40 skeleton-shimmer rounded mb-2" />
              <div className="h-3 w-24 skeleton-shimmer rounded" />
            </div>
            <div className="h-6 w-16 skeleton-shimmer rounded" />
          </div>
          <div className="h-3 w-full skeleton-shimmer rounded mb-2" />
          <div className="h-3 w-2/3 skeleton-shimmer rounded" />
        </div>
      ))}
    </div>
  )
}

// ─── Confetti ────────────────────────────────────────────
function Confetti() {
  const particles = useMemo(() =>
    Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: 1.5 + Math.random() * 2,
      color: ['#10b981', '#059669', '#34d399', '#6ee7b7', '#a78bfa', '#f59e0b', '#3b82f6'][Math.floor(Math.random() * 7)],
      size: 4 + Math.random() * 6,
      rotation: Math.random() * 360,
    })), [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: `${p.x}%`,
            top: -10,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            rotate: p.rotation,
          }}
          initial={{ y: -20, opacity: 1 }}
          animate={{ y: '100vh', opacity: 0, rotate: p.rotation + 720 }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  )
}

// ─── Success Checkmark SVG ───────────────────────────────
function SuccessCheckmark() {
  return (
    <div className="relative w-24 h-24 mx-auto">
      {/* Pulse rings */}
      <motion.div
        className="absolute inset-0 rounded-full bg-emerald-400"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.4, repeat: Infinity, repeatDelay: 1 }}
      />
      {/* Circle */}
      <motion.div
        className="absolute inset-0 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <motion.path
            d="M5 13l4 4L19 7"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
          />
        </svg>
      </motion.div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════
// ─── STEP 1: Fund Discovery ─────────────────────────────
// ═════════════════════════════════════════════════════════
function FundDiscovery({ onSelectFund }) {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('recommended')

  const tabs = [
    { key: 'recommended', label: 'AI Picks', icon: Brain },
    { key: 'trending', label: 'Trending', icon: TrendingUp },
    { key: 'recent', label: 'Recent', icon: Clock },
  ]

  const filteredFunds = useMemo(() => {
    let funds = quickInvestFunds
    if (activeTab === 'trending') {
      funds = quickInvestFunds.filter(f => trendingFundIds.includes(f.id))
    } else if (activeTab === 'recent') {
      funds = quickInvestFunds.filter(f => recentlyInvestedFundIds.includes(f.id))
    } else if (activeTab === 'recommended') {
      funds = quickInvestFunds.filter(f => aiRecommendedFundIds.includes(f.id))
    }
    if (search) {
      const q = search.toLowerCase()
      funds = funds.filter(f =>
        f.name.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
      )
    }
    return funds
  }, [activeTab, search])

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search funds by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all"
          id="quick-invest-search"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-100"
          >
            <X className="w-3.5 h-3.5 text-slate-400" />
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
              activeTab === tab.key
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            id={`tab-${tab.key}`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Fund List */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        key={activeTab + search}
        className="space-y-3"
      >
        {filteredFunds.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-500">No funds found</p>
            <p className="text-xs text-slate-400 mt-1">Try a different search term</p>
          </div>
        ) : (
          filteredFunds.map((fund) => (
            <FundCard key={fund.id} fund={fund} onSelect={onSelectFund} />
          ))
        )}
      </motion.div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════
// ─── STEP 2: Fund Overview ──────────────────────────────
// ═════════════════════════════════════════════════════════
function FundOverview({ fund, onContinue }) {
  const colors = riskColorMap[fund.riskColor] || riskColorMap.amber

  return (
    <div className="space-y-4">
      {/* Fund Header */}
      <div className="bg-white rounded-xl p-5 border border-slate-100">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{fund.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-slate-500 font-medium">{fund.category}</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${colors.bg} ${colors.text}`}>
                {fund.risk} Risk
              </span>
            </div>
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3 h-3" />
            AI Score {fund.aiScore}
          </span>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed">{fund.oneLiner}</p>
      </div>

      {/* Returns */}
      <div className="bg-white rounded-xl p-5 border border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-emerald-600" />
          Historical Returns
        </h3>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: '1Y Return', value: fund.return1y },
            { label: '3Y Return', value: fund.return3y },
            { label: '5Y Return', value: fund.return5y },
          ].map((r) => (
            <div key={r.label} className="bg-slate-50 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-emerald-600">{r.value}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{r.label}</p>
            </div>
          ))}
        </div>
        {/* Year-wise chart bars */}
        <div className="space-y-2">
          {fund.historicalReturns.map((hr, i) => (
            <div key={hr.year} className="flex items-center gap-3">
              <span className="text-xs text-slate-400 w-10 shrink-0">{hr.year}</span>
              <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${hr.value >= 0 ? 'bg-emerald-400' : 'bg-red-400'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(Math.abs(hr.value) * 1.3, 100)}%` }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                />
              </div>
              <span className={`text-xs font-semibold w-12 text-right ${hr.value >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                {hr.value > 0 ? '+' : ''}{hr.value}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Fund Details */}
      <div className="bg-white rounded-xl p-5 border border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800 mb-3">Fund Details</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Min Investment', value: formatCurrency(fund.minInvestment) },
            { label: 'Expense Ratio', value: fund.expenseRatio },
            { label: 'AUM', value: fund.aum },
            { label: 'Fund Manager', value: fund.fundManager },
          ].map((d) => (
            <div key={d.label} className="flex flex-col">
              <span className="text-[11px] text-slate-400">{d.label}</span>
              <span className="text-sm font-medium text-slate-700">{d.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Why this fund? — AI Card */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-5 border border-purple-100">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center">
            <Brain className="w-4 h-4 text-purple-600" />
          </div>
          <h3 className="text-sm font-semibold text-purple-800">Why this fund?</h3>
          <span className="text-[10px] font-medium bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded ml-auto">AI Analysis</span>
        </div>
        <p className="text-sm text-purple-700/80 leading-relaxed mb-3">{fund.aiSummary}</p>
        <ul className="space-y-1.5">
          {fund.whyInvest.map((reason, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-purple-700/70">
              <Check className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
              {reason}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <motion.button
        onClick={onContinue}
        className="w-full py-3.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-100"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        id="continue-investment-btn"
      >
        Continue Investment
        <ArrowUpRight className="w-4 h-4" />
      </motion.button>
    </div>
  )
}

// ═════════════════════════════════════════════════════════
// ─── STEP 3: Amount Entry ───────────────────────────────
// ═════════════════════════════════════════════════════════
function AmountEntry({ fund, amount, setAmount, onReview }) {
  const quickAmounts = [1000, 5000, 10000, 50000]
  const return3yNum = parseFloat(fund.return3y)
  const futureValue3y = amount > 0 ? estimateFutureValue(amount, return3yNum, 3) : 0
  const futureValue5y = amount > 0 ? estimateFutureValue(amount, return3yNum, 5) : 0
  const isValid = amount >= fund.minInvestment

  return (
    <div className="space-y-4">
      {/* Amount Input */}
      <div className="bg-white rounded-xl p-5 border border-slate-100">
        <label className="text-sm font-semibold text-slate-800 mb-3 block">
          Enter Investment Amount
        </label>
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-semibold text-slate-400">₹</span>
          <input
            type="number"
            value={amount || ''}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="0"
            className="w-full pl-10 pr-4 py-4 text-2xl font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all placeholder:text-slate-300"
            id="investment-amount-input"
          />
        </div>

        {/* Quick chips */}
        <div className="flex flex-wrap gap-2">
          {quickAmounts.map((qa) => (
            <motion.button
              key={qa}
              onClick={() => setAmount(qa)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                amount === qa
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-200 hover:bg-emerald-50/50'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {formatCurrency(qa)}
            </motion.button>
          ))}
        </div>

        {amount > 0 && amount < fund.minInvestment && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-red-500 mt-2 flex items-center gap-1"
          >
            <AlertTriangle className="w-3 h-3" />
            Minimum investment is {formatCurrency(fund.minInvestment)}
          </motion.p>
        )}
      </div>

      {/* Estimated Future Value */}
      {amount >= fund.minInvestment && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-100"
        >
          <h3 className="text-sm font-semibold text-emerald-800 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Estimated Future Value
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/60 rounded-lg p-3">
              <p className="text-xs text-emerald-600 mb-0.5">In 3 Years</p>
              <p className="text-xl font-bold text-emerald-700 count-up">{formatCurrency(futureValue3y)}</p>
              <p className="text-[11px] text-emerald-500 mt-0.5">
                +{formatCurrency(futureValue3y - amount)} gain
              </p>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <p className="text-xs text-emerald-600 mb-0.5">In 5 Years</p>
              <p className="text-xl font-bold text-emerald-700 count-up">{formatCurrency(futureValue5y)}</p>
              <p className="text-[11px] text-emerald-500 mt-0.5">
                +{formatCurrency(futureValue5y - amount)} gain
              </p>
            </div>
          </div>
          <p className="text-[10px] text-emerald-500/70 mt-2 flex items-center gap-1">
            <Info className="w-3 h-3" />
            Based on {fund.return3y} historical 3Y CAGR. Actual returns may vary.
          </p>
        </motion.div>
      )}

      {/* Bank & Payment */}
      <div className="bg-white rounded-xl p-5 border border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800 mb-3">Payment From</h3>
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-700">{userBankAccount.bankName}</p>
            <p className="text-xs text-slate-400">A/C •••• {userBankAccount.accountLast4} · {userBankAccount.accountType}</p>
          </div>
          <Check className="w-4 h-4 text-emerald-500" />
        </div>
        <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
          <CreditCard className="w-3.5 h-3.5" />
          <span>UPI: {userBankAccount.upiId}</span>
        </div>
      </div>

      {/* CTA */}
      <motion.button
        onClick={onReview}
        disabled={!isValid}
        className={`w-full py-3.5 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg ${
          isValid
            ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
        }`}
        whileHover={isValid ? { scale: 1.01 } : {}}
        whileTap={isValid ? { scale: 0.98 } : {}}
        id="review-investment-btn"
      >
        Review Investment
        <ChevronRight className="w-4 h-4" />
      </motion.button>
    </div>
  )
}

// ═════════════════════════════════════════════════════════
// ─── STEP 4: Review & Confirm ───────────────────────────
// ═════════════════════════════════════════════════════════
function ReviewConfirm({ fund, amount, onConfirm }) {
  const [confirming, setConfirming] = useState(false)
  const colors = riskColorMap[fund.riskColor] || riskColorMap.amber
  const return3yNum = parseFloat(fund.return3y)
  const futureValue3y = estimateFutureValue(amount, return3yNum, 3)

  const handleConfirm = useCallback(() => {
    setConfirming(true)
    setTimeout(() => {
      onConfirm()
    }, 1500)
  }, [onConfirm])

  return (
    <div className="space-y-4">
      {/* Summary Card */}
      <div className="bg-white rounded-xl p-5 border border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Investment Summary</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-slate-50">
            <span className="text-sm text-slate-500">Fund</span>
            <span className="text-sm font-medium text-slate-800 text-right max-w-[60%] truncate">{fund.name}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-50">
            <span className="text-sm text-slate-500">Category</span>
            <span className="text-sm font-medium text-slate-700">{fund.category}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-50">
            <span className="text-sm text-slate-500">Amount</span>
            <span className="text-lg font-bold text-slate-900">{formatCurrency(amount)}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-50">
            <span className="text-sm text-slate-500">Risk Level</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded ${colors.bg} ${colors.text}`}>
              {fund.risk}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-50">
            <span className="text-sm text-slate-500">Est. Value (3Y)</span>
            <span className="text-sm font-semibold text-emerald-600">{formatCurrency(futureValue3y)}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-slate-500">Payment</span>
            <span className="text-sm font-medium text-slate-700">{userBankAccount.bankName} •••• {userBankAccount.accountLast4}</span>
          </div>
        </div>
      </div>

      {/* Processing Info */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-blue-800 mb-1">Processing Information</p>
            <p className="text-[11px] text-blue-600 leading-relaxed">
              Your investment will be processed at the next available NAV. Units will be allotted within 1-2 business days after payment confirmation.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-white rounded-xl p-4 border border-slate-100">
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Shield, label: 'SEBI Regulated', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { icon: Lock, label: 'Secure Payment', color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: CheckCircle2, label: 'Encrypted', color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((badge) => (
            <div key={badge.label} className="text-center">
              <div className={`w-9 h-9 rounded-lg ${badge.bg} flex items-center justify-center mx-auto mb-1.5`}>
                <badge.icon className={`w-4 h-4 ${badge.color}`} />
              </div>
              <p className="text-[10px] font-medium text-slate-500">{badge.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.button
        onClick={handleConfirm}
        disabled={confirming}
        className="relative w-full py-4 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-all overflow-hidden shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
        whileHover={!confirming ? { scale: 1.01 } : {}}
        whileTap={!confirming ? { scale: 0.98 } : {}}
        id="confirm-invest-btn"
      >
        {confirming ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <motion.div
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            />
            Processing...
          </motion.div>
        ) : (
          <>
            Confirm & Invest {formatCurrency(amount)}
            <Zap className="w-4 h-4" />
          </>
        )}
        {!confirming && (
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        )}
      </motion.button>
    </div>
  )
}

// ═════════════════════════════════════════════════════════
// ─── STEP 5: Success ────────────────────────────────────
// ═════════════════════════════════════════════════════════
function InvestSuccess({ fund, amount, onTrack, onDashboard }) {
  const [showConfetti, setShowConfetti] = useState(true)
  const orderId = useMemo(() => `AUR${Date.now().toString(36).toUpperCase().slice(-8)}`, [])
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3500)
    return () => clearTimeout(timer)
  }, [])

  const handleCopy = () => {
    navigator.clipboard?.writeText(orderId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      {showConfetti && <Confetti />}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm text-center"
      >
        <SuccessCheckmark />

        <motion.h2
          className="text-2xl font-bold text-slate-900 mt-6 mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Investment Successful! 🎉
        </motion.h2>

        <motion.p
          className="text-sm text-slate-500 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Your investment has been placed successfully
        </motion.p>

        {/* Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-xl p-5 border border-slate-100 text-left mb-4"
        >
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Fund</span>
              <span className="text-sm font-medium text-slate-700 text-right max-w-[60%] truncate">{fund.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Amount Invested</span>
              <span className="text-base font-bold text-emerald-600">{formatCurrency(amount)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">NAV Processing</span>
              <span className="text-sm text-slate-600">Next business day</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Order ID</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-sm font-mono text-slate-600 hover:text-emerald-600 transition-colors"
              >
                {orderId}
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="space-y-2.5"
        >
          <button
            onClick={onTrack}
            className="w-full py-3 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            id="track-investment-btn"
          >
            <BarChart3 className="w-4 h-4" />
            Track Investment
          </button>
          <button
            onClick={onDashboard}
            className="w-full py-3 bg-white text-slate-700 text-sm font-medium rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            id="back-to-dashboard-btn"
          >
            <Landmark className="w-4 h-4" />
            Back to Dashboard
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════
// ─── MAIN QUICK INVEST PAGE ─────────────────────────────
// ═════════════════════════════════════════════════════════
export default function QuickInvest() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [selectedFund, setSelectedFund] = useState(null)
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)

  const goForward = useCallback((nextStep) => {
    setLoading(true)
    setDirection(1)
    setTimeout(() => {
      setStep(nextStep)
      setLoading(false)
    }, 300)
  }, [])

  const goBack = useCallback(() => {
    setDirection(-1)
    setStep((s) => Math.max(0, s - 1))
  }, [])

  const handleSelectFund = useCallback((fund) => {
    setSelectedFund(fund)
    setAmount(fund.minInvestment)
    goForward(1)
  }, [goForward])

  const handleContinueToAmount = useCallback(() => {
    goForward(2)
  }, [goForward])

  const handleReview = useCallback(() => {
    goForward(3)
  }, [goForward])

  const handleConfirm = useCallback(() => {
    setDirection(1)
    setStep(4)
  }, [])

  const handleTrack = useCallback(() => {
    navigate('/dashboard')
  }, [navigate])

  const handleDashboard = useCallback(() => {
    navigate('/dashboard')
  }, [navigate])

  const stepTitles = ['Select a Fund', selectedFund?.name || 'Fund Details', 'Investment Amount', 'Review & Confirm', '']

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      {step < 4 && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-100"
        >
          <div className="max-w-lg mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-2.5">
              <button
                onClick={step === 0 ? () => navigate(-1) : goBack}
                className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors -ml-1 p-1"
                id="back-btn"
              >
                <ArrowLeft className="w-4 h-4" />
                {step === 0 ? 'Back' : 'Back'}
              </button>
              <h1 className="text-sm font-semibold text-slate-800 truncate max-w-[50%]">
                {stepTitles[step]}
              </h1>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                <Zap className="w-3 h-3" />
                Quick Invest
              </div>
            </div>
            <ProgressBar currentStep={step} totalSteps={4} />
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className={`max-w-lg mx-auto px-4 ${step < 4 ? 'pt-24 pb-8' : 'pt-8 pb-8'}`}>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {step === 0 && (
                <FundDiscovery onSelectFund={handleSelectFund} />
              )}
              {step === 1 && selectedFund && (
                <FundOverview fund={selectedFund} onContinue={handleContinueToAmount} />
              )}
              {step === 2 && selectedFund && (
                <AmountEntry
                  fund={selectedFund}
                  amount={amount}
                  setAmount={setAmount}
                  onReview={handleReview}
                />
              )}
              {step === 3 && selectedFund && (
                <ReviewConfirm
                  fund={selectedFund}
                  amount={amount}
                  onConfirm={handleConfirm}
                />
              )}
              {step === 4 && selectedFund && (
                <InvestSuccess
                  fund={selectedFund}
                  amount={amount}
                  onTrack={handleTrack}
                  onDashboard={handleDashboard}
                />
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
