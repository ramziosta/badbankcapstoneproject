import React from "react";
import Cookies from "js-cookie";
import {useHistory} from 'react-router-dom';
function AllData() {
  const [data, setData] = React.useState("");
  var myHeaders = new Headers();

  let history = useHistory();
  function handleClick() {
    history.push("/login");
  }

  const [loginData, setLoginData] = React.useState(
    Cookies.get("loginData") ? JSON.parse(Cookies.get("loginData")) : null
  );

  let email;
  let uri;
  !loginData ? (email = Cookies.get("email")) : (email = loginData.email);
  !loginData ? (uri = `/account/all}`) : (uri = `/account/all`);
  if (!Cookies.get("loginData") && !Cookies.get("loggedInUser")) {
    handleClick();
  }

  //JWT auth
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  React.useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await fetch("/account/all", requestOptions);
        setData(response.data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllUsers();
  }, []);

  // let usersList = data.map((user, i) => {
  //   return (
  //     <tr key={i}>
  //       <td>{i + 1}</td>
  //       <td>{user.name}</td>
  //       <td>{user.email}</td>
  //       <td>{user.password}</td>
  //       <td>${user.balance}</td>
  //     </tr>
  //   );
  // });

  return (
    <>
      <div className="content">
        <h4
          className="header"
          style={{
            fontSize: "1.3rem",
            color: "white",
            padding: ".4rem",
            border: "solid black 1px",
            backgroundColor: "#0079d5",
            width: "100%",
          }}
        >
          BadBank Clients
        </h4>
        <h4
          className="header"
          style={{
            fontSize: "1.3rem",
            color: "white",
            padding: ".4rem",
            border: "solid black 1px",
            backgroundColor: "grey",
            width: "100%",
          }}
        >
          Current Registered Users:
        </h4>

        <table className="table">
          <thead>
            <tr>
              <th className="fs-6">User Name</th>
              <th className="fs-6">Email</th>
              <th className="fs-6">Account Type</th>
              <th className="fs-6">Account</th>
            </tr>
          </thead>
          {/* <tbody>{usersList}</tbody> */}
        </table>
      </div>
    </>
  );
}

export default AllData;
