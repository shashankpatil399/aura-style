import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from "./components/Login";
import Forget from './components/forget';
import Reset from "./components/reset"
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Sidebarapp from './components/Sidebar';
import ProtectedRoute from './components/protectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />}>
          <Route path="Dashboard" element={<Dashboard />} />
        </Route>
        <Route path="Header" element={<Header />} />
        <Route path="Sidebarapp" element={<Sidebarapp />} />
        <Route path="Signup" element={<Signup />} />
        <Route path="Login" element={<Login />} />
        <Route path="Forget" element={<Forget />} />
        <Route path="Reset" element={<Reset />} />
      </Routes>
    </Router>
  );
};

export default App;
