// import './App.css';
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Signup from './components/Signup';
// import Login from "./components/Login";
// import Forget from './components/forget';
// import Reset from "./components/reset"
// import Dashboard from './components/Dashboard';

// function App() {
//   return ( 
    
//     <div >
//     <BrowserRouter>
//       <Routes>
//       <Route exact path="/" element={<Signup />} />
//       <Route exact path="/Login" element={<Login />} />
//       <Route exact path="/Dashboard" element={<Dashboard />} />
//       <Route exact path="/forget" element={<Forget />} />
//       <Route exact path="/Reset" element={<Reset />} />
        
       
//       </Routes>
//     </BrowserRouter>
//     </div>
//   );
// }
// export default App;



// import React from 'react';
// import { useRoutes } from 'react-router-dom';
// import Signup from './components/Signup';
// import Login from "./components/Login";
// import Forget from './components/forget';
// import Reset from "./components/reset"
// import Dashboard from './components/Dashboard';
// import ProtectedRoute from './components/protectedRoute';
// // import { Provider } from 'react-redux';
// const routes = [
//   {
//     path: '/',
//     element: <ProtectedRoute element={<Dashboard/>}/>,
//     children: [
//       { path: 'Dashboard', element: <Dashboard /> }
//     ]
//   },
//   { path: '/Signup', element: <Signup /> },
//   { path: '/Login',  element: <Login /> },
//   { path: '/Forget', element: <Forget /> },
//   { path: '/Reset',  element: <Reset /> }
  

// ];

// const App = () => {
//   const routing = useRoutes(routes);

//   return routing;
// };

// export default App;




import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from "./components/Login";
import Forget from './components/forget';
import Reset from "./components/reset"
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/protectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Dashboard/>} />}>
          <Route path="Dashboard" element={<Dashboard />} />
        </Route>
        <Route path="Signup" element={<Signup />} />
        <Route path="Login" element={<Login />} />
        <Route path="Forget" element={<Forget />} />
        <Route path="Reset" element={<Reset />} />
      </Routes>
    </Router>
  );
};

export default App;
