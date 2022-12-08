import React from "react";
import { Desc, Header } from "../styles";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import Footer from "../components/Footer";
import Slider from "../components/Slider/Slider";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 80px;
`;

const Img = styled.img`
  width: 400px;
  margin: 0 auto;
  padding-top: 50px;
`;
function Smartwatch() {
  const nightMode = useSelector((state) => state.mode.night);
  return (
    <>
      <Container>
        <Wrapper>
          <Header
            style={{
              fontSize: "60px",
              color: `${nightMode ? "white" : "black"}`,
            }}
          >
            Smartwatch
          </Header>
          <Img src="https://static.wixstatic.com/media/c3825a_7ad3920eb6ef4560a01d4614395aa78a~mv2.png/v1/fill/w_536,h_420,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/delvfire-watches.png"></Img>
          <Desc
            style={{
              fontSize: "20px",
              marginTop: "30px",
              color: `${nightMode ? "white" : "black"}`,
            }}
          >
            {" "}
            <hr></hr>A smartwatch is a wearable computer in the form of a watch;
            modern smartwatches provide a local touchscreen interface for daily
            use, while an associated smartphone app provides for management and
            telemetry (such as long-term biomonitoring).<br></br> While early
            models could perform basic tasks, such as calculations, digital time
            telling, translations, and game-playing, smartwatches released since
            2015 have more general functionality closer to smartphones,
            including mobile apps, a mobile operating system and WiFi/Bluetooth
            connectivity. <br></br>Some smartwatches function as portable media
            players, with FM radio and playback of digital audio and video files
            via a Bluetooth headset.<br></br>
            Some models, called watch phones (or phone watches), have mobile
            cellular functionality like making calls. <hr></hr>
          </Desc>
        </Wrapper>
      </Container>
      <Slider></Slider>
      <Footer />
    </>
  );
}

export default Smartwatch;
