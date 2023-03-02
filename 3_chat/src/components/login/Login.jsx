import "./login.scss";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import firebase from "firebase/compat/app";
import { auth } from "../../firebase";

const Login = () => {
  return (
    <div id="login-page">
      <div className="login-card">
        <h2>Welcome❤️</h2>
        <div
          className="login-button google"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
          }
        >
          <GoogleOutlined />
          <span className="icon_margin">Sign In with Google</span>
          <br /> <br />
        </div>

        <div
          className="login-button facebook"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
          }
        >
          <FacebookOutlined />
          <span className="icon_margin">Sign In with Facebook</span>
          <br /> <br />
        </div>
      </div>
    </div>
  );
};

export default Login;
