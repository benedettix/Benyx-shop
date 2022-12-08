import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import Logo from "../img/logoWH.png";
import LogoBK from "../img/logo.png";
import { Link } from "react-router-dom";
import { Li, Ul, Button } from "./Navbar";
import { Desc } from "../styles";
import { useSelector } from "react-redux";

const FooterDiv = styled.div`
  background-color: ${({ theme }) => theme.bg};
  padding: 50px 0;
`;

const Hr = styled.hr`
  color: ${({ theme }) => theme.text};
`;

// const LiEdit = styled(Li)`
//   color: #fff;
// `;

function Footer() {
  const nightMode = useSelector((state) => state.mode.night);
  return (
    <FooterDiv>
      <Hr></Hr>
      <Container>
        <Row>
          <Col
            className="d-flex justify-content-center align-items-center"
            md={3}
          >
            {nightMode ? (
              <Link to={"/"}>
                <img style={{ width: "200px" }} src={Logo} alt="logo" />{" "}
              </Link>
            ) : (
              <Link to={"/"}>
                <img style={{ width: "200px" }} src={LogoBK} alt="logo" />{" "}
              </Link>
            )}
          </Col>
          <Col
            className="d-flex justify-content-center align-items-center"
            md={3}
          >
            <Desc style={{ color: `${nightMode ? "white" : "black"}` }}>
              Email: support@index.gmail.com
            </Desc>
          </Col>
          <Col
            className="d-flex justify-content-center align-items-center"
            md={6}
          >
            <Ul>
              <Link to={"/"}>
                <Li>Home</Li>
              </Link>
              <Link to={"/smartwatch"}>
                <Li>Smartwatch</Li>
              </Link>
              <Link to={"/store"}>
                <Li>Store</Li>
              </Link>
              <Link to={"/store"}>
                <Button>Buy Now</Button>
              </Link>
            </Ul>
          </Col>
        </Row>
      </Container>
    </FooterDiv>
  );
}

export default Footer;
