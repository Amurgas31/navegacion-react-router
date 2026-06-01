// src/components/PrivateRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
//import { useAuth } from "../hooks/useAuth";
import useFakeLogin from "../hooks/useFakeLogin";

export const PrivateRoute = () => {
  //const { authCokie } = useAuth();
  const { authCokie } = useFakeLogin();
  return authCokie ? <Outlet /> : <Navigate to="/" />;
};