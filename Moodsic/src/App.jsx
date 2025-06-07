import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Landing from './pages/Landing'
import Mood from './pages/Mood'
import Login from './pages/Login'
import Register from './pages/Register'
import UserPanel from './pages/UserPanel'

import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-panel" element={<UserPanel />} />
      </Routes>
    </Router>
  )
}

export default App
