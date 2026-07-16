import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Store from './pages/Store'
import Vote from './pages/Vote'
import Dashboard from './pages/Dashboard'
import AdRewards from './pages/AdRewards'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ad-rewards" element={<AdRewards />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
