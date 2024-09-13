import React from "react";
import { Grid } from "@mui/material";
import {} from "react-router-dom";

//compnets
import NavMenuItem from "./NavMenuItem";

const NavigationMenu = () => {
  return (
    <Grid>
      <Grid item xs={12} sm={12} md={12}>
        <div className="menu-container">
          <ul className="menu-list">
            <NavMenuItem itemName={"Breakfast Menu"} itemLink={"/food-cat/1"} />
            <NavMenuItem itemName={"Biriyani"} itemLink={"/food-cat/2"} />
            <NavMenuItem itemName={"Lunch Menu"} itemLink={"/food-cat/3"} />
            <NavMenuItem itemName={"Kottu Station"} itemLink={"/food-cat/4"} />
            <NavMenuItem itemName={"Soup"} itemLink={"/food-cat/5"} />
            <NavMenuItem itemName={"Desserts"} itemLink={"/food-cat/6"} />
            <NavMenuItem itemName={"Appetizers"} itemLink={"/food-cat/7"} />
          </ul>
        </div>
      </Grid>
    </Grid>
  );
};

export default NavigationMenu;
