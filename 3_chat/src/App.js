import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './components/login/Login'
import { AuthProvider } from './components/contexts/AuthContext';
import Chats from "./components/chats/Chats";

function App() {
  return (
    <div>
      {/* Hello guys welcome to chat */}
      <BrowserRouter>
        {/* context provider will wrap this Router later */}
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/chat" element={<Chats />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
