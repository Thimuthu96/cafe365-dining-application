import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NavMenuItem = (props) => {
  const navLinksActive = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#0E9E52" : "#0E9E52cc",
    };
  };

  return (
    <div className="menu-item-card">
      <Link to={props.itemLink} className="links">
        <Typography>{props.itemName}</Typography>
      </Link>
    </div>
  );
};

export default NavMenuItem;
