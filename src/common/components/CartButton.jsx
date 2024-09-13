import { SpeedDial, Typography } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const CartButton = () => {
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.cart);

  //navigate to cart
  const handleToCart = () => {
    navigate("/cart");
  };

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 0,
        }}
        FabProps={{
          sx: {
            bgcolor: "#0E9E52",
          },
        }}
        onClick={handleToCart}
        icon={
          <FaShoppingCart style={{ fontSize: "20px", position: "fixed" }} />
        }
      >
        <div className="cart-icon-badge">
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            {cartData.cartQuantity}
          </Typography>
        </div>
      </SpeedDial>
    </>
  );
};
