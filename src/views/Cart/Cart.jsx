import React, { useState } from "react";
import { Button, Grid, IconButton } from "@mui/material";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";
import { useSelector } from "react-redux";
import emptyCart from "../../assets/images/empty-cart.png";
import { clearOrder } from "../../redux/reducers/cartSlice";
import { useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { v4 } from "uuid";
import { db } from "../../services/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { recordTableNumber } from "../../redux/reducers/cartSlice";
import * as moment from "moment";
import { DateTime } from "luxon";

//components
import CartItem from "./components/CartItem";
import CustomDialog from "../../common/components/CustomDialog";
import CartCustomDialog from "./components/CartCustomDialog";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart);
  const tableNumber = useSelector((state) => state.cart.tableNumber);
  const orderId = v4().slice(0, 5);
  const [currentDate, setCurrentDate] = useState(new Date());
  const formattedDate = DateTime.fromJSDate(currentDate).toFormat("dd-MM-yyyy");
  const today = DateTime.fromJSDate(currentDate).toLocaleString({
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const [email, setEmail] = useState("");

  //confirmation dialog states
  const [open, setOpen] = useState(false);

  // const [currentTime, setCurrentTime] = useState(
  //   new Date().toLocaleTimeString()
  // );
  // setInterval(() => {
  //   setCurrentTime(new Date().toLocaleTimeString(TIME_SIMPLE));
  // }, 1000);

  const TIME_SIMPLE = "hh:mm a";

  const [currentTime, setCurrentTime] = useState(
    DateTime.local().toFormat(TIME_SIMPLE)
  );

  const interval = setInterval(() => {
    setCurrentTime(DateTime.local().toFormat(TIME_SIMPLE));
  }, 1000);

  //set data array to string for order details
  // const details = cartData
  //   .map((order) => `${order.ItemName} x ${order.itemQuantity}`)
  //   .join(", ");

  //navigate to home
  const handleClickArrow = () => {
    navigate(`/${tableNumber}`);
  };

  const dbRef = collection(db, "order");
  const dbRefBill = collection(db, "bill");

  const data = {
    Table: tableNumber,
    OrderId: orderId,
    State: "New",
    Time: currentTime,
    // Details: details,
    Details: cartData,
    Price: cartTotal.cartTotal,
    Date: formattedDate,
    _uid: "DinningUser",
    Email: email,
  };

  const billData = {
    Table: tableNumber,
    OrderId: orderId,
    State: "UnPaid",
    Time: currentTime,
    // Details: details,
    Details: cartData,
    Price: cartTotal.cartTotal,
    Date: today,
    _uid: "DinningUser",
    Email: email,
  };

  //SEND ORDER
  const handleSendOrder = async () => {
    //send order function
    try {
      await addDoc(dbRef, data);
      await addDoc(dbRefBill, billData);
      toast.success(
        "Your order received, Give us few minutes to get it back to you!",
        {
          position: "bottom-right",
        }
      );
      dispatch(clearOrder());
      dispatch(recordTableNumber(tableNumber));
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      console.log("could not updated" + err);
      toast.error(
        "Something went wrong! Customer service agent will help you.",
        {
          position: "bottom-right",
        }
      );
    }
  };

  const theme = createTheme({
    palette: {
      secondary: {
        main: "#0E9E52",
      },
    },
  });

  //open confirmation dialog
  const handleOpenDialog = () => setOpen(true);

  //close confirmation dialog
  const handleCloseDialog = () => setOpen(false);

  return (
    <>
      <Grid container className="cart-area" mt={1} mb={12}>
        <Grid
          item
          xs={1}
          sm={1}
          md={1}
          sx={{
            paddingLeft: "1em",
            paddingTop: "1em",
          }}
        >
          <IconButton
            sx={{
              color: "#272D2F",
            }}
            onClick={handleClickArrow}
            className="arrow-back"
          >
            <MdArrowBackIos />
          </IconButton>
        </Grid>
        <Grid
          item
          xs={11}
          sm={11}
          md={11}
          sx={{
            textAlign: "center",
            marginLeft: "-4%",
            marginBottom: "2.5em",
          }}
        >
          <h3>Your Order</h3>
          <span>enjoy fast service</span>
        </Grid>

        {/* cart content */}
        {cartData.length === 0 ? (
          <Grid item xs={12} sm={12} md={12} className="empty-cart">
            <img src={emptyCart} alt="empty-cart" />
            <h2>Empty Bucket !</h2>
            <span>Hurry up continue to collect your meal</span>
            <ThemeProvider theme={theme}>
              <Button color="secondary" onClick={handleClickArrow}>
                Continue
              </Button>
            </ThemeProvider>
          </Grid>
        ) : (
          cartData.map((item) => (
            <CartItem
              key={item.id}
              ItemImage={item.ItemImage}
              ItemName={item.ItemName}
              ItemPrice={item.Price}
              ItemQuantity={item.itemQuantity}
              CartItem={item}
            />
          ))
        )}

        {/* </Grid> */}
        {cartData.length === 0 ? (
          <Grid></Grid>
        ) : (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            mt={3}
            sx={{
              width: "100%",
              height: "80px",
              backgroundColor: "#0E9E52",
              zIndex: "9",
              position: "fixed",
              bottom: 0,
              // borderRadius: "100px 0 0 0",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              color: "#fff",
              paddingLeft: "1.5em",
            }}
          >
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              className="cart-tot"
              sx={{
                paddingLeft: "2em",
              }}
            >
              <h1>Rs. {cartTotal.cartTotal}</h1>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              className="cart-send"
              sx={{
                paddingLeft: "1em",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <h2>Proceed</h2>
              <IconButton
                sx={{ color: "#fff" }}
                onClick={() => handleOpenDialog()}
                // onClick={() => {
                //   console.log("*********order data*******");
                //   console.log(data);
                //   console.log("****************");
                // }}
              >
                <AiOutlineSend style={{ width: "50px", height: "25px" }} />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Grid>
      <CartCustomDialog
        open={open}
        onClose={handleCloseDialog}
        handleFunc={handleSendOrder}
        title="Order Confirmation!"
        desc="Are you sure to send this order?"
        email={email}
        setEmail={setEmail}
      />
    </>
  );
};

export default Cart;
