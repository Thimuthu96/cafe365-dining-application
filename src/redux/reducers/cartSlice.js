import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartQuantity: localStorage.getItem("cartQuantity")
    ? JSON.parse(localStorage.getItem("cartQuantity"))
    : 0,
  cartTotal: localStorage.getItem("cartTotal")
    ? JSON.parse(localStorage.getItem("cartTotal"))
    : 0,
  tableNumber: localStorage.getItem("tableNumber")
    ? JSON.parse(localStorage.getItem("tableNumber"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart(state, action) {
      //CHECK ITEM ALREADY IN THE CART
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        //INCREMENT ONLY ITEM QUANTITY
        state.cartItems[itemIndex].itemQuantity += 1;
        state.cartQuantity += 1;
        toast.info(`Increased ${action.payload.ItemName} quantity!`, {
          position: "top-center",
        });
      } else {
        //ADD ITEM TO CART AND INCREMENT ITEM QUANTITY
        const newProduct = { ...action.payload, itemQuantity: 1 };
        state.cartItems.push(newProduct);
        state.cartQuantity += 1;
        toast.success(`${action.payload.ItemName} added to your bucket!`, {
          position: "top-center",
        });
      }

      state.cartTotal =
        parseInt(state.cartTotal) + parseInt(action.payload.Price);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("cartQuantity", JSON.stringify(state.cartQuantity));
      localStorage.setItem("cartTotal", JSON.stringify(state.cartTotal));
    },

    removeItemFromCart(state, action) {
      const availableCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = availableCartItems;
      toast.error(`Removed ${action.payload.ItemName} from bucket!`, {
        position: "top-center",
      });

      state.cartQuantity -= 1 * action.payload.itemQuantity;
      state.cartTotal =
        parseInt(state.cartTotal) -
        parseInt(action.payload.Price) * parseInt(action.payload.itemQuantity);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("cartQuantity", JSON.stringify(state.cartQuantity));
      localStorage.setItem("cartTotal", JSON.stringify(state.cartTotal));
    },

    recordTableNumber(state, action) {
      state.tableNumber = action.payload;
      localStorage.setItem("tableNumber", JSON.stringify(state.tableNumber));
    },

    // recordTableNumber(state, action) {
    //   const { tableNumber, uuid } = action.payload;
    //   state.tableNumber = tableNumber;
    //   state.uuid = uuid;
      
    //   // Store both tableNumber and uuid in localStorage
    //   localStorage.setItem("tableNumber", JSON.stringify(state.tableNumber));
    //   localStorage.setItem("uuid", JSON.stringify(state.uuid));
    // },

    decreaseCartItemQuantity(state, action) {
      //select item which need to decrease
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      //decrease item if item quantity more than 1
      if (state.cartItems[itemIndex].itemQuantity > 1) {
        //decrease item count
        state.cartItems[itemIndex].itemQuantity -= 1;
        //decrease cart quantity
        state.cartQuantity -= 1;
        //decrease total price
        state.cartTotal =
          parseInt(state.cartTotal) - parseInt(action.payload.Price);

        localStorage.setItem(
          "cartQuantity",
          JSON.stringify(state.cartQuantity)
        );
        localStorage.setItem("cartTotal", JSON.stringify(state.cartTotal));
      } else if (state.cartItems[itemIndex].itemQuantity === 1) {
        //remove item if item quantity === 1

        const availableItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItems = availableItems;
        toast.error(`Removed ${action.payload.ItemName} from bucket!`, {
          position: "top-center",
        });

        //decrease cart quantity
        state.cartQuantity -= 1;
        //decrease total price
        state.cartTotal = state.cartTotal - action.payload.Price;

        localStorage.setItem(
          "cartQuantity",
          JSON.stringify(state.cartQuantity)
        );
        localStorage.setItem("cartTotal", JSON.stringify(state.cartTotal));
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increaseCartItemQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      //increase item count
      state.cartItems[itemIndex].itemQuantity += 1;

      //increase cart quantity
      state.cartQuantity += 1;

      //increase total price
      state.cartTotal =
        parseInt(state.cartTotal) + parseInt(action.payload.Price);

      localStorage.setItem("cartQuantity", JSON.stringify(state.cartQuantity));
      localStorage.setItem("cartTotal", JSON.stringify(state.cartTotal));
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearOrder(state, action) {
      let list = [];
      state.cartItems.forEach((item) => {
        list.push({ name: item.ItemName, qnt: item.itemQuantity });
      });

      //order items
      console.log("******order items******");
      console.log(state.cartItems);
      console.log("***********************");

      console.log("******order items--******");
      console.log(list);
      console.log("***********************");

      //order count
      console.log("++++++order items++++++");
      console.log(state.cartQuantity);
      console.log("+++++++++++++++++++++++");

      //bill price
      console.log("******order price******");
      console.log(state.cartTotal);
      console.log("***********************");

      // toast.success('Your order received, Give us few minutes to get it back to you!', {
      //     position: "top-center"
      // });

      // localStorage.setItem("cartQuantity", JSON.stringify([]));
      // localStorage.setItem("cartTotal", JSON.stringify(0));
      // localStorage.setItem("cartItems", JSON.stringify(0));
      localStorage.clear("cartQuantity");
      localStorage.clear("cartTotal");
      localStorage.clear("cartItems");
      localStorage.clear("tableDocumentId");
      localStorage.clear("lastTableStatusUpdate");
    },
  },
});

export const {
  addToCart,
  removeItemFromCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  clearOrder,
  recordTableNumber,
} = cartSlice.actions;

export default cartSlice.reducer;
