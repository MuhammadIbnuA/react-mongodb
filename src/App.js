import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './component/navbar.css'; // Import the CSS file
import HomeContent from './component/home';
import PasienContent from './component/Tpasien';
import DokterContent from './component/Tdokter';
import PemeriksaanContent from './component/Tpemeriksaan';
import ObatContent from './component/Tobat';
import DokterMContent from './component/Mdokter';
import PasienMContent from './component/Mpasien';
import PemeriksaanMContent from './component/Mpemeriksaan';
import ObatMContent from './component/Mobat';
import LoginForm from './component/Mhome';

const Home = () => {
  return (
    <div>
      <h1></h1>
      <HomeContent />
    </div>
  );
}

const Pasien = () => {
  return (
    <div>
      <h1></h1>
      <PasienContent />
    </div>
  );
}

const Dokter = () => {
  return (
    <div>
      <h1></h1>
      <DokterContent />
    </div>
  );
}

const Pemeriksaan = () => {
  return (
    <div>
      <h1></h1>
      <PemeriksaanContent />
    </div>
  );
}

const Obat = () => {
  return (
    <div>
      <h1></h1>
      <ObatContent />
    </div>
  );
}

const DokterM = () => {
  return (
    <div>
      <h1></h1>
      <DokterMContent />
    </div>
  );
}

const PasienM = () => {
  return (
    <div>
      <h1></h1>
      <PasienMContent />
    </div>
  );
}

const PemeriksaanM = () => {
  return (
    <div>
      <h1></h1>
      <PemeriksaanMContent />
    </div>
  );
}

const ObatM = () => {
  return (
    <div>
      <h1></h1>
      <ObatMContent />
    </div>
  );
}

const LoginPage = ({ onColorChange }) => {
  return (
    <div>
      <h1></h1>
      <LoginForm onColorChange={onColorChange} />
    </div>
  );
}

const handleLogout = () => {
  // Remove the token from local storage
  localStorage.removeItem('token');
}

const NavBar = ({ color }) => {
  return (
    <nav className="navbar" style={{ backgroundColor: color }}>
      <ul>
        <li>
          <Link to="/login">Login Page</Link>
        </li>
        <li>
          <Link to="/pasienmongo">Pasien</Link>
        </li>
        <li>
          <Link to="/doktermongo">Dokter</Link>
        </li>
        <li>
          <Link to="/pemeriksaanmongo">Pemeriksaan</Link>
        </li>
        <li>
          <Link to="/obatmongo">Obat</Link>
        </li>
        <li>
          <Button variant="warning" onClick={handleLogout}>Logout</Button>
        </li>
      </ul>
    </nav>
  );
}

const App = () => {
  const [navbarColor, setNavbarColor] = useState('#563d7c');

  const handleColorChange = (color) => {
    setNavbarColor(color);
  };

  return (
    <Router>
      <NavBar color={navbarColor} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pasien" element={<Pasien />} />
        <Route path="/dokter" element={<Dokter />} />
        <Route path="/pemeriksaan" element={<Pemeriksaan />} />
        <Route path="/obat" element={<Obat />} />
        <Route path="/doktermongo" element={<DokterM />} />
        <Route path="/pasienmongo" element={<PasienM />} />
        <Route path="/pemeriksaanmongo" element={<PemeriksaanM />} />
        <Route path="/obatmongo" element={<ObatM />} />
        <Route
          path="/login"
          element={<LoginPage onColorChange={handleColorChange} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
