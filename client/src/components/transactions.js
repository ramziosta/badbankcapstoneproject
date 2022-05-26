import React from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function Transactions() {
  const [data, setData] = React.useState("");
  let history = useHistory();
  function handleClick() {
    history.push("/login");
  }

  const token = Cookies.get("token");
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);
  const [loginData, setLoginData] = React.useState(
    Cookies.get("loginData") ? JSON.parse(Cookies.get("loginData")) : null
  );
  let email;
  let uri;
  !loginData ? (email = Cookies.get("email")) : (email = loginData.email);
  !loginData
    ? (uri = `/account/findOne/${email}`)
    : (uri = `/account/googlefindOne/${email}`);

  //JWT auth
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  React.useEffect(() => {
    // fetch all accounts from API
    fetch(uri, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setData(data);
      });
    // Push to login if not logged in
    if (!Cookies.get("loginData") && !Cookies.get("loggedInUser")) {
      handleClick();
    }
  }, []);

  return (
    <>
      {!data ? (
        <div className="loading"></div>
      ) : (
        <div className="container">
          <div>
            <h4>Transaction History</h4>
            <br />
            <table
              className="table "
              style={{ border: "1px solid white", color:"white" ,backgroundColor:"rgb(50 11 190)" }}
            >
              <thead>
                <tr>
                  <th >Date</th>
                  <th>Transaction Type</th>
                  <th >Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.transactions.length > 0 ? (
                  data.transactions.map((trans, i) => {
                    return (
                      <tr key={i}>
                        <td>{trans.date}</td>
                        <td>{trans.type}</td>
                        <td>${trans.transactionAmount}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>
                      Access your account
                      <br />
                      <Link style={{ padding: "2px" }} to="/deposit">
                        <button
                          style={{ padding: "2px" }}
                          type="submit"
                          className="btn btn-light"
                        >
                          Deposit
                        </button>
                      </Link>
                      <Link style={{ padding: "2px" }} to="/withdraw">
                        <button
                          style={{ padding: "2px" }}
                          type="submit"
                          className="btn btn-light"
                        >
                          Withdraw
                        </button>
                      </Link>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

function BalanceMsg(props) {
  return (
    <>
      <h5>Your Balance is :</h5>
    </>
  );
}

function BalanceForm(props) {
  const [balance, setBalance] = React.useState("");
  const [loginData, setLoginData] = React.useState(
    Cookies.get("loginData") ? JSON.parse(Cookies.get("loginData")) : null
  );
  let email;
  let uri;
  !loginData ? (email = Cookies.get("email")) : (email = loginData.email);
  !loginData
    ? (uri = `/account/findOne/${email}`)
    : (uri = `/account/googlefindOne/${email}`);

  function handle() {
    fetch(uri)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          props.setShow(false);
          setBalance(data.balance);
          props.setStatus(data.balance);
        } catch (err) {
          props.setStatus(text);
        }
      });
  }

  return (
    <>
      <button type="submit" className="btn btn-light" onClick={handle}>
        Balance
      </button>
    </>
  );
}

export default Transactions;
