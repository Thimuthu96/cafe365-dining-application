import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";

//components
import MenuHome from "../Menu/MenuHome";
import Cart from "../Cart/Cart";
import ShortEats from "../FoodMenus/Soup";
import Kottu from "../FoodMenus/Kottu";
import Drinks from "../FoodMenus/Breakfast";
import FriedRice from "../FoodMenus/Biriyani";
import RiceAndCurry from "../FoodMenus/Lunch";
import Biriyani from "../FoodMenus/Biriyani";
import Breakfast from "../FoodMenus/Breakfast";
import Lunch from "../FoodMenus/Lunch";
import Soup from "../FoodMenus/Soup";
import Dessert from "../FoodMenus/Dessert";
import Appetizer from "../FoodMenus/Appertizers";

const appRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/:tableNumber",
      element: <MenuHome />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/food-cat/1",
      element: <Breakfast />,
    },
    {
      path: "/food-cat/2",
      element: <Biriyani />,
    },
    {
      path: "/food-cat/3",
      element: <Lunch />,
    },
    {
      path: "/food-cat/4",
      element: <Kottu />,
    },
    {
      path: "/food-cat/5",
      element: <Soup />,
    },
    {
      path: "/food-cat/6",
      element: <Dessert />,
    },
    {
      path: "/food-cat/7",
      element: <Appetizer />,
    },
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default appRoutes;
