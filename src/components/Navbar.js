import React, { useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "styled-components";
import logoWhite from "../img/logoWH.png";
import logo from "../img/logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { changeMode } from "../redux/modeSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "react-bootstrap/Badge";
import { persistor } from "../redux/store";
import { logout } from "../redux/userSlice";
import { removeProduct } from "../redux/cartSlice";

const ModeNightIconEdited = styled(ModeNightIcon)`
  color: ${({ theme }) => theme.text};
  font-size: 35px !important;
  margin-left: 30px;
  cursor: pointer;
  transition: 0.2s all ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.hover};
  }
`;

const LightModeIconEdited = styled(LightModeIcon)`
  color: ${({ theme }) => theme.text};
  font-size: 35px !important;
  margin-left: 30px;
  cursor: pointer;
  transition: 0.2s all ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.hover};
  }
`;

const Nav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 45px 100px;
`;

const LogoutBtn = styled.button`
  padding: 10px 17px;
  background-color: red;
  color: #fff;
`;
const ColFive = styled.div`
  flex: 6;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ColTwo = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ColSix = styled.div`
  flex: 6;
  display: flex;

  align-items: center;
`;

const Img = styled.img`
  width: 200px;
`;

export const Ul = styled.ul`
  display: flex;
  list-style: none;
  justify-content: center;
  align-items: center;
`;
export const Li = styled.li`
  text-decoration: none;
  padding: 15px;
  transition: all 0.2s ease-in-out;
  color: ${({ theme }) => theme.text};
  &:hover {
    background-color: #f3999982;
    border-radius: 2px;
  }
`;

export const Button = styled.button`
  background-color: #f29494;
  padding: 10px 15px;
  outline: none;
  border: none;
  color: #fff;
  cursor: pointer;
  margin: 0 10px;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.hover};
    color: ${({ theme }) => !theme.text};
  }
`;

const ButtonEdited = styled(Button)`
  &:hover {
    color: white;
    background-color: rgba(0, 0, 0, 0.8) !important;
  }
`;
const EditedMenuIcon = styled(MenuIcon)`
  color: ${({ theme }) => theme.text};
  width: 2em !important;
  height: 2em !important;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transition: all 0.2s ease-in-out;
    color: #f2949478;
  }
`;

const Hamburger = styled.div`
  color: ${({ theme }) => theme.text};
  width: 500px;
  background-color: ${({ theme }) => theme.cardBg};
  position: fixed;
  top: 0;
  height: 100vh;
  z-index: 999;
  transition: all 0.5s ease-in-out;
`;

const HamburgerWrapper = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  list-style: none;
  font-size: 30px;
  height: 100%;
`;

const ImgHolder = styled.div`
  padding: 30px;
  justify-cotnent: flex-end;
  height: 100%;
  display: flex;
  align-items: flex-end;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 99;
`;

const CartWrapper = styled.div`
  position: absolute;
  top: 100px;
  padding: 30px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  right: 100px;
  z-index: 99;
  -webkit-box-shadow: 0px 0px 149px -25px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 149px -25px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 149px -25px rgba(0, 0, 0, 0.75);
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  border: 1px solid black;
  border-radius: 5px;
  width: 600px;
`;

const UserHolder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  border: 1px solid black;
  border-radius: 5px;
`;

const H3 = styled.h3`
  font-size: 24px;
  color: black;
  margin: 0;
  margin-right: 15px;
`;

const P = styled.p`
  font-size: 22px;
  color: black;
  margin: 0;
`;

const SPAN = styled.span`
  fontsize: 22px;
  margin: 0;
  color: red;
  margin-right: 15px;
`;

const IMG = styled.img`
  width: 100px;
  margin-right: 15px;
  padding: 10px;
`;
function Navbar() {
  const [hamOpen, setHamOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setHamOpen(false);
  }, [pathname]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const nightMode = useSelector((state) => state.mode.night);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { products, quantity, total } = useSelector((state) => state.cart);

  function logOut() {
    persistor.purge();
    dispatch(logout());
  }
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);
  function handleClickOutside(e) {
    if (!refOne.current.contains(e.target)) {
      setIsCartOpen(false);
    }
  }
  const refOne = useRef(false);
  function removeProducts(e) {
    let index = e.target.getAttribute("value");
    let productId = products[index].id;
    let price = products[index].price;

    dispatch(removeProduct({ productId, price }));
  }
  return (
    <>
      <Overlay
        onClick={() => setHamOpen(!hamOpen)}
        style={!hamOpen ? { width: "0" } : { width: "100%" }}
      >
        <Hamburger style={!hamOpen ? { left: "-500px" } : { left: "0" }}>
          <HamburgerWrapper>
            <CloseIcon
              style={{
                color: `${nightMode ? "white" : "black"}`,
                fontSize: "40px",
                alignSelf: "flex-end",
                cursor: "pointer",
                marginBottom: "30px",
              }}
              onClick={() => setHamOpen(!hamOpen)}
            ></CloseIcon>
            <NavLink to={"/"}>
              <Li>Home</Li>
            </NavLink>
            <NavLink to={"/smartwatch"}>
              <Li>Smartwatch</Li>
            </NavLink>
            <NavLink to={"/store"}>
              <Li>Store</Li>
            </NavLink>
            <ImgHolder>
              {" "}
              {nightMode ? (
                <Link to={"/"}>
                  <Img src={logoWhite} alt="logo" />{" "}
                </Link>
              ) : (
                <Link to={"/"}>
                  <Img src={logo} alt="logo" />{" "}
                </Link>
              )}
            </ImgHolder>
          </HamburgerWrapper>
        </Hamburger>
      </Overlay>

      <Nav>
        <ColSix>
          <EditedMenuIcon onClick={() => setHamOpen(!hamOpen)} />
          {nightMode ? (
            <LightModeIconEdited onClick={() => dispatch(changeMode())} />
          ) : (
            <ModeNightIconEdited onClick={() => dispatch(changeMode())} />
          )}

          {currentUser && (
            <Link to={"/profile"}>
              <UserHolder style={{ marginLeft: "20px", cursor: "pointer" }}>
                <IMG
                  style={{ width: "50px", borderRadius: "30px" }}
                  src={
                    !currentUser.img.includes("https:")
                      ? "/avatar.png"
                      : currentUser.img
                  }
                ></IMG>
                <H3>{currentUser.username}</H3>
              </UserHolder>
            </Link>
          )}
          <Button>
            <a
              target="_blank"
              href="https://watch-shop-benyx-admin.netlify.app/"
            >
              ADMIN LOGIN
            </a>
          </Button>
          <Button onClick={logOut}>Log Out</Button>
        </ColSix>

        <ColTwo>
          {" "}
          {nightMode ? (
            <Link to={"/"}>
              <Img src={logoWhite} alt="logo" />{" "}
            </Link>
          ) : (
            <Link to={"/"}>
              <Img src={logo} alt="logo" />{" "}
            </Link>
          )}
        </ColTwo>

        <ColFive>
          <Ul>
            <NavLink to={"/"}>
              <Li>Home</Li>
            </NavLink>
            <NavLink to={"/smartwatch"}>
              <Li>Smartwatch</Li>
            </NavLink>
            <NavLink to={"/store"}>
              <Li>Store</Li>
            </NavLink>
            <Link to={"/checkout"}>
              <Button>Buy Now</Button>
            </Link>
          </Ul>
          {isCartOpen ? (
            <>
              {" "}
              <AddShoppingCartIcon
                onClick={() => setIsCartOpen(false)}
                style={{
                  color: `${nightMode ? "white" : "black"}`,
                  fontSize: "30px",
                  cursor: "pointer",
                }}
              >
                {" "}
              </AddShoppingCartIcon>
              <Badge pill bg="danger">
                {" "}
                {quantity}{" "}
              </Badge>
            </>
          ) : (
            <>
              <ShoppingCartIcon
                onClick={() => setIsCartOpen(true)}
                style={{
                  color: `${nightMode ? "white" : "black"}`,
                  fontSize: "30px",
                  cursor: "pointer",
                  transition: "0.2s all",
                }}
              >
                {" "}
              </ShoppingCartIcon>
              <Badge pill bg="danger">
                {" "}
                {quantity}{" "}
              </Badge>
            </>
          )}

          {isCartOpen && (
            <CartWrapper ref={refOne}>
              {products.length !== 0 ? (
                <>
                  <P>Total Products in cart: {quantity}</P>
                  <P>
                    Total Price: <SPAN>{total}.00$</SPAN>
                  </P>
                  {products.map((product, i) => {
                    return (
                      <CartItem>
                        <IMG src={product.img}></IMG>
                        <H3>{product.title}</H3>
                        <P>
                          Price: <SPAN>{product.price}.00$</SPAN>
                        </P>
                        <Button value={i} onClick={(e) => removeProducts(e)}>
                          Remove Product
                        </Button>
                      </CartItem>
                    );
                  })}

                  <Link to={"/checkout"}>
                    <ButtonEdited>Check Out</ButtonEdited>
                  </Link>
                </>
              ) : (
                <H3>Your Cart is Empty</H3>
              )}
            </CartWrapper>
          )}
        </ColFive>
      </Nav>
    </>
  );
}

export default Navbar;
