import { Container } from "@mui/system";
import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import styled from "styled-components";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../redux/cartSlice";
function Product() {
  const { id } = useParams();
  const { data, loading, error, reFetch } = useFetch(`/products/${id}`);
  console.log(data);

  const IMG = styled.img`
    width: 100%;
    object-fit: cover;
    padding-bottom: 20px;
  `;

  const Button = styled.button`
    background-color: #f29493;
    padding: 10px 15px;
    outline: none;
    border: none;
    color: #fff;
    width: 100%;
    font-size: 22px;
    transition: 0.2s all ease-in-out;
    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
    &:disabled {
      cursor: not-allowed;
    }
  `;
  const ProductWrapper = styled.div`
    padding: 20px;
  `;
  const H3 = styled.h3`
    font-size: 34px;
    font-weight: bold;
  `;
  const P = styled.p`
    color: black;
    font-size: 28px;
  `;

  const IconWrapper = styled.div`
    display: flex;
    cursor: pointer;
    align-items: center;
  `;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const [msg, setMsg] = useState("");
  const [quantity, setQuantity] = useState(1);
  const handleClick = () => {
    dispatch(addProduct({ ...data, quantity }));
    setDisabled(true);
    setMsg("Succesfully Added Your Product to the Chart");
  };

  return (
    <Container fluid style={{ paddingBottom: "200px" }}>
      <IconWrapper onClick={() => navigate("/store")}>
        <KeyboardArrowLeftIcon style={{ fontSize: "60px", color: "black" }} />
        <span>Back to the Store</span>
      </IconWrapper>
      <Row>
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          md={6}
        >
          <Col md={3}>
            {data?.imgs?.map((img) => {
              return (
                <Zoom>
                  <IMG src={img}></IMG>
                </Zoom>
              );
            })}
          </Col>

          <IMG src={data.img}></IMG>
        </Col>
        <Col md={6}>
          <ProductWrapper>
            <H3>{data.title}</H3>
            <P>${data.price}.90</P>
            <p>
              Tags: {data.color}, {data.type}, {data.gender}.
            </p>
            <p>
              {data.inStock ? (
                <p>In stock</p>
              ) : (
                <p style={{ color: "red", fontWeight: "bold" }}>Not in stock</p>
              )}
            </p>
            <Button disabled={disabled || !data.inStock} onClick={handleClick}>
              Add to Cart
            </Button>
            {msg && <p style={{ color: "green", fontSize: "24px" }}>{msg}</p>}
          </ProductWrapper>
        </Col>
      </Row>
    </Container>
  );
}

export default Product;
