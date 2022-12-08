import React from "react";
import styled from "styled-components";

const CookieHolder = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: lightgray;
  z-index: 99999999999;
  padding: 20px;
`;

const CookieDiv = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
`;
const P = styled.p`
  color: black;
  font-size: 18px;
`;
const H3 = styled.h3`
  color: black;
  font-size: 26px;
  font-weight: bold;
`;
const Button = styled.button`
  color: white;
  background-color: black;
  padding: 15px 25px;
`;
function Cookie({ setShowCookie }) {
  function acceptCookie() {
    setShowCookie(false);
    localStorage.setItem("cookie", "true");
  }
  return (
    <>
      <CookieHolder>
        <CookieDiv>
          <H3>Cookie Settings</H3>
          <P>
            We use cookies and similiar technologies to help personalize content
            tailor and measure ads, and provide a better experience. By clicking
            accept, you agree to this, as outlined in our Cookie Policy.
          </P>
          <Button onClick={acceptCookie}>Accept</Button>
        </CookieDiv>
      </CookieHolder>
    </>
  );
}

export default Cookie;
