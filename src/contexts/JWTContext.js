import { createContext, useLayoutEffect, useReducer } from "react";
import axios from "../utils/axios";
import { setSession } from "../utils/jwt";

const INITIALIZE = "INITIALIZE";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const JWTReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case "SIGN_IN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useLayoutEffect(() => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      dispatch({
        type: "INITIALIZE",
        payload: { isAuthenticated: accessToken },
      });
      //token
    } catch (err) {
      dispatch({ type: "INITIALIZE", payload: { isAuthenticated: false } });
    }
  }, []);

  // useEffect(() => {
  //   const initialize = async () => {
  //     try {
  //       const accessToken = localStorage.getItem('accessToken');
  //
  //       if (accessToken && isValidToken(accessToken)) {
  //         setSession(accessToken);
  //
  //         const response = await axios.get('/api/auth/my-account');
  //         const { user } = response.data;
  //
  //         dispatch({
  //           type: INITIALIZE,
  //           payload: {
  //             isAuthenticated: true,
  //             user,
  //           },
  //         });
  //       } else {
  //         dispatch({
  //           type: INITIALIZE,
  //           payload: {
  //             isAuthenticated: false,
  //             user: null,
  //           },
  //         });
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       dispatch({
  //         type: INITIALIZE,
  //         payload: {
  //           isAuthenticated: false,
  //           user: null,
  //         },
  //       });
  //     }
  //   };
  //
  //   initialize();
  // }, []);

  const signIn = async (email, password) => {
    const response = await axios.post("/api/auth/sign-in", {
      email,
      password,
    });
    const { accessToken, user } = response.data;

    setSession(accessToken);
    dispatch({
      type: SIGN_IN,
      payload: {
        user,
      },
    });
  };

  const signOut = async () => {
    setSession(null);
    dispatch({ type: SIGN_OUT });
  };

  const resetPassword = (email) => console.log(email);
  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        signIn,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
