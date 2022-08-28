import React from "react";
import { Link } from "react-router-dom";
import DarkMode from "../components/darkmode/DarkMode";
import Wrapper from "../wrappers/LandingPage";
const logo: string = require("../images/logo.svg").default;
const main: string = require("../images/main.svg").default;
const Home = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="jobster logo" className="logo" />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            facilis blanditiis similique sit sapiente culpa hic aliquam odit
            veniam tenetur atque, corporis quis nobis perspiciatis ducimus
            possimus doloribus eveniet! Harum? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Vitae eveniet exercitationem
            inventore, volup
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
      <DarkMode />
    </Wrapper>
  );
};

export default Home;
