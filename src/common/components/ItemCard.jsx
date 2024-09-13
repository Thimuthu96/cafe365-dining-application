import React from "react";
import { Typography, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/reducers/cartSlice";
import { FaShoppingCart } from "react-icons/fa";

const ItemCard = (props) => {
  const { foodImage, price, name, item } = props;
  const dispatch = useDispatch();

  //add to cart
  const handleAdd = (foodItem) => {
    dispatch(addToCart(foodItem));
  };

  const theme = createTheme({
    palette: {
      secondary: {
        main: "#0E9E52",
      },
    },
  });
  return (
    <div className="item-card">
      <div className="item-card-top">
        <img
          src={foodImage}
          alt="food img"
          style={{
            height: "80%",
            borderRadius: "10%",
          }}
        />
      </div>
      <div className="item-card-bottom">
        <h2>Rs. {price}</h2>
      </div>
      <div className="item-card-name">
        <Typography className="item-name">{name}</Typography>
      </div>
      <div className="add-to-cart">
        <ThemeProvider theme={theme}>
          <Button
            color="secondary"
            onClick={() => handleAdd(item)}
            endIcon={<FaShoppingCart />}
          >
            Add to cart
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default ItemCard;
