import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Brain, Target, LineChart, Shield, BarChart3, Zap,
  ArrowRight, TrendingUp, Quote, CheckCircle2, XCircle
} from 'lucide-react'
import { testimonials } from '../data/mockData'
import heroImg1 from '../assets/hero1.png'
import heroImg2 from '../assets/hero2.png'

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

const features = [
  { icon: Brain, title: 'AI Guidance', description: 'Intelligent recommendations matched to your risk profile and financial goals.' },
  { icon: Target, title: 'Goal-Based Investing', description: 'Align every investment with real life goals — retirement, education, or a dream home.' },
  { icon: LineChart, title: 'Smart Portfolio Tracking', description: 'Visual analytics and performance metrics to understand your investments at a glance.' },
  { icon: Shield, title: 'Beginner Friendly', description: 'Plain language, guided workflows, and educational content at every step.' },
  { icon: BarChart3, title: 'Expert Analytics', description: 'Advanced metrics, fund comparisons, and professional-grade analysis when you need it.' },
  { icon: Zap, title: 'Simplified Investing', description: 'Invest in minutes, not hours. Clean workflows designed to reduce decision fatigue.' },
]

const comparisonPoints = [
  {
    title: 'User Experience',
    trad: ['Data-heavy dashboards', 'Technical finance terminology', 'Overwhelming onboarding'],
    aurevia: ['Calm and guided experience', 'Beginner-friendly language', 'Simplified investing journey']
  },
  {
    title: 'Investment Guidance',
    trad: ['Users make decisions alone', 'Requires financial understanding'],
    aurevia: ['AI-powered recommendations', 'Guided investing assistance', 'Smart educational insights']
  },
  {
    title: 'Learning Experience',
    trad: ['Separate learning resources', 'Limited contextual education'],
    aurevia: ['Learn while investing', 'Integrated educational flow', 'AI explanations in simple language']
  },
  {
    title: 'Personalization',
    trad: ['Same interface for everyone'],
    aurevia: ['Beginner Mode & Expert Mode', 'Goal-based recommendations', 'Personalized investing journey']
  },
  {
    title: 'Emotional Experience',
    trad: ['Intimidating for new users', 'Complex financial visuals'],
    aurevia: ['Calm and confidence-focused', 'Simple visual hierarchy', 'Reduced information overload']
  },
  {
    title: 'AI Integration',
    trad: ['Mostly manual exploration'],
    aurevia: ['AI investment assistant', 'Smart portfolio insights', 'AI-powered fund discovery']
  },
  {
    title: 'Future Vision',
    trad: ['Static investing platforms'],
    aurevia: ['Scalable AI wealth ecosystem', 'Adaptive investing experience', 'Intelligent financial guidance']
  }
]

export default function Landing() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-slate-50 to-white pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-sm text-emerald-700 font-medium mb-6">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                AI-Powered Investing Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
                Invest Smarter.
                <br />
                <span className="text-emerald-600">Understand Better.</span>
              </h1>

              <p className="text-lg text-slate-500 leading-relaxed mb-8">
                The investing platform designed for everyone — from first-time investors to seasoned professionals. Make confident decisions with AI-guided insights.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-600/20"
                >
                  Start Investing
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/explore"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  Explore Funds
                </Link>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 aspect-[4/3]">
                <img src={heroImg1} alt="Confident professional managing investments" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>

              {/* Floating Stat Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl shadow-slate-200/60 p-5 border border-slate-100 w-64"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-md">
                    +18.12%
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-0.5">Portfolio Value</p>
                <p className="text-2xl font-bold text-slate-900">₹2,89,400</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Aurevia One is Different */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        {/* Subtle background elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">
              Why Aurevia One is Different
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold mb-5">
              Investing Reimagined for Everyone
            </h3>
            <p className="text-lg text-slate-400">
              Most investing platforms provide tools. Aurevia One provides guidance, clarity, and confidence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12">
            {comparisonPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-slate-700/50"
              >
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                  {point.title}
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  {/* Traditional */}
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Traditional Platforms</p>
                    <ul className="space-y-3">
                      {point.trad.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                          <XCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Aurevia One */}
                  <div>
                    <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-4">Aurevia One</p>
                    <ul className="space-y-3">
                      {point.aurevia.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-white font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visually Strong Quote */}
      <section className="py-24 bg-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <Quote className="w-12 h-12 text-emerald-300/50 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            "Aurevia One is not just another investing app."
          </h2>
          <p className="text-lg sm:text-xl text-emerald-50 leading-relaxed max-w-3xl mx-auto">
            It is a simplified AI-powered investing ecosystem designed to make wealth creation accessible, understandable, and scalable for everyone.
          </p>
        </div>
      </section>

      {/* Features & Dual Image */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">
            <motion.div {...fadeIn} className="lg:col-span-5 relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 aspect-[4/5]">
                <img src={heroImg2} alt="Relaxed investor" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -right-8 top-1/4 bg-white rounded-xl shadow-xl p-4 border border-slate-100 max-w-[240px]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <Brain className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">AI Suggestion</p>
                    <p className="text-sm font-medium text-slate-700 leading-snug">Consider increasing your SIP by 10% this year for faster goal achievement.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div {...fadeIn} className="lg:col-span-7 lg:pl-12">
              <p className="text-sm font-semibold text-emerald-600 tracking-wider uppercase mb-3">Core Features</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-5">
                Everything you need to invest with confidence
              </h2>
              <p className="text-lg text-slate-500 mb-10">
                From AI-powered insights to educational resources, built for a smarter investing experience.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8">
                {features.map((feature, index) => (
                  <div key={feature.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                      <feature.icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 mb-1.5">{feature.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA & Footer Context */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl font-bold text-slate-900 mb-5">
              Ready to start your investing journey?
            </h2>
            <p className="text-lg text-slate-500 mb-8">
              Join smart investors who trust AI-guided investing for better financial outcomes.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors shadow-sm mb-16"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="pt-8 border-t border-slate-100">
              <p className="text-sm font-semibold text-slate-700 mb-1">
                Concept & Product Demo by Dhanush
              </p>
              <p className="text-xs text-slate-400">
                Research inspired through analysis of modern investing platforms including Groww and AssetsPlus.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
