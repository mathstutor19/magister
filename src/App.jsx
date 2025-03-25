
import './App.css'
import CardDetail from './components/CardDetail/CardDetail';
import Home from './pages/Home/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card/:id" element={<CardDetail/>} /> {/* Dinamik Route */}
      </Routes>
    </Router>
    </>
  )
}

export default App
