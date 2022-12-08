import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
function Success() {
  const { state } = useLocation();
  const SuccWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 100px;
    flex-direction: column;
    text-align: center;
    color: black;
  `;
  const P = styled.p`
    font-size: 20px;
    font-weight: bold;
  `;
  const Success = styled.div`
    background-color: #f2949433;
    border-radius: 15px;
    padding: 100px;
    border: 2px solid green;
  `;
  return (
    <>
      {state ? (
        <SuccWrapper>
          <Success>
            <P>
              You succesfully added your products on PENDING. Wait for the admin
              to the approve requests.
            </P>
            <P>
              Products ID:{" "}
              {state.map((id) => {
                return `${id}; `;
              })}
            </P>
          </Success>
        </SuccWrapper>
      ) : (
        <P style={{ textAlign: "center" }}>You didnt add any product yet!</P>
      )}
    </>
  );
}

export default Success;
