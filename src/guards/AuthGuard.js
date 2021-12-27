import React, { Fragment } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// For routes that can only be accessed by authenticated users
function AuthGuard({ children }) {
  const { isAuthenticated } = useAuth();

  const accessToken = localStorage.getItem("accessToken");

  return <>{!accessToken ? children : <Navigate to="/dashboard" />}</>;

  // if (!accessToken) {
  //   return <Navigate to="/auth/sign-in" />;
  // }

  // return <Fragment>{children}</Fragment>;
}

// export const getIsAuthDefaultValue = () => {
//   try {
//     const access = LocalStorageHelper.getItem(ACCESS);
//     return !!(access && access.expiresIn && access.expiresIn > Date.now());
//   } catch (error) {
//     return false;
//   }
// };

// const IsNotAuthLayer = observer(({ children }) => {
//   const { isAuth } = authStore;
//   return (
//     <>
//       {!isAuth ? children : <Redirect to={defaultPath}/>}
//     </>
//   );
// });

export default AuthGuard;
