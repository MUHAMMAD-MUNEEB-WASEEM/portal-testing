import { createContext, useReducer, useEffect } from 'react';
import { useLogout } from '../hooks/useLogout';

export const AuthContext = createContext();

const events = ['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress'];

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    // case "GET_USER":
    //   return {getUser:action.payload};
    // case "UPDATE_USER":
    // return {user:action.payload}
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  // automatic logout if user is inactive

  let timer;

  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      // clears any peding timer
      resetTimer();

      // removing existing event listener
      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });
      // calling logout function

      const logout = () => {
        dispatch({
          type: 'LOGOUT',
        });
        // invoiceDispatch({
        //   type: "REMOVE_ALL_CLIENTS",
        // });
        // invoiceDispatch({
        //   type: "REMOVE_ALL_JOBS",
        // });
        // invoiceDispatch({
        //   type: "REMOVE_ALL_INVOICE",
        // });
        // invoiceDispatch({
        //   type: "REMOVE_ALL_SUB_JOBS",
        // });
        // invoiceDispatch({
        //   type: "GET_ALL_SUB_INVOICE",
        // });
        localStorage.removeItem('User');
        localStorage.removeItem('job_id');
        localStorage.removeItem('client_id');
      };
      logout();
    }, 3000000);
  };

  // this will reset the timer if exist
  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };

  useEffect(() => {
    // get user from local storage
    const user = JSON.parse(localStorage.getItem('User'));

    // //console.log("parse user",user)
    if (user) {
      // dispatch the login action
      dispatch({
        type: 'LOGIN',
        payload: user,
      });
    }

    // // automatic logout if user is inactive
    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer();
        handleLogoutTimer();
      });
    });
  }, []);

  // //console.log("AuthContext :", state);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
