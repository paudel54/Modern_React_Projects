import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../../firebase";
import "./chat.scss";

import { useAuth } from "../contexts/AuthContext";

const Chats = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);
  const [loading, setLoading] = useState(true);

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
              },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
      });
  }, [user, navigate]);

  const LogoutHandler = async () => {
    await auth.signOut();
    navigate("/");
  };

  if (!user || loading) return "Loading ...";

  return (
    <div className="chat-page">
      <div className="nav-bar">
        <div className="logo-tab">{`❤️ ${user?._delegate?.displayName}`}</div>
        <div className="logout-tab" onClick={LogoutHandler}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh-66px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
