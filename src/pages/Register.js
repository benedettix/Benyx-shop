import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import styled from "styled-components";
import axios from "axios";
import Col from "react-bootstrap/Col";
import CircularProgress from "@mui/material/CircularProgress";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import {
  Button,
  CenterWrap,
  Desc,
  Form,
  Header,
  Input,
  Label,
  Wrapper,
} from "../styles";
import { useDispatch, useSelector } from "react-redux";
const IMG = styled.img`
  width: 100%;
  object-fit: cover;
  padding: 30px;
`;
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.user);
  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const { data } = await axios.post("/users", {
        username: username,
        password: password,
      });
      if (data.length === 0) {
        let obj = {
          err: "Error with a server. Try later.",
        };
        throw obj;
      }
      // let user = data.filter((user) => {
      //   return user.password === password && user.username === username;
      // });

      // if (user.length === 0) {
      //   let obj = {
      //     err: "Username or password are not correct",
      //   };
      //   throw obj;
      // }
      // const user = await axios.get(`users/`, { username, password });
      dispatch(loginSuccess(data[0]));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure(err.err));
      console.log(err);
    }
  };

  return (
    <CenterWrap>
      <Wrapper>
        <Col md={12}>
          <Header>REGISTER</Header>
          <Form onSubmit={(e) => handleRegister(e)}>
            <Label for="username">Username:</Label>
            <Input
              type="text"
              placeholder="Enter your username"
              name="username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <Label for="password">Password:</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button>
              {loading ? (
                <CircularProgress style={{ width: "30px", height: "30px" }} />
              ) : (
                "Register"
              )}{" "}
            </Button>
            {error && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}

            <Desc>
              Want to login?<br></br>Login{" "}
              <Link className="orange" to={"/login"}>
                here.
              </Link>
            </Desc>
          </Form>
        </Col>
        <Col md={12}>
          <IMG src="https://www.tatacard.com/creditcards/resources/img/digi-col-login.png"></IMG>
        </Col>
      </Wrapper>
    </CenterWrap>
  );
}

export default Register;
