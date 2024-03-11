import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/Signup';
function App() {
  return (
    <div >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />}>

        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
