import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Results from './pages/Results.jsx'
import About from './pages/About.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/results" element={<Results />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  )
}
