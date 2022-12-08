import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRef } from "react";

const ChevronRightIconEdit = styled(ChevronRightIcon)`
  color: ${({ theme }) => theme.text};
  font-weight: 1000;
  font-size: 6.5rem !important;
  cursor: pointer;

  &:hover {
    transition: 0.5s all;
    color: #f2949478;
  }
`;

const ContainerEdit = styled(Container)`
  height: 85vh;
`;

const Header = styled.h3`
  color: ${({ theme }) => theme.text};
  font-weight: 1000;
  font-size: 85px;
  font-family: "Mark Pro", "sans-serif";
  padding-top: 35px;
`;

const AfterHeader = styled.h6`
  color: #ef9c9c;
  font-weight: normal;
  font-size: 29px;
  font-family: "Mark Pro", "sans-serif";
  padding-bottom: 50px;
  letter-spacing: 10px;
`;
const Desc = styled.p`
  color: ${({ theme }) => theme.text};
  font-weight: normal;
  font-size: 20px;
  font-family: "Mark Pro", "sans-serif";
  padding-bottom: 10px;
`;

const ImgBig = styled.img`
  width: 100%;
  object-fit: cover;
  padding: 0 0 100px 100px;
`;

const CardHolder = styled.div`
  display: flex;
  margin-top: 70px;
  margin-bottom: 70px;
  position: absolute;
  left: 120px;
  top: 460px;
`;

const Card = styled.div`
  padding: 10px;
  flex-direction: column;
  text-align: center;
  width: 236px;
  margin: 15px;
  background-color: ${({ theme }) => theme.cardBg2};
  border-radius: 30px;
  -webkit-box-shadow: 0px 2px 300px -74px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 300px -74px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 300px -74px rgba(0, 0, 0, 0.75);

  cursor: pointer;
  transition: 0.2s all ease-in-out;

  &:hover {
    background-color: #f2949478;
  }
`;

const CardH3 = styled.div`
  font-size: 40px;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
`;

const CardDesc = styled.div`
  letter-spacing: 2px;
  font-size: 20px;
  color: ${({ theme }) => theme.text};
  font-family: "FFX Thin";
`;

const Img = styled.img`
  padding: 18px;
  width: 100%;
  margin: 0 auto;
`;

function Home() {
  // let [currentUrl, setCurrentUrl] = useState("");
  let [list, setList] = useState([
    {
      url: "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/485ea9aa-b170-4efc-ac40-ab8b0854083c_600x.png?v=1625044988",
    },
    {
      url: "https://www.pngmart.com/files/13/Smartwatch-PNG-Free-Download.png",
    },
    {
      url: "https://www.90mobiles.com/dataup/2022/07/httpswwwboat-lifestylecomproductswave-select-smartwatch.png",
    },
  ]);
  let [counter, setCounter] = useState(0);
  function clickHandle() {
    counter++;
    if (counter >= list.length) {
      setCounter(0);
      return;
    }
    setCounter(counter);
  }
  function cardHandle(e) {
    let id = e.currentTarget.getAttribute("id");
    id = Number(id);
    setCounter(id);
  }
  let img = useRef();
  useEffect(() => {
    if (
      img.current.classList.contains("animate__animated", "animate__fadeIn")
    ) {
      img.current.classList.remove("animate__animated", "animate__fadeIn");
    }

    setTimeout(() => {
      img.current.classList.add("animate__animated", "animate__fadeIn");
    }, 0.2);
  }, [counter]);
  useEffect(() => {
    setInterval(() => {
      if (counter < 3) {
        setCounter(counter);

        counter++;
      } else {
        setCounter(0);
        counter = 0;
      }
    }, 3200);
  }, []);
  return (
    <ContainerEdit>
      <Row>
        <Col md={5}>
          <Header>Smartwatch</Header>
          <AfterHeader>ELEMENT SERIE</AfterHeader>
          <Desc>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            congue sed et leo, dignissim odio justo.
          </Desc>
          <CardHolder>
            {list.map((list, i) => {
              return (
                <>
                  <Card
                    onClick={(e) => cardHandle(e)}
                    className={counter === i ? "active-watch" : ""}
                    id={i}
                    style={{
                      transform: "translate(" + list.position + "px,0)",
                    }}
                  >
                    <CardH3>Dark</CardH3>
                    <CardDesc>Element</CardDesc>
                    <Img src={list.url} alt="" />
                  </Card>
                </>
              );
            })}
          </CardHolder>
        </Col>
        <Col
          md={7}
          className="d-flex justify-content-center align-items-center"
        >
          <ImgBig
            ref={img}
            className="animate__animated animate__fadeIn"
            src={list[counter].url}
          ></ImgBig>
          <ChevronRightIconEdit
            onClick={() => clickHandle()}
          ></ChevronRightIconEdit>
        </Col>
      </Row>
    </ContainerEdit>
  );
}

export default Home;
