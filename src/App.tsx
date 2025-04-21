import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CodeAnalyzer from './pages/CodeAnalyzer';
import InfrastructureScanner from './pages/InfrastructureScanner';
import CarbonCalculator from './pages/CarbonCalculator';
import Compliance from './pages/Compliance';
import Layout from './components/Layout';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="code-analyzer" element={<CodeAnalyzer />} />
          <Route path="infrastructure" element={<InfrastructureScanner />} />
          <Route path="carbon-calculator" element={<CarbonCalculator />} />
          <Route path="compliance" element={<Compliance />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;