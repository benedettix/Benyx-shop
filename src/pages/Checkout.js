import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { removeAllProducts, removeProduct } from "../redux/cartSlice";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router";
import CheckoutForm from "../components/CheckoutForm";
import axios from "axios";

function Checkout() {
  const dispatch = useDispatch();
  const { products, total } = useSelector((state) => state.cart);
  function removeProducts(e) {
    let index = e.target.getAttribute("value");
    let productId = products[index].id;
    let price = products[index].price;

    dispatch(removeProduct({ productId, price }));
  }

  const CartHolder = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const CartItem = styled.div`
    display: flex;
    padding: 15px;
    border: 2px solid #e5e5e5;
    border-radius: 15px;
    margin: 15px 0;
    flex-direction: column;
  `;

  const CartItemHolder = styled.div`
    display: flex;
  `;

  const ProductHolder = styled.div`
    display: flex;
    flex-direction: column;
  `;
  const IMG = styled.img`
    width: 150px;
    object-fit: cover;
  `;

  const H3 = styled.h3`
    font-size: 30px;
  `;
  const P = styled.p`
    font-size: 18px;
  `;
  const PBold = styled.p`
    font-size: 18px;
    font-weight: bold;
  `;
  const BuyHolder = styled.div`
    display: flex;
    flex-direction: column;
    margin: 25px;
  `;
  const Cost = styled.div`
    display: flex;
    justify-content: space-between;
  `;

  const Total = styled.div`
    display: flex;
    justify-content: space-between;
  `;

  const SPAN = styled.span`
    font-size: 20px;
    font-weight: bold;
  `;

  const Button = styled.button`
    font-size: 20px;
    font-weight: bold;
    color: black;
    background-color: #ebd7d8;
    padding: 15px 27px;
    width: 100%;
    border: none;
    outline: none;

    &:disabled {
      cursor: not-allowed;
    }
  `;
  const [stock, setStock] = useState(true);
  useEffect(() => {
    products.forEach((product) => {
      if (!product.inStock) setStock(false);
    });
  }, []);
  const { currentUser } = useSelector((state) => state.user);
  const [clientSecret, setClientSecret] = useState("");
  const stripePromise = loadStripe(
    "pk_test_51MAFFNCOS8EmKqSJH1N0uJoBkaQtUjIHOdFeXo5IBenfTHA8bRnlR6gRs3H65uCr2Z4eRiZ31xc3YClVNuEBe9yb00axOIFavW"
  );
  console.log(currentUser);
  const navigate = useNavigate();
  let productIds = products.map((product) => product.id);

  const buy = function () {
    fetch("https://6374c8ab48dfab73a4e8be95.mockapi.io/onlineshop/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: currentUser.id,
        amount: 1,
        products: productIds,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    navigate("/success", { state: productIds });
    dispatch(removeAllProducts());
  };

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Container>
      {products.length > 0 ? (
        <Row>
          <Col md={8}>
            <CartHolder>
              {products.map((product, i) => {
                return (
                  <CartItem>
                    <H3>{product.title}</H3>
                    <CartItemHolder>
                      <Link to={`/product/${product.id}`}>
                        <IMG src={product.img}></IMG>
                      </Link>
                      <ProductHolder>
                        {product.inStock ? (
                          <P>In stock</P>
                        ) : (
                          <P style={{ color: "red", fontWeight: "bold" }}>
                            Not in stock
                          </P>
                        )}
                        <P>
                          Price: <SPAN>{product.price}.00$</SPAN>
                        </P>
                      </ProductHolder>
                    </CartItemHolder>

                    <CloseIcon
                      style={{ cursor: "pointer", alignSelf: "end" }}
                      value={i}
                      onClick={(e) => removeProducts(e)}
                    ></CloseIcon>
                  </CartItem>
                );
              })}
            </CartHolder>
          </Col>
          <Col md={4}>
            <BuyHolder>
              <Cost>
                <P>Shipping cost:</P>
                <P>$0.00</P>
              </Cost>
              <Total>
                <PBold>Total:</PBold>
                <PBold>${total}.00</PBold>
              </Total>
              {!stock && <PBold style={{ color: "red" }}>Not in stock</PBold>}

              <Button onClick={buy} disabled={!stock}>
                CHECKOUT
              </Button>
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              )}
            </BuyHolder>
          </Col>
        </Row>
      ) : (
        <H3 style={{ textAlign: "center" }}>
          Your cart is empty. Add first something to cart !
        </H3>
      )}
    </Container>
  );
}

export default Checkout;
