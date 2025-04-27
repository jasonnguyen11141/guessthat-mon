import { useState } from 'react'
import Navbar from "./components/Navbar/Navbar"
import Home from './pages/Home'
import PokemonData from "./components/PokemonData"
import Play from "./pages/Play"
import Collection from "./pages/Collection"
import './App.css'
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import React from 'react'


function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}


export default App;