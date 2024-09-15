import styled from "styled-components";
import  Wrapper  from "../assets/wrappers/LandingPage";

import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
    <nav>
      <Logo />
    </nav>
    <div className="container page">
      <div className="info">
        <h1>
          job <span>Tracking</span> made easy
        </h1>
        <p>
          Jobify is a platform that helps you keep track of all your job applications in one place.
          Xsfjdslfjhsiofhewufbbdskj djskd dsif heiwh xx rent sdf sdfl dskflb 
          soh.
        </p>
        <Link to="/register" className="btn register-link">Register</Link>
        <Link to="/login" className="btn login-link">Login / DemoUser</Link>
      </div>

    </div>
  
    </Wrapper>
  )
}

export default Landing