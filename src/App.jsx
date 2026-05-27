import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import ExploreFunds from './pages/ExploreFunds'
import AIAssistant from './pages/AIAssistant'
import LearningHub from './pages/LearningHub'

const noFooterPages = ['/dashboard', '/ai-assistant']

function App() {
  const location = useLocation()
  const showFooter = !noFooterPages.includes(location.pathname)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<ExploreFunds />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/learn" element={<LearningHub />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  )
}

export default App
