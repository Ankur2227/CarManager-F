// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';
import HomePage from './Pages/HomePage/HomePage';
import CarDetailPage from './Pages/CarDetailPage/CarDetailPage';
import EditCarPage from './Pages/EditCarPage/EditCarPage'; // Import the new EditCarPage component
import Documentation from './Pages/Documentation/Documentation';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/car-detail/:id" element={<CarDetailPage />} />
        <Route path="/edit-car/:id" element={<EditCarPage />} />
        <Route path="/api/docs" element={<Documentation />} />
      </Routes>
    </div>
  );
}

export default App;
