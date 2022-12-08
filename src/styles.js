import styled from "styled-components";

export const CenterWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Header = styled.h3`
  color: #fff;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  font-family: "Mark Pro", "sans-serif";
  padding: 15px;
  padding-bottom: 10px;
`;

export const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 15px;
  padding: 25px;
  background-color: #08162a;
  display: flex;
  flex-direction: column;
  width: 450px;
`;
export const Input = styled.input`
  padding: 8px 10px;
  border-radius: 5px;
  border: none;
  outline: none;
`;
export const Label = styled.label`
  margin-top: 20px;
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: 450;
  color: #fff;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;
export const Button = styled.button`
  background-color: #fff;
  padding: 10px 17px;
  transition: 0.3s all ease-in-out;
  cursor: pointer;
  border-radius: 15px;
  font-weight: bold;
  margin: 0 auto;
  margin-top: 30px;
  outline: none;
  border: none;
  width: 150px;
  font-size: 18px;
  margin-bottom: 30px;

  &:hover {
    background-color: #e8f0fe;
    color: black;
  }
`;
export const Desc = styled.p`
  color: #fff;
  font-size: 16px;
  text-align: center;
`;

export const IMG = styled.img`
  width: 75px;
  object-fit: cover;
  border-radius: 50px;
`;

export const ProfileWrapper = styled.div`
  padding: 20px;
  background-color: black;
  border-radius: 5px;
  margin-bottom: 200px;
`;
