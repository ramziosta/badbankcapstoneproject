import React from "react";
import Cookies from 'js-cookie';

function AllData(){
    const [data,setData] = React.useState('');
    var myHeaders = new Headers();

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











    React.useEffect(()=> {
        // fetch all accounts from API
        fetch("/account/all", requestOptions)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            setData(data)
        });
    }, []);

    return(<>
    {data.length < 1 ? (<>
        <h1>All Customer Data</h1>
        <table className="table table-sm table-dark" style={{height:'500px', border:'1px groove white'}}>
  <thead>
    <tr>
      <th>#</th>
      <th >Name</th>
      <th >Email</th>
      <th >Password</th>
      <th >Balance</th>
      <th >Permissions</th>
    </tr>
  </thead>
  <tbody>
    {data.map((user,i) => {
        return(
        <tr key={i}>
      <td>{i + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.password}</td>
      <td>${user.balance}</td>
      <td>{user.scopes}</td>
        </tr>)
    })}
  </tbody>
</table>
    </>) : (<>
        <h1>All Customer Data</h1>
        <table className="table table-sm table-dark" style={{height:'500px', border:'1px groove white'}}>
  <thead>
    <tr>
      <th >#</th>
      <th >Name</th>
      <th >Email</th>
      <th >Balance</th>
      <th >Permissions</th>
    </tr>
  </thead>
  <tbody>
    {data.map((user,i) => {
        return(
        <tr key={i}>
      <td>{i + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.password}</td>
      <td>${user.balance}</td>
      <td>{user.scopes}</td>
        </tr>)
    })}
  </tbody>
</table>
    </>)}
    </>)
};

export default AllData;