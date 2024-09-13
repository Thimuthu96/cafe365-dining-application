import React, { useState, useEffect } from "react";
import { Grid, IconButton, Box, CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HeaderBanner from "../../assets/images/kottu.svg";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import empty from "../../assets/images/empty.png";
import { useSelector } from "react-redux";

//firebase
import { db } from "../../services/firebase-config";
import { collection, getDocs, where, query } from "firebase/firestore";

//components
import ItemCard from "../../common/components/ItemCard";
import { HelpButton } from "../../common/components/HelpButton";
import { CartButton } from "../../common/components/CartButton";
import NavigationMenu from "../Menu/components/NavigationMenu";

const Kottu = () => {
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
  const navigate = useNavigate();
  const tableNumber = useSelector((state) => state.cart.tableNumber);
  const uuid = useSelector((state) => state.cart.uuid);

  //navigate to home
  const handleClickArrow = () => {
    navigate(`/${tableNumber}/${uuid}`);
  };

  //GET MENU DATA FIRESTORE ONLY SHORTEATS
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        setIsLoading(true);
        const q = query(
          collection(db, "menu"),
          where("Category", "==", "Kottu Station"),
          where("Availability", "==", true)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setMenuData(list);
        setIsLoading(false);
      } catch (err) {
        console.log("*************");
        console.log(err);
        console.log("*************");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="menu-home-view">
      <header style={{ marginBottom: "2rem" }}>
        <IconButton onClick={handleClickArrow} className="arrow-back">
          <MdArrowBackIos />
        </IconButton>
      </header>
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
              // height: 550,
              width: "100%",
            }}
          >
            <ThemeProvider theme={theme1}>
              <CircularProgress color="secondary" />
            </ThemeProvider>
          </Box>
        ) : (
          <>
            {menuData.length != 0 ? (
              menuData.map((menuItem) => {
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
              })
            ) : (
              <Grid>
                <Grid item xs={12} sm={12} md={12} className="empty-category">
                  <img src={empty} alt="empty-cat" />
                </Grid>
                <Grid item xs={12} sm={12} md={12} className="empty-category">
                  <span>
                    There are no food items on this category! <br />
                    Sorry for the inconvenience
                  </span>
                </Grid>
              </Grid>
            )}
          </>
        )}
        {/* <HelpButton /> */}
        <CartButton />
      </Grid>
    </div>
  );
};

export default Kottu;
