import React from "react";
import bg from "../Images/23984.png";
import logo from "../Images/logo.png";
import { Row, Col } from "react-bootstrap";
import "./LandingPage.css";
import Home from "../Components/Home";
import Quiz from "../Components/Quiz";
import End from "../Components/End"
import { useSelector,useDispatch } from "react-redux";
function LandingPage() {
  const pageState=useSelector((state)=>state.pageSlice)
  const celebrationState=useSelector((state)=>state.scoreSlice.celebration)
  const score=useSelector((state)=>state.scoreSlice.score)
  console.log(score);
 
  return (
   
<div style={{ backgroundImage:celebrationState&& `url("https://i.pinimg.com/originals/12/4d/e3/124de3d1b5e12f1d8fcec1685e634361.gif")` }} className="newclass position-relative">
   {/* <img  className="position-absolute w-100 img-fluid -z-5" src="https://i.pinimg.com/originals/12/4d/e3/124de3d1b5e12f1d8fcec1685e634361.gif" alt="" /> */}
    <div>
       <Row style={{ height: "100vh" }}>
          <Col
            xs={12}
            sm={12}
            md={5}
            lg={5}
            className="col1 d-flex flex-wrap align-items-center position-relative"
          >
            <img
              width={"300px"}
              className="img1 position-absolute img-fluid"
              style={{ top: "0px" }}
              src={bg}
              alt=""
            />
            <div
              style={{ top: "200px", left: "130px", textAlign: "justify" }}
              className="headdiv position-absolute"
            >
              <h1>
                <img src={logo} className="img-fluid" alt="" />
              </h1>
              <h5 className="fs-3" style={{ lineHeight: "40px" }}>
                Welcome to QuizWiz, where knowledge meets joy! Embark on an
                adventure of discovery, igniting your inner quiz champion. Join us
                on this exhilarating journey!
              </h5>
            </div>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={7}
            lg={7}
            className="col2 d-flex  align-items-center justify-content-center p-4"
          >
            <img
              width={"300px"}
              className="img2  position-absolute"
              style={{ top: "0px", right: "1px" }}
              src={bg}
              alt=""
            />
  
            <div
              style={{ width: "50rem", border: "2px solid black" }}
              className="sdiv z-1 h-75 shadow card "
            >
             {pageState === 'home' ? <Home /> : pageState === 'quiz' ? <Quiz /> : <End />}
  
            </div>
            <img
              width={"300px"}
              className="img3 position-absolute img-fluid"
              style={{ bottom: "-50px" }}
              src={bg}
              alt=""
            />
          </Col>
        </Row>
    </div>
    </div>
  );
}

export default LandingPage;
