import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import History from './pages/History'
import Map from './pages/Map'
import Shops from './pages/Shops'
import FunActivities from './pages/FunActivities'
import GovernmentPlaces from './pages/GovernmentPlaces'
import Temples from './pages/Temples'
import Companies from './pages/Companies'
import './index.css'

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/map" element={<Map />} />
            <Route path="/shops" element={<Shops />} />
            <Route path="/fun-activities" element={<FunActivities />} />
            <Route path="/government-places" element={<GovernmentPlaces />} />
            <Route path="/temples" element={<Temples />} />
            <Route path="/companies" element={<Companies />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App