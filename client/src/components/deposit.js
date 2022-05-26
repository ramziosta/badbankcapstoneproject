import React from "react";
import Cookies from 'js-cookie';
import Card from "./context";
import {useHistory} from 'react-router-dom';


function Deposit(){
  const [balance,setBalance] = React.useState('');
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState(''); 
    const [loginData, setLoginData] =React.useState(
      Cookies.get('loginData')
      ? (JSON.parse(Cookies.get('loginData')))
      : (null)
    ); 
    let history = useHistory();
      function handleClick() {
        history.push("/login");
      };

    React.useEffect(()=> {
      let balanceUri;
      let email;
      !loginData ? email = Cookies.get('email') : email = loginData.email;
      !loginData ? balanceUri = `/account/findOne/${email}` : balanceUri = `/account/googlefindOne/${email}`;
      // Push to login if not logged in
      if(!Cookies.get('loginData') && !Cookies.get('loggedInUser')) {
        handleClick()
    }
    // Get account balance
    fetch(balanceUri)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            setBalance(data.balance);
        } catch(err) {
            // console.log('err:', err);
        }
    });
  
  }, []);
    return (<>
      <Card
        bgcolor="primary"
        header={<div>
        <h5>Deposit</h5>
          <div style={{border:'solid 1px white', borderRadius:'3px'}}>
          {typeof(balance) === "number" ? (`Balance: $${Number.parseFloat(balance).toFixed(2)}`) : (<div className='loading'></div>)}
          </div>
        </div>}
        status={status}
        body={show ? 
          <DepositForm setShow={setShow} setStatus={setStatus} balance={balance} setBalance={setBalance}/> :
          <DepositMsg setShow={setShow} setStatus={setStatus}/>}
      />
    </>)
  }
  function DepositMsg(props){
    return (<>
      <h5>Deposit Accepted!</h5>
      <button type="submit" 
        className="btn btn-dark" 
        onClick={() => {
            props.setShow(true);
            props.setStatus('');
        }}>
          Make Another Deposit
      </button>
    </>);
  } 
  
  function DepositForm(props){
       const [amount, setAmount] = React.useState('');
       const [loginData, setLoginData] =React.useState(
        Cookies.get('loginData')
        ? (JSON.parse(Cookies.get('loginData')))
        : (null)
      );
        let email;
        let uri;
     !loginData ? email = Cookies.get('email') : email = loginData.email;
     !loginData ? uri = `/account/update/${email}` : uri = `/account/googleupdate/${email}`
     let date = new Date().toDateString();

     //JWT auth
   const token = Cookies.get('token')
   var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${token}`);

var requestOptions = {
 method: 'GET',
 headers: myHeaders,
 redirect: 'follow'
};

       let invalidTransaction = true;
       if(amount >= 1) invalidTransaction = false;
       if(amount < 1) invalidTransaction = true;

    function handle(){
      let depositAmount = Number(amount);
      if(depositAmount < 1)return
      fetch(`${uri}/${depositAmount}`, requestOptions)
      .then(response => response.text())
      .then(text => {
          try {
            const data = JSON.parse(text);
              props.setStatus('Success');
              props.setShow(false);
              // console.log('JSON:', data);
              props.setBalance(props.balance + depositAmount)
          } catch(err) {
              props.setStatus('Deposit failed')
              // console.log('err:', text);
          }
      });
      fetch(`/account/update/transaction/${email}/deposit/${depositAmount}/${date}`, requestOptions).then(response => response.text())
      .then(text => {
          try {
            const data = JSON.parse(text);
            //console.log(data)
          } catch(err) {
             //console.log('err:', text);
          }
      });
    }
  
    return(<>
      Amount<br/>
      <input type="number" 
        className="form-control" 
        placeholder="Enter amount" 
        value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-dark" 
        onClick={handle}
        disabled={invalidTransaction}
        >Deposit</button>
  
    </>);
  };

  export default Deposit;