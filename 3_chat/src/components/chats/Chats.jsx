import React from "react";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../../firebase";
import "./chat.scss";

import { useAuth } from "../contexts/AuthContext";

const Chats = () => {
  const { user } = useAuth();
  console.log(user);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Name❤️</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh-66px)"
        projectId="d5d7d3b7-1adb-4532-891f-982045fb3ca1"
        userName="."
        userSecret="."
      />
    </div>
  );
};

export default Chats;
