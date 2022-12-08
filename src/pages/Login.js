import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Col from "react-bootstrap/Col";
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
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";

const IMG = styled.img`
  width: 100%;
  object-fit: cover;
  padding: 30px;
`;
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.user);
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const { data } = await axios.get("/users");
      if (data.length === 0) {
        let obj = {
          err: "Error with a server. Try later.",
        };
        throw obj;
      }
      let user = data.filter((user) => {
        return user.password === password && user.username === username;
      });
      console.log(user === false);
      if (user.length === 0) {
        let obj = {
          err: "Username or password are not correct",
        };
        throw obj;
      }
      // const user = await axios.get(`users/`, { username, password });
      dispatch(loginSuccess(user[0]));
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
          <Header>LOGIN</Header>
          <Form onSubmit={(e) => handleLogin(e)}>
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
                "Log In"
              )}{" "}
            </Button>
            {error && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}
            <Desc>
              Not a member yet? <br></br>Register{" "}
              <Link className="orange" to={"/register"}>
                here.
              </Link>
            </Desc>
            <GoogleLogin
              onSuccess={(res) => {
                var decoded = jwt_decode(res.credential);

                console.log(decoded);

                const Login = async () => {
                  dispatch(loginStart());
                  try {
                    const { data } = await axios.get("/users");
                    if (data.length === 0) {
                      let obj = {
                        err: "Error with a server. Try later.",
                      };
                      throw obj;
                    }
                    let user = data.filter((user) => {
                      return (
                        user.password === decoded.aud &&
                        user.username === decoded.given_name
                      );
                    });
                    console.log(user === false);
                    if (user.length === 0) {
                      const { data } = await axios.post("/users", {
                        username: decoded.given_name,
                        password: decoded.aud,
                        email: decoded.email,
                        fromGoogle: true,
                        img: decoded.picture,
                      });
                      console.log(data);
                      Login();
                      return;
                    }
                    // const user = await axios.get(`users/`, { username, password });
                    dispatch(loginSuccess(user[0]));
                    navigate("/");
                  } catch (err) {
                    dispatch(loginFailure(err.err));
                    console.log(err);
                  }
                };
                Login();
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              useOneTap
            />
            ;
          </Form>
        </Col>
        <Col md={12}>
          <IMG src="https://www.tatacard.com/creditcards/resources/img/digi-col-login.png"></IMG>
        </Col>
      </Wrapper>
    </CenterWrap>
  );
}

export default Login;
