import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../../firebase";
import "./chat.scss";

import { useAuth } from "../contexts/AuthContext";

// const Chats = () => {
//   const { user } = useAuth();
//   // console.log(user);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const handleLogout = async () => {
//     await auth.signOut();
//     navigate("/");
//   };
//   // handles images:
//   const getFile = async (url) => {
//     const response = await fetch(url);
//     // blob contains of binary data of images atachments in binary format: huhu new things known blob
//     const data = await response.blob();
//     return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
//   };

//   useEffect(() => {
//     if (!user) {
//       navigate("/");
//       return;
//     }
//     // it gets all the creates users, if we have we can show for specific user

//     axios
//       .get("https://api.chatengine.io/users/me/", {
//         headers: {
//           // "project-id": "d5d7d3b7-1adb-4532-891f-982045fb3ca1",
//           projectID: "d5d7d3b7-1adb-4532-891f-982045fb3ca1",
//           "user-name": user.email,
//           "user-secret": user.uid,
//           // "private-key": "4665de96-4e14-4a42-94ab-83252b5f6916",
//         },
//       })
//       .then(() => setLoading(false))
//       .catch((error) => {
//         let formdata = new FormData();
//         formdata.append("email", user.email);
//         formdata.append("username", user.email);
//         formdata.append("secret", user.uid);

//         getFile(user.photoURL).then((avatar) => {
//           formdata.append("avatar", avatar, avatar.name);
//           axios
//             // MIGHT NEED FOR DEBUGGING:::
//             .post("https://api.chatengine.io/users/", formdata, {
//               headers: {
//                 "private-key": "4665de96-4e14-4a42-94ab-83252b5f6916",
//               },
//             })
//             .then(() => setLoading(false))
//             .catch((error) =>
//               console.log("resolve this error", error.response)
//             );
//         });
//       });
//   }, [user, navigate]);

//   // if (!user || loading) return "Loading.......";
//   // if (!user || loading) return <div />;

//   return (
//     <div className="chats-page">
//       <div className="nav-bar">
//         <div className="logo-tab">Name❤️</div>
//         <div className="logout-tab" onClick={handleLogout}>
//           Logout
//         </div>
//       </div>
//       <ChatEngine
//         height="calc(100vh-66px)"
//         projectID="d5d7d3b7-1adb-4532-891f-982045fb3ca1"
//         userName={user.email}
//         userSecret={user.uid}
//       />
//     </div>
//   );
// };

// export default Chats;

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
          "project-id": "d5d7d3b7-1adb-4532-891f-982045fb3ca1",
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
                "private-key": "4665de96-4e14-4a42-94ab-83252b5f6916",
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
        projectID="d5d7d3b7-1adb-4532-891f-982045fb3ca1"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
