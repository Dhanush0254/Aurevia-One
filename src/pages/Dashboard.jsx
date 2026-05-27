import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp, Wallet, BarChart3, Target, Brain,
  ArrowUpRight, ArrowDownRight, Eye, EyeOff,
  ChevronRight, ToggleLeft, ToggleRight,
  Shield, Plane, Palmtree, AlertCircle, Lightbulb, Bell
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import {
  portfolioData, portfolioGrowthData, goals, recentInvestments,
  aiInsights, marketTrends
} from '../data/mockData'

function formatCurrency(num) {
  return '₹' + num.toLocaleString('en-IN')
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 rounded-lg shadow-md border border-slate-100 text-xs">
        <p className="text-slate-400 mb-0.5">{label}</p>
        <p className="font-semibold text-slate-800">{formatCurrency(payload[0].value)}</p>
      </div>
    )
  }
  return null
}

const goalIcons = {
  'Emergency Fund': Shield,
  'Dream Vacation': Plane,
  'Retirement': Palmtree,
}

const insightIcons = {
  opportunity: Lightbulb,
  alert: Bell,
  tip: Brain,
}

export default function Dashboard() {
  const [showValues, setShowValues] = useState(true)
  const [expertMode, setExpertMode] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Portfolio Overview</h1>
            <p className="text-sm text-slate-400 mt-0.5">Track your investments and goals</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowValues(!showValues)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-500 hover:bg-slate-50 transition-colors"
            >
              {showValues ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              {showValues ? 'Hide' : 'Show'}
            </button>
            <button
              onClick={() => setExpertMode(!expertMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                expertMode
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-white border-slate-200 text-slate-500'
              }`}
            >
              {expertMode ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
              {expertMode ? 'Expert' : 'Beginner'}
            </button>
          </div>
        </div>

        {/* Portfolio Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {[
            { label: 'Total Invested', value: formatCurrency(portfolioData.totalInvested), icon: Wallet, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Current Value', value: formatCurrency(portfolioData.currentValue), icon: BarChart3, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Total Returns', value: showValues ? formatCurrency(portfolioData.totalReturns) : '••••', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', badge: `+${portfolioData.returnsPercentage}%` },
            { label: expertMode ? 'XIRR' : 'Growth', value: expertMode ? `${portfolioData.xirr}%` : `+${portfolioData.returnsPercentage}%`, icon: ArrowUpRight, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-white rounded-xl p-4 sm:p-5 border border-slate-100"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center`}>
                  <card.icon className={`w-4 h-4 ${card.color}`} />
                </div>
                {card.badge && (
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-semibold rounded">
                    {card.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mb-0.5">{card.label}</p>
              <p className="text-lg sm:text-xl font-bold text-slate-900">
                {showValues ? card.value : '••••'}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Chart + AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 mb-6">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-100">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Portfolio Growth</h3>
                <p className="text-xs text-slate-400">Last 12 months</p>
              </div>
              <div className="flex gap-1">
                {['1M', '3M', '6M', '1Y'].map((p) => (
                  <button key={p} className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${p === '1Y' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-400 hover:bg-slate-50'}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-56 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={portfolioGrowthData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#colorValue)" dot={false} activeDot={{ r: 4, stroke: '#10b981', strokeWidth: 2, fill: '#fff' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-white rounded-xl p-5 border border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-semibold text-slate-800">AI Insights</h3>
            </div>
            <div className="space-y-3">
              {aiInsights.map((insight, i) => {
                const Icon = insightIcons[insight.type] || Lightbulb
                return (
                  <div
                    key={i}
                    className={`p-3 rounded-lg border ${
                      insight.type === 'opportunity' ? 'bg-emerald-50/50 border-emerald-100' :
                      insight.type === 'alert' ? 'bg-amber-50/50 border-amber-100' :
                      'bg-blue-50/50 border-blue-100'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <Icon className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                        insight.type === 'opportunity' ? 'text-emerald-600' :
                        insight.type === 'alert' ? 'text-amber-600' : 'text-blue-600'
                      }`} />
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-slate-700">{insight.title}</p>
                          {expertMode && <span className="text-[10px] text-slate-400 ml-2">{insight.confidence}%</span>}
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">{insight.message}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Goals & Market */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mb-6">
          {/* Goals */}
          <div className="bg-white rounded-xl p-5 border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-semibold text-slate-800">Goal Tracking</h3>
              </div>
              <button className="text-xs text-emerald-600 font-medium flex items-center gap-0.5 hover:underline">
                View All <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-4">
              {goals.map((goal) => {
                const progress = Math.round((goal.current / goal.target) * 100)
                const GoalIcon = goalIcons[goal.name] || Target
                return (
                  <div key={goal.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          goal.color === 'emerald' ? 'bg-emerald-50' : goal.color === 'blue' ? 'bg-blue-50' : 'bg-purple-50'
                        }`}>
                          <GoalIcon className={`w-4 h-4 ${
                            goal.color === 'emerald' ? 'text-emerald-600' : goal.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                          }`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-700">{goal.name}</p>
                          <p className="text-[11px] text-slate-400">
                            {showValues ? formatCurrency(goal.current) : '••••'} / {formatCurrency(goal.target)}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-emerald-600">{progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className={`h-full rounded-full ${
                          goal.color === 'emerald' ? 'bg-emerald-500' :
                          goal.color === 'blue' ? 'bg-blue-500' : 'bg-purple-500'
                        }`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Market Trends */}
          <div className="bg-white rounded-xl p-5 border border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-semibold text-slate-800">Market Trends</h3>
            </div>
            <div className="space-y-2.5">
              {marketTrends.map((trend) => (
                <div key={trend.name} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                  <div>
                    <p className="text-xs font-medium text-slate-500">{trend.name}</p>
                    <p className="text-sm font-semibold text-slate-800">{trend.value}</p>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold ${
                    trend.up ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                  }`}>
                    {trend.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {trend.change}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Investments */}
        <div className="bg-white rounded-xl p-5 border border-slate-100 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-800">Recent Investments</h3>
            <button className="text-xs text-emerald-600 font-medium flex items-center gap-0.5 hover:underline">
              View All <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  {['Fund', 'Type', 'Amount', 'Date', 'Status'].map((h) => (
                    <th key={h} className="text-left text-[11px] font-medium text-slate-400 uppercase tracking-wider pb-2.5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentInvestments.map((inv, i) => (
                  <tr key={i} className="border-b border-slate-50 last:border-0">
                    <td className="py-3 pr-3 text-sm font-medium text-slate-700">{inv.fund}</td>
                    <td className="py-3 pr-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${inv.type === 'SIP' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                        {inv.type}
                      </span>
                    </td>
                    <td className="py-3 pr-3 text-sm text-slate-700">{showValues ? formatCurrency(inv.amount) : '••••'}</td>
                    <td className="py-3 pr-3 text-sm text-slate-400">{inv.date}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${inv.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-3">
            {recentInvestments.map((inv, i) => (
              <div key={i} className="p-3 rounded-lg bg-slate-50">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-medium text-slate-700 truncate pr-2">{inv.fund}</p>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium shrink-0 ${inv.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                    {inv.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{inv.type}</span>
                  <span>{showValues ? formatCurrency(inv.amount) : '••••'}</span>
                  <span>{inv.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
