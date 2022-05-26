import React from "react";
import { Link } from "react-router-dom";
import Card from "./context";
import Cookies from "js-cookie";
import "./login.css";
import { GoogleLogin } from "react-google-login";

function Login() {
  const currentUser = Cookies.get("loggedInUser");
  return (
    <>{currentUser ? <AfterLogin></AfterLogin> : <LoginForm></LoginForm>}</>
  );
}

function AfterLogin() {
  return (
    <>
      {Cookies.get("loginData") ? (
        <div style={{ padding: "25px" }}>
          <div
            style={{
              padding: "25px",
              textAlign: "center",
              background: "red",
              border: "3px solid black",
            }}
          >
          </div>
        </div>
      ) : (
        <>
          <h3 style={{ textAlign: "center" }}>welocome</h3>
          <div className="link-container">
            <div className="link-item">
              <Link to="/deposit">
                {" "}
                <button id="link-btn" type="submit" className="btn btn-primary">
                  Deposit
                </button>
              </Link>
            </div>
            <div className="link-item">
              <Link to="/withdraw">
                {" "}
                <button id="link-btn" type="submit" className="btn btn-danger">
                  Withdraw
                </button>
              </Link>
            </div>
            <div className="link-item">
              <Link to="/dashboard">
                {" "}
                <button id="link-btn" type="submit" className="btn btn-success">
                  Dashboard
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function LoginForm(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [loginData, setLoginData] = React.useState(
    Cookies.get("loginData") ? JSON.parse(Cookies.get("loginData")) : null
  );

  let disable = true;
  if (email.length > 2 && password.length > 2) disable = false;

  function handle() {
    var expiration = new Date(new Date().getTime() + 60 * 60 * 1000);
    let lowerEmail = email.toLowerCase();
    fetch(`/account/login/${lowerEmail}/${password}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          //console.log('JSON:', data);
          Cookies.set("loggedInUser", true, { expires: expiration });
          Cookies.set("name", data.name, { expires: expiration });
          Cookies.set("email", data.email, { expires: expiration });
          Cookies.set("token", data.token, { expires: expiration });
          window.location.reload();
        } catch (err) {
          setErrorMsg(text);
        }
      });
  }

  const handleFailure = (result) => {
    alert(JSON.stringify(result));
  };

  const handleLogin = () => {
    var expiration = new Date(new Date().getTime() + 60 * 60 * 1000);
    Cookies.set("loginData", {
      expires: expiration,
    });
    Cookies.set("loggedInUser", { expires: expiration });
  
    window.location.reload();

  };

 

  return (
    <>
      <div className="container-login">
        <div className="wrapper">
          <small
            style={{
              color: "red",
              fontWeight: "bold",
              backgroundColor: "grey",
            }}
          >
            {errorMsg}
          </small>
          <div className="title">
            <span>Login To Your Account</span>
          </div>
          <form>
            <div className="row">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                required
              />
            </div>
            <div className="row">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                required
              />
            </div>
            <div className="row button">
              <button
                id="submit-btn"
                onClick={handle}
                type="submit"
                disabled={disable}
              >
                Login
              </button>
            </div>
            <hr />
            <div className="signup-link">
              Not a member?{" "}
              <Link id="create-account-link" to="/createaccount">
                {" "}
                Sign up here.
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
