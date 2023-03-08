import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home'
import Header from './components/nav/Header'
import RegisterComplete from './pages/auth/RegisterComplete';




import { BrowserRouter, Routes, Route } from "react-router-dom";
// import RegisterComplete from './pages/auth/RegisterComplete';

function App() {
  return (
    <BrowserRouter>
      <>
        {/* <RegisterComplete /> */}
        <Header />
        <ToastContainer />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/complete" element={<RegisterComplete />} />
        </Routes>

      </>

    </BrowserRouter>
  );
}

export default App;
