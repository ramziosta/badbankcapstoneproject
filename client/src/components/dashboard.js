import React from "react";
import "./dashboard.css";
import Cookies from "js-cookie";
import { useHistory, Link } from "react-router-dom";

function Dashboard() {
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
          <div className="dashboard-header">
            <h4>Account Summary</h4>
            <br />
            <h6>Checking</h6>
            <div className="dashboard-accounts">
              <table
                className="table "
                style={{ border: "1px groove white",backgroundColor:"rgb(50 107 165)", color:"white"}}
              >
                <thead>
                  <tr>
                    <th >Account Type</th>
                    <th>Current Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {data.accountChecking
                        ? `Checking-${data.accountChecking}`
                        : ""}
                    </td>
                    <td>
                      {data.balance
                        ? `Balance: $${Number.parseFloat(data.balance).toFixed(
                            2
                          )}`
                        : "$0"}
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>
                      {data.savings
                        ? `Savings-${data.savings.accountNumber}`
                        : ""}
                    </td>
                    <td>{data.savings ? `$${data.savings.balance}` : ""}</td>
                  </tr>
                </tbody>
              </table>
            </div>
           
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
