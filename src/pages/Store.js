import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "../components/Navbar";
const Header = styled.h3`
  color: ${({ theme }) => theme.text};
  font-weight: 1000;
  font-size: 55px;
  font-family: "Mark Pro", "sans-serif";
  padding-top: 35px;
  text-align: center;
`;
const P = styled.p`
  color: ${({ theme }) => theme.text};
  margin: 0;
  text-align: center;

  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg fill='${({ theme }) =>
    theme.text}' height='34' viewBox='0 0 24 24' width='34' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 50%;

  padding: 1rem;
  padding-right: 2rem;
  border: 1px solid black;
  border-color: ${({ theme }) => theme.soft};
  transition: 0.2s all ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.softHover};
  }
`;

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
`;

const SelectBoxes = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg fill='${({ theme }) =>
    theme.text}' height='34' viewBox='0 0 24 24' width='34' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 50%;

  border-radius: 2px;
  margin-right: 2rem;
  padding: 1rem;
  padding-right: 2rem;
  border: 1px solid gray;
  cursor: pointer;
  outline: none;
  transition: 0.2s all ease-in-out;
  color: ${({ theme }) => theme.text};
  border-color: ${({ theme }) => theme.soft};
  &:hover {
    background-color: ${({ theme }) => theme.softHover};
  }
`;

const SelectBoxesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const PriceBox = styled.div`
  position: relative;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 3px;
  margin: 5px 0;
  outline: none;
  background-color: #fff;
  border: 1px solid black};
`;

const InputHolder = styled.div`
  padding: 20px;
  position: absolute;
  top: 60px;
  width: 250px;

  background-color: #fff;
  -webkit-box-shadow: 0px 0px 160px -36px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 160px -36px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 160px -36px rgba(0, 0, 0, 0.75);
`;

const Option = styled.option`
  color: black;

  &:disabled {
    background-color: lightgray;
  }
`;
const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 100px 0;
`;

const Item = styled.div`
  width: 300px;
  padding: 30px;
  cursor: pointer;
  transition: 0.2s all ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.softHover};
  }
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;
  padding: 15px;
`;

const ItemDesc = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  padding-bottom: 30px;
`;

const ItemPrice = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 19px;
  font-style: italic;
  font-weight: bold;
`;

const ItemPercentage = styled.p`
  color: red;
  font-size: 19px;
`;

const PriceItemHolder = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Store() {
  const nightMode = useSelector((state) => state.mode.night);
  let [input, setInput] = useState(false);
  function openModal(e) {
    console.log(e.target);
    if (e.target.innerHTML == "Price") {
      setInput(!input);
    }
  }

  const [dataType, setDataType] = useState({
    color: "",
    type: "",
    gender: "",
  });
  let { data, loading, error, reFetch, setData, dataCopy } =
    useFetch(`/products/`);
  let [typeSelectors, setTypeSelectors] = useState(false);

  function dataTypeChange(e) {
    async function call() {
      await reFetch();

      setDataType({
        ...dataType,
        [e.target.name.toLowerCase()]: e.target.value,
      });
    }
    call();
  }

  useEffect(() => {
    const fetchTypes = async () => {
      let types = await dataCopy.map((el) => {
        return `${el.type}`;
      });

      let colors = await dataCopy.map((el) => {
        return `${el.color}`;
      });
      let genders = await dataCopy.map((el) => {
        return `${el.gender}`;
      });
      types = await [...new Set(types)];
      colors = await [...new Set(colors)];
      genders = await [...new Set(genders)];

      let obj = {
        colors: colors,
        types: types,
        genders: genders,
      };
      console.log(obj);
      setTypeSelectors(obj);
    };
    fetchTypes();
  }, [data]);

  useEffect(() => {
    async function call() {
      let newArray = await data.filter(function (el) {
        if (
          dataType.color.toLowerCase() &&
          dataType.gender.toLowerCase() &&
          dataType.type.toLowerCase()
        ) {
          return (
            el.color === dataType.color.toLowerCase() &&
            el.gender === dataType.gender.toLowerCase() &&
            el.type === dataType.type.toLowerCase()
          );
        }
        if (dataType.color.toLowerCase() && dataType.type.toLowerCase()) {
          return (
            el.color === dataType.color.toLowerCase() &&
            el.type === dataType.type.toLowerCase()
          );
        }
        if (dataType.type.toLowerCase() && dataType.gender.toLowerCase()) {
          return (
            el.type === dataType.type.toLowerCase() &&
            el.gender === dataType.gender.toLowerCase()
          );
        }
        if (dataType.color && dataType.gender.toLowerCase()) {
          return (
            el.color === dataType.color.toLowerCase() &&
            el.gender === dataType.gender.toLowerCase()
          );
        }

        return (
          el.color === dataType.color.toLowerCase() ||
          el.type === dataType.type.toLowerCase() ||
          el.gender === dataType.gender.toLowerCase()
        );
      });
      setData(newArray);
    }
    call();

    // console.log(filtered);
  }, [dataType]);
  function resetTypes() {
    reFetch();
    setDataType({
      color: "",
      type: "",
      gender: "",
    });
  }
  const [priceTypes, setPriceType] = useState({
    low: "",
    high: "",
  });
  function dataPriceChange(e, value) {
    if (value === "high") {
      setPriceType({ ...priceTypes, ["high"]: e.target.value });
    }
    if (value === "low") {
      setPriceType({ ...priceTypes, ["low"]: e.target.value });
    }
    if (e.target.value === "") {
      reFetch();
    }
  }

  function sortBy(e) {
    let by = e.target.value.split(" ")[1];
    console.log(by);

    if (by === "up") {
      // await reFetch();
      const realData = [...data];
      realData.sort(function (a, b) {
        return parseFloat(b.price) - parseFloat(a.price);
      });
      console.log(realData);
      console.log(data);
      setData(realData);
    }

    if (by === "down") {
      //  reFetch();
      const realData = [...data];
      realData.sort(function (a, b) {
        return parseFloat(a.price) - parseFloat(b.price);
      });
      setData(realData);

      console.log(realData);
    }
  }

  function priceSort() {
    let call = async function () {
      console.log(priceTypes);
      let priceSort = data.filter((product) => {
        if (
          Number(product.price) < Number(priceTypes.high) &&
          Number(product.price) > Number(priceTypes.low)
        ) {
          return product;
        }
      });
      console.log(priceSort);

      if (priceSort.length > 0) {
        console.log("proslo");
        setData(priceSort);
      }
      console.log(data);
    };
    if (data.length > 0) {
      call();
    }
  }
  return (
    <>
      <Container>
        <Header>All Watches</Header>
        <Button onClick={resetTypes}>Reset</Button>
        <Wrapper>
          <hr
            style={{
              color: `${nightMode ? "white" : "black"}`,
              width: "100%",
            }}
          ></hr>
          <SelectBoxesWrapper>
            <SelectBoxes
              onChange={(e) => dataTypeChange(e)}
              id="type"
              name="type"
            >
              <Option selected disabled value="type">
                Type
              </Option>
              {typeSelectors.types &&
                typeSelectors.types.map((el) => {
                  return <Option value={el}>{el}</Option>;
                })}
            </SelectBoxes>
          </SelectBoxesWrapper>
          <SelectBoxesWrapper>
            <SelectBoxes
              onChange={(e) => dataTypeChange(e)}
              id="color"
              name="Color"
            >
              <Option selected disabled value="color">
                Color
              </Option>
              {typeSelectors.colors &&
                typeSelectors.colors.map((el) => {
                  return <Option value={el}>{el}</Option>;
                })}
            </SelectBoxes>
          </SelectBoxesWrapper>
          <SelectBoxesWrapper>
            <SelectBoxes
              onChange={(e) => dataTypeChange(e)}
              id="gender"
              name="Gender"
            >
              <Option selected disabled value="gender">
                Gender
              </Option>

              {typeSelectors.genders &&
                typeSelectors.genders.map((el) => {
                  return <Option value={el}>{el}</Option>;
                })}
            </SelectBoxes>
          </SelectBoxesWrapper>

          <PriceBox
            onClick={(e) => {
              openModal(e);
            }}
            id="price"
            name="Price"
          >
            <P>Price</P>
            {input && (
              <InputHolder>
                <span>Minimal price in $</span>
                <Input
                  onInput={(e) => dataPriceChange(e, "low")}
                  type="number"
                  placeholder="Minimal price in $"
                />
                <span>Highest price in $</span>
                <Input
                  onInput={(e) => dataPriceChange(e, "high")}
                  type="number"
                  placeholder="Highest price in $"
                />
                <Button onClick={priceSort}>Sort by price</Button>
              </InputHolder>
            )}
          </PriceBox>

          <hr
            style={{
              color: `${nightMode ? "white" : "black"}`,
              width: "100%",
            }}
          ></hr>
        </Wrapper>
        <hr
          style={{
            color: `${nightMode ? "white" : "black"}`,
            width: "100%",
            borderTop: "2px solid",
            opacity: "1",
            marginBottom: "50px",
          }}
        ></hr>

        <SelectBoxes
          style={{
            border: `${nightMode ? "1px solid white" : "1px solid black"}`,
          }}
          id="sort"
          name="sort"
          onChange={(e) => sortBy(e)}
        >
          <Option selected disabled value="sort">
            Sort by
          </Option>
          <Option value="price up">Price up</Option>
          <Option value="price down">Price down</Option>
        </SelectBoxes>
        {error && (
          <h5 style={{ color: "red", textAlign: "center" }}>{error}</h5>
        )}
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress
              style={{ margin: "0 auto", width: "65px", height: "65px" }}
            />
          </div>
        )}
        <ItemWrapper>
          {data?.map((product) => {
            return (
              <Link to={"/product/" + product.id}>
                <Item>
                  <Img src={product.img} />
                  <ItemDesc>{product.title}</ItemDesc>
                  <PriceItemHolder>
                    <ItemPrice>${product.price}.99</ItemPrice>
                    <ItemPercentage>SAVE {product.save}%</ItemPercentage>
                  </PriceItemHolder>
                </Item>
              </Link>
            );
          })}
        </ItemWrapper>
      </Container>
      <Footer></Footer>
    </>
  );
}

export default Store;
