
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './components/Signup';
import Login from "./components/Login";
import Forget from './components/forget';
import Reset from "./components/reset"
import Dashboard from './components/Dashboard';
import HeaderBar from './components/HeaderBar';
import ProtectedRoute from './components/protectedRoute';
import Customer from './components/Customer';
import ChangePass from "./components/ChangePass"
import Profile from "./components/profile"
import Update from "./components/UpdateUser"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />}>
          <Route path="Dashboard" element={<Dashboard />} />
        </Route>
        <Route path="Customer" element={<Customer />} />
        <Route path='Update/:id' element={<Update />} />
        <Route path="ChangePass" element={<ChangePass />} />
        <Route path="HeaderBar" element={<HeaderBar />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="Login" element={<Login />} />
        <Route path="Forget" element={<Forget />} />
        <Route path="Reset" element={<Reset />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
      <ToastContainer /> {/* Ensure ToastContainer is rendered at the top level */}
    </Router>
  );
};

export default App;

