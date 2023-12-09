import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Create from './components/Create';
import RouteOps from './components/RouteOps';
import AboutUS from './components/AboutUS'; // Updated to match the file name
import KilterBoard from './components/KilterBoard'; // Import KilterBoard component
import OurTeam from './components/OurTeam'; // Import OurTeam component
// import CreateFriend from './components/CreateFriend'; // Ensure this path is correct
// import Chatbot from './chatbot_components/Chatbot'; // Assuming Chatbot.jsx is the component

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create/:username" element={<Create />} />
          <Route path="/routeops" element={<RouteOps />} />
          <Route path="/about" element={<AboutUS />} /> {/* New Route for AboutUs */}
          <Route path="/kilter" element={<KilterBoard />} /> {/* New Route for KilterBoard */}
          <Route path="/team" element={<OurTeam />} /> {/* New Route for OurTeam */}
          {/* Additional routes can be added here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
