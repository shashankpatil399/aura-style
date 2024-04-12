
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';
// import Signup from './components/Signup';
// import Login from "./components/Login";
// import Forget from './components/forget';
// import Reset from "./components/reset"
// import Dashboard from './components/Dashboard';
// import HeaderBar from './components/HeaderBar';
// import ProtectedRoute from './components/protectedRoute';
// import Customer from './components/Customer';
// import ChangePass from "./components/ChangePass"
// import Profile from "./components/profile"
// import Update from "./components/UpdateUser"

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<ProtectedRoute element={<Dashboard />} />}>
//           <Route path="Dashboard" element={<Dashboard />} />
//         </Route>
//         <Route path="Customer" element={<Customer />} />
//         <Route path='Update/:id' element={<Update />} />
//         <Route path="ChangePass" element={<ChangePass />} />
//         <Route path="HeaderBar" element={<HeaderBar />} />
//         <Route path="/Signup" element={<Signup />} />
//         <Route path="Login" element={<Login />} />
//         <Route path="Forget" element={<Forget />} />
//         <Route path="Reset" element={<Reset />} />
//         <Route path="profile" element={<Profile />} />
//       </Routes>
//     </Router>
//   );
// };
// export default App;





import React from 'react';
import { useRoutes } from 'react-router-dom';
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
import Category from './components/category';
import Product from './components/Product';
import Size from './components/size';


const routes = [
  {
    path: '/',
    element: <ProtectedRoute element={<Dashboard />} />,
    children: [
      { path: 'Dashboard', element: <Dashboard /> },

    ]
  },

  { path: 'Size', element: <Size /> },
  { path: 'product', element: <Product /> },
  { path: 'category', element: <Category /> },
  { path: 'Customer', element: <Customer /> },
  { path: 'Update/:id', element: <Update /> },
  { path: 'ChangePass', element: <ChangePass /> },
  { path: 'HeaderBar', element: <HeaderBar /> },
  { path: 'profile', element: <Profile /> },
  { path: 'Signup', element: <Signup /> },
  { path: 'Login', element: <Login /> },
  { path: 'Forget', element: <Forget /> },
  { path: 'Reset', element: <Reset /> },
];

const App = () => {
  const routing = useRoutes(routes);

  return routing;


};

export default App;


