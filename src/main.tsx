import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Layout from "./layouts/Layout";
import Agent from "./pages/Agent";
import Dealer from "./pages/auth/Dealer";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import CarPage from "./pages/CarPage";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Search from "./pages/Search";
import Dealers from "./pages/Dealers";

import { Provider } from "react-redux";
import { store } from "./state/store.ts";
import Dashboard from "./pages/Dashboard.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/agent",
        element: <Agent />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
      {
        path: "/cars",
        element: <Search />,
      },
      {
        path: "/dealer",
        element: <Dealers />,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "dealer",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "/cars/:id",
        element: <CarPage />,
      },
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
          {
            path: "dealer",
            element: <Dealer />,
          },
          {
            path: "agent",
            element: <Dealer />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
