import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import MlbPage from './pages/MlbPage';
import RybotPage from './pages/Rybot';
import AboutPage from './pages/About';
import ProjectsPage from './pages/Projects';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mlb" element={<MlbPage />} />
        <Route path="/rybot" element={<RybotPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
