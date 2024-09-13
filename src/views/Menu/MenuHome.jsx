import React, { useState, useEffect } from "react";
import { Grid, Box, CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HeaderBanner from "../../assets/images/banner.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { recordTableNumber } from "../../redux/reducers/cartSlice";
import { toast } from "react-toastify";

//firebase
import { db } from "../../services/firebase-config";
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";

//components
import NavigationMenu from "./components/NavigationMenu";
import ItemCard from "../../common/components/ItemCard";
import { CartButton } from "../../common/components/CartButton";
import { HelpButton } from "../../common/components/HelpButton";
import CustomDialog from "../../common/components/CustomDialog";

const MenuHome = () => {
  const theme1 = createTheme({
    palette: {
      secondary: {
        main: "#0E9E52",
      },
    },
  });

  //states
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  //navigate to cart
  const handleToCart = () => {
    navigate(`/cart/${params.tableNumber}`);
  };

  //open confirmation dialog
  const handleOpenDialog = () => setOpen(true);

  //close confirmation dialog
  const handleCloseDialog = () => setOpen(false);

  //send help request
  const handleRequestHelp = async () => {
    console.log("#### need a help");
    let docId = "";
    try {
      // const docId = localStorage.getItem("tableDocumentId");
      const querySnapshot = await getDocs(
        query(
          collection(db, "table"),
          where("TableNumber", "==", params.tableNumber)
        )
      );
      if (!querySnapshot.empty) {
        docId = querySnapshot.docs[0].id;
      } else {
        console.log("No document found with the given table number.");
        return;
      }
      const docRef = doc(db, "table", docId);
      const data = {
        Status: "help",
      };
      await updateDoc(docRef, data);
      toast.info(
        "Your request received. Our customer service will reach you as soon as possible.",
        {
          position: "bottom-center",
        }
      );
    } catch (err) {
      console.log(`Something went wrong - ${err}`);
    }
  };

  //GET MENU DATA FIRESTORE
  const fetchData = async () => {
    let list = [];
    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(
        query(collection(db, "menu"), where("Availability", "==", true))
      );
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setMenuData(list);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTableStatus = async () => {
    let docId = "";
    try {
      const querySnapshot = await getDocs(
        query(
          collection(db, "table"),
          where("TableNumber", "==", params.tableNumber)
        )
      );
      if (!querySnapshot.empty) {
        docId = querySnapshot.docs[0].id;
      } else {
        console.log("No document found with the given table number.");
        return;
      }

      const docRef = doc(db, "table", docId);
      const data = {
        Status: "active",
      };
      await updateDoc(docRef, data);
      // localStorage.setItem("tableStatus", JSON.stringify(true));
      localStorage.setItem("tableDocumentId", JSON.stringify(docId));
      localStorage.setItem("lastTableStatusUpdate", Date.now());
    } catch (err) {
      console.log("**********");
      console.log(`Something went wrong : ${err}`);
      console.log("**********");
    }
  };

  const storeTableNumber = () => {
    dispatch(recordTableNumber(params.tableNumber));
  };

  // const storeTableNumber = () => {
  //   dispatch(
  //     recordTableNumber({ tableNumber: params.tableNumber, uuid: params.uuid })
  //   );
  // };
  useEffect(() => {
    fetchData();
    storeTableNumber();
    const lastUpdate = localStorage.getItem("lastTableStatusUpdate");
    const currentTime = Date.now();
    const fifteenMinutesInMs = 15 * 60 * 1000;

    if (!lastUpdate || currentTime - lastUpdate > fifteenMinutesInMs) {
      handleTableStatus();
    }
  }, []);

  return (
    <div className="menu-home-view" style={{ margin: ".5rem" }}>
      <img
        src={HeaderBanner}
        alt="header-banner-menu-home"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "fill",
          borderRadius: "8px",
        }}
      />

      <Grid
        container
        sx={{
          marginBottom: "2em",
        }}
      >
        <Grid justifyContent={"flex-start"} item xs={12} sm={12} md={12}>
          <NavigationMenu />
        </Grid>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              width: "100%",
            }}
          >
            <ThemeProvider theme={theme1}>
              <CircularProgress color="secondary" />
            </ThemeProvider>
          </Box>
        ) : (
          <>
            {menuData.map((menuItem) => {
              return (
                <Grid item xs={6} sm={4} md={3}>
                  <ItemCard
                    key={menuItem.id}
                    price={menuItem.Price}
                    name={menuItem.ItemName}
                    foodImage={menuItem.ItemImage}
                    item={menuItem}
                  />
                </Grid>
              );
            })}
          </>
        )}
        <HelpButton
          tableNumber={params.tableNumber}
          handleFunction={handleOpenDialog}
        />
        <CartButton tableNumber={params.tableNumber} />
      </Grid>
      <CustomDialog
        open={open}
        onClose={handleCloseDialog}
        handleFunc={handleRequestHelp}
        title="Request Help"
        desc="Are you sure to request help from our customer service?"
      />
    </div>
  );
};

export default MenuHome;
