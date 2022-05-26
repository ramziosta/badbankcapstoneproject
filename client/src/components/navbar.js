import React from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function NavBar(props) {
  const [loginData, setLoginData] = React.useState(
    Cookies.get("loginData") ? JSON.parse(Cookies.get("loginData")) : null
  );
  let name;
  !loginData ? (name = Cookies.get("name")) : (name = loginData.name);
  const [loggedInUser, setLoggedInUser] = React.useState(props.loggedInUser);

  function handleLogout() {
    Cookies.remove("name");
    Cookies.remove("email");
    Cookies.remove("loggedInUser");
    Cookies.remove("token");
    Cookies.remove("loginData");
    setLoginData(null);
    window.location.reload();
  }

  return (
    <>
      {loginData ? (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <span className="navbar-text">
              Logout{" "}
              <Link
                to="/"
                className="btn btn-dark"
                onClick={handleLogout}
                style={{ border: "solid 4px black" }}
              >
                Logout
              </Link>
            </span>
          </div>
        </nav>
      ) : loggedInUser ? (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <i className="fa fa-home"></i>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link " href="#/dashboard">
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#/deposit">
                    Deposit
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link " href="#/withdraw">
                    Withdraw
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link " href="#/transactions">
                    Transactions
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link " href="#/alldata">
                    All Data
                  </a>
                </li>
              </ul>
              <span className="navbar-text">
                <Link to="/" onClick={handleLogout}>
                  Log out
                </Link>
              </span>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Home
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="#/CreateAccount"
                  >
                    Create Account
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#/login">
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default NavBar;
