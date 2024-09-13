import React, { useState } from "react";
import { Grid, IconButton, Tooltip, Typography, Button } from "@mui/material";
import { AiTwotoneDelete } from "react-icons/ai";
import {
  removeItemFromCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} from "../../../redux/reducers/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const [qnt, setQnt] = useState(props.ItemQuantity);

  //ITEM REMOVE HANDLER
  const handleRemoveItem = (item) => {
    dispatch(removeItemFromCart(item));
  };

  //ITEM COUNT INCREASE
  const handleIncreaseItemQnt = (item) => {
    dispatch(increaseCartItemQuantity(item));
  };

  //ITEM COUNT DECREASE
  const handleDecreaseItemQnt = (item) => {
    dispatch(decreaseCartItemQuantity(item));
  };

  return (
    <Grid
      container
      item
      xs={12}
      sm={12}
      md={12}
      mb={2}
      padding={0.5}
      ml={2}
      mr={2}
      marginBottom={2}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F2F2F2",
        borderRadius: "15px",
      }}
    >
      <Grid item xs={4} sm={4} md={4} className="cart-item-image">
        <img src={props.ItemImage} alt="cart  item image" />
      </Grid>
      <Grid
        item
        xs={5}
        sm={5}
        md={5}
        className="cart-item-idesc"
        sx={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontStyle: "normal",
            fontSize: "14px",
            lineHeight: "20px",
          }}
        >
          {props.ItemName}
        </Typography>
        <span>Rs. {props.ItemPrice}</span>
      </Grid>
      <Grid
        item
        xs={3}
        sm={3}
        md={3}
        className="cart-item-ictions"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={5}
          sm={5}
          md={5}
          className="cart-item-incdecr"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button onClick={() => handleIncreaseItemQnt(props.CartItem)}>
            +
          </button>
          <span>{props.ItemQuantity}</span>
          {props.ItemQuantity === 1 ? (
            <button
              style={{
                background: "lightgrey",
              }}
              // onClick={() => handleDecreaseItemQnt(props.CartItem)}
            >
              -
            </button>
          ) : (
            <button onClick={() => handleDecreaseItemQnt(props.CartItem)}>
              -
            </button>
          )}
        </Grid>
        <Grid item xs={5} sm={5} md={5} className="cart-item-del">
          <IconButton onClick={() => handleRemoveItem(props.CartItem)}>
            <AiTwotoneDelete
              style={{
                width: "50px",
                height: "25px",
                color: "#FF455A",
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CartItem;
