import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import "./App.css";
import "animate.css";
import axios from "axios";
import { darkTheme, lightTheme } from "./utils/Theme";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Smartwatch from "./pages/Smartwatch";
import Store from "./pages/Store";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Cookie from "./components/Cookie";

const Main = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 100%;
`;

function App() {
  const nightMode = useSelector((state) => state.mode.night);
  axios.defaults.baseURL =
    "https://6374c8ab48dfab73a4e8be95.mockapi.io/onlineshop/";

  const { currentUser } = useSelector((state) => state.user);

  const Layout = () => {
    return (
      <ThemeProvider theme={nightMode ? darkTheme : lightTheme}>
        <Main>
          <Navbar />

          <Outlet />
        </Main>
      </ThemeProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const ProtectedRoute2 = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/" />;
    }

    return children;
  };
  const [showCookie, setShowCookie] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("cookie")) {
        return;
      }
      setShowCookie(true);
    }, 5000);
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          {showCookie ? <Cookie setShowCookie={setShowCookie} /> : ""}
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/smartwatch",
          element: <Smartwatch />,
        },
        {
          path: "/store",
          element: <Store />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/product/:id",
          element: <Product />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/success",
          element: <Success />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <ProtectedRoute2>
          <Login />
        </ProtectedRoute2>
      ),
    },
    {
      path: "/register",
      element: (
        <ProtectedRoute2>
          <Register />
        </ProtectedRoute2>
      ),
    },

    {
      path: "*",
      element: <h1>err</h1>,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
