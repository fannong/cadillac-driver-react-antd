import React from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Production from "../pages/Production";
import Admin from "../pages/Admin";
import Page1 from "../pages/Admin/page1";
import Mine from "@/pages/Home/components/Mine";
import CompanyDetail from "@/pages/Home/components/CompanyDetail";
const routes = [
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "mine",
        element: <Mine></Mine>,
      },
      {
        path: "introduce",
        element: <div>introduce</div>,
      },
      {
        path: "company",
        element: <CompanyDetail />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/production",
    element: <Production></Production>,
  },
  {
    path: "/admin",
    element: <Admin></Admin>,
    children: [
      {
        path: "sing1",
        element: <div>sing1</div>,
      },
      {
        path: "page1",
        element: <Page1></Page1>,
      },
      {
        path: "page2",
        element: <div>page2</div>,
      },
    ],
  },
];

export default routes;
