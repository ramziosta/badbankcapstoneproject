import React from 'react';
import { Route, HashRouter, Link, Switch } from "react-router-dom";
import NavBar from './components/navbar';
import Home from './components/home';
import Login from './components/login';
import Dashboard from './components/dashboard';
import CreateAccount from './components/createaccount';
import Transactions from './components/transactions';
import AllData from './components/alldata';
import Deposit from './components/deposit';
import Withdraw from './components/withdraw';
import Cookies from 'js-cookie';
let loggedInUser = Cookies.get('loggedInUser');

const scopes = ['user', 'admin']


function App(){
  const [loginData, setLoginData] =React.useState(
    Cookies.get('loginData')
    ? (JSON.parse(Cookies.get('loginData')))
    : (null)
  );
    let name;
 !loginData ? name = Cookies.get('name') : name = loginData.name;

  return(
    <HashRouter>
    <NavBar loggedInUser={loggedInUser}/> 
    <div className ="container" style={{padding: "10px"}}></div>
    {loggedInUser || loginData ? (
     <div style={{position:'relative', color:'red',fontSize:'1.5rem', textAlign:'right', padding:'15px'}}>{`Welcome, ${name || ''} `} 
        </div>
    ) : ('')}

    <Switch>
    <Route exact path="/"><Home/></Route>
            <Route path="/login"><Login/></Route>
            <Route path="/dashboard"><Dashboard/></Route>
            <Route path="/CreateAccount"><CreateAccount/></Route>
            <Route path="/Transactions"><Transactions/></Route>
            <Route path="/AllData"><AllData/></Route>
            <Route path="/Deposit"><Deposit/></Route>
            <Route path="/Withdraw"> <Withdraw/></Route>
    </Switch>
  </HashRouter>
  )
};

export default App;
