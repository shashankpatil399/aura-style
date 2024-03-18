import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from './components/Signup';
import Login from "./components/Login";
import ResponsiveDrawer from './components/navigation';

function App() {
  return (
    <div >
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Signup />} />
        {/* <Route path="/" element={<Signup />}> */}
        {/* <Route path="/Login" element={<Login />} /> */}
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/navigation" element={<ResponsiveDrawer/>} />

        
        
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
