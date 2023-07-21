import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { register } from "./redux/API/user";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import UserProfile from "./pages/Profile";
import Home from "./pages/Home";
import "./styles/global.scss";
import CompetitionDota2 from "./pages/CompetitionDota2";
import Admin from "./pages/Admin";
import CashRoom from "./pages/CashRoom";
import CreateCompetition from "./pages/CreateCompetition";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <UserProfile />,
  },
  {
    path: "/competition/:id",
    element: <CompetitionDota2 />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/cash-room",
    element: <CashRoom />,
  },
  {
    path: "/admin/create-competition",
    element: <CreateCompetition />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
