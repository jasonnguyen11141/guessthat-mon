import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from "./components/Navbar/Navbar"
import Play from "./pages/Play";
import Collection from "./pages/Collection";
import Home from "./pages/Home";
import './App.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'

function App() {
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/play" element={<Play />} />
        <Route path="/collection" element={<Collection />} />
      </Routes>
    </Router>
  );
}

export default App