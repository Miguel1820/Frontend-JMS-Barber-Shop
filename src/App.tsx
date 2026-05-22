import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Booking from './pages/Booking';
import Contact from './pages/Contact';

const App: React.FC = () => (
  <Router>
    <nav className="bg-gray-900 text-white p-4 flex gap-6">
      <Link to="/">Inicio</Link>
      <Link to="/services">Servicios</Link>
      <Link to="/gallery">Galería</Link>
      <Link to="/booking">Reservar</Link>
      <Link to="/contact">Contacto</Link>
    </nav>
    <main className="p-8">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </main>
  </Router>
);

export default App;