import React, { Fragment } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// For routes that can only be accessed by unauthenticated users
function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth();
  const accessToken = localStorage.getItem("accessToken");
  console.log(" accessToken ", accessToken);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  } else {
    <Navigate to="/auth/sign-in" />
  }

  return <Fragment>{children}</Fragment>;
}

export default GuestGuard;
