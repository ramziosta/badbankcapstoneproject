import Card from "./context";
import Cookies from 'js-cookie';
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import "../styles/Home.css";


function Home(){
  const activeUser = Cookies.get('loggedInUser');
    return (
     
      <>
      <div>
        <Link
          to="/login"
          className="fa fa-user"
          style={{ color: "#0079d5" }}
        ></Link>
        {/* <!-- Full Page Intro --> */}
        <div
          className="view"
          style={{
            backgroundImage:
              "url('https://mdbootstrap.com/img/Photos/Others/architecture.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          {/* <!-- Mask & flexbox options--> */}
          <div className="mask rgba-gradient d-flex justify-content-center align-items-center">
            {/* <!-- Content --> */}
            <div className="container">
              {/* <!--Grid row--> */}
              <div className="row">
                {/* <!--Grid column--> */}
                <div
                  className="col-md-6 mainText text-center text-md-left mt-xl-5 mb-5 pr-1 pl-0 wow fadeInLeft"
                  data-wow-delay="0.3s"
                >
                  <h2>
                    <b>The Future Of Mobile Banking is here.</b>
                  </h2>
                  <h1
                    className="h1-responsive font-weight-bold mt-sm-5"
                    style={{ fontSize: "5rem" }}
                  >
                    <b className="badbank">
                      <span className="logocolor">B</span>ad
                      <span className="logocolor2">B</span>ank
                    </b>
                  </h1>
                  <hr className="hr-light" />
                  <h1 className="" style={{ color: "#0079d5" }}>
                    <b>
                      <span className="twomill">2,000,000 </span>
                      <br />
                      satisfied clients
                      <br />
                      can't be wrong!
                    </b>
                  </h1>
                  <Link
                    to="/createaccount"
                    className="btn btn-primary fs-2 Link "
                  >
                    Create an Account
                  </Link>
                </div>
                {/* <!--Grid column--> */}
                {/* <!--Grid column--> */}
                <div
                  className="col-md-6 col-xl-5 mt-xl-5 wow fadeInRight"
                  data-wow-delay="0.3s"
                >
                  <img
                    src={
                      "https://mdbootstrap.com/img/Mockups/Transparent/Small/admin-new.png"
                    }
                    alt=""
                    className="img-fluid"
                  />
                </div>
                {/* <!--Grid column--> */}
              </div>
              {/* <!--Grid row--> */}
            </div>
            {/* <!-- Content --> */}
          </div>
          {/* <!-- Mask & flexbox options--> */}
        </div>
        {/* <!-- Full Page Intro --> */}

        {/* <button onClick={getData} type="submit" >Data</button> */}
        <div className="container">
          {/* <!--Grid row--> */}
          <div className="row py-5">
            {/* <!--Grid column--> */}

            <div className="column-66">
              <h4>
                Earn 5X Membership Rewards® Points for flights booked directly
                with airlines or with BadBank Travel up to $500,000 on these
                purchases per calendar year.
                <hr />
                Earn 5X Membership Rewards® Points on all purchases made with
                our revolutionary services through the BadBank App.
              </h4>
            </div>
            <div className="column-33">
              <lottie-player
                src="https://assets10.lottiefiles.com/packages/lf20_vrwomyrm.json"
                background="transparent"
                className="lottie-player"
                speed="1"
                style={{ width: "300px", height: "300px" }}
                loop
                autoplay
              ></lottie-player>
            </div>
            {/* <!--Grid column--> */}
          </div>
          {/* <!--Grid row--> */}
        </div>

        <div className="section-two">
          <div className="container third">
            <div className="row">
              <div className="column-33">
                <Card
                  txtcolor="red"
                  style={{ textAlign: "center" }}
                  body={
                    <lottie-player
                      src="https://assets3.lottiefiles.com/temp/lf20_1ulZsv.json"
                      background="transparent"
                      speed="1"
                      style={{ width: "300px", height: "300px" }}
                      loop
                      autoplay
                    ></lottie-player>
                  }
                />
              </div>
              <div className="column-66">
                <h1 className="xlarge-font logocolor">
                  <b>The Mobile App</b>
                </h1>
                <h1 className="large-font" style={{ color: "black" }}>
                  <b className="xlarge-font logocolor2">
                    Easy. Fast. Secured.{" "}
                  </b>
                </h1>
                <p>
                  <span className="large-font" style={{ fontWeight: "bold" }}>
                    Lightspeed Banking & <br />
                    Investments
                  </span>{" "}
                  <br />
                  You should use our app because lorem ipsum consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <Link
                  to
                  className="btn btn-primary fs-2 Link greenLink"
                  style={{ borderRadius: "0px" }}
                >
                  Download the App
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container third">
          <div className="row">
            <div className="column-66">
              <h1
                className="xlarge-font logocolor"
                style={{ marginTop: "2rem" }}
              >
                <b>
                  Online Banking Made
                  <br />
                  <span className="easier" style={{ fontSize: "5rem" }}>
                    Easier!
                  </span>{" "}
                </b>
              </h1>
              <h1 className="large-font" style={{ color: "black" }}>
                <b> Quantum Speed transactions.</b>
              </h1>
              <p>
                <span style={{ fontSize: "24px" }}>
                  Our pattened revolutionsry new way in mobile banking.
                </span>{" "}
                Quantum speed computing to propell your finances, incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquipex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <Link
                to
                className="btn btn-primary fs-2 Link"
                style={{ borderRadius: "0px" }}
              >
                Read More
              </Link>
            </div>
            <div className="column-33">
              <Card
                txtcolor="black"
                body={
                  <lottie-player
                    src="https://assets5.lottiefiles.com/packages/lf20_yzoqyyqf.json"
                    background="transparent"
                    speed="1"
                    style={{ width: "300px", height: "300px" }}
                    loop
                    autoplay
                  ></lottie-player>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>

);  
  }
  
  export default Home;