// frontend/src/App.jsx

import React from 'react';
import Routes from './router/Routes';
import Header from './components/Header';
import Footer from './components/Footer';

// Page Components
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Features from './pages/Features';
import Viewer from './pages/Viewer';
import { AuthProvider } from './context/AuthContext';

// App Component
function App() {
  return (
    <AuthProvider>
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        <Routes />
      </main>

      {/* Footer */}
      <Footer />
    </div>
    </AuthProvider>
  );
}

export default App;
