import React, { Fragment } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// For routes that can only be accessed by unauthenticated users
function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Fragment>{children}</Fragment>;
}

export default GuestGuard;
