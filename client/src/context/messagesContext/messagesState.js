import React, { useReducer } from "react";
import axios from "axios";
import MessagesContext from "../messagesContext/messagesContext";
import messagesReducer from "../messagesContext/messagesReducer";
import setToken from "../../utils/setToken";
import {
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_ERROR,
  GET_ADMIN_MESSAGES_SUCCESS,
  GET_ADMIN_MESSAGES_ERROR,
  GET_USER_MESSAGES_SUCCESS,
  GET_USER_MESSAGES_ERROR,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_ERROR,
  ADMIN_REPLY_SUCCESS,
  ADMIN_REPLY_ERROR,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  CLEAR_ERROR,
  CLEAR_INFO,
  LOGOUT,
} from "../../types";

const MessagesState = (props) => {
  const initialState = {
    admin_login_success: null,
    admin_login_error: null,
    get_admin_messages_success: null,
    get_admin_messages_error: null,
    get_user_messages_success: null,
    get_user_messages_error: null,
    message_send_success: null,
    message_send_error: null,
    admin_reply_success: null,
    admin_reply_error: null,
    admin_auth: null,
    forgot_password_success: null,
    forgot_password_error: null,
  };
  const [state, dispatch] = useReducer(messagesReducer, initialState);

  //Admin Login
  const adminLogin = async (data) => {
    console.log(data);
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("chat/admin_login", data, config);
      console.log(res);
      dispatch({
        type: ADMIN_LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err.response.data.error);
      dispatch({
        type: ADMIN_LOGIN_ERROR,
        payload: err.response.data,
      });
    }
  };

  //forgot password
  const forgotPassword = async (data) => {
    console.log(data);
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/chat/forgotPassword", data, config);
      console.log(res);
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err.response.data.error);
      dispatch({
        type: FORGOT_PASSWORD_ERROR,
        payload: err.response.data,
      });
    }
  };

  //Pull all messages on Admin Page
  const getAdminMessages = async () => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    const config = {
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.get("/chat/getMessages", config);
      console.log(res);
      dispatch({
        type: GET_ADMIN_MESSAGES_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_ADMIN_MESSAGES_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Pull messages of normal user for chatting with admin
  const getUserMessages = async () => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    const config = {
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.get("/chat/getMessagesUser", config);
      console.log(res);
      dispatch({
        type: GET_USER_MESSAGES_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_USER_MESSAGES_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Message send from user and admin
  const sendMessage = async (message) => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    console.log("109", message);
    const config = {
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.post("/chat/user_messages", message, config);
      console.log(res);
      dispatch({
        type: MESSAGE_SEND_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: MESSAGE_SEND_ERROR,
        payload: err.response.data,
      });
    }
  };

  //admin reply
  const adminReply = async (message) => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    console.log("109", message);
    const config = {
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.put("/chat/admin_reply", message, config);
      console.log(res);
      dispatch({
        type: ADMIN_REPLY_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ADMIN_REPLY_ERROR,
        payload: err.response.data,
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  //for clearing error messages
  const clearError = () => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };

  //for clearing success messages
  const clearInfo = () => {
    dispatch({
      type: CLEAR_INFO,
    });
  };

  return (
    <MessagesContext.Provider
      value={{
        admin: state.admin,
        admin_login_success: state.admin_login_success,
        admin_login_error: state.admin_login_error,
        get_admin_messages_success: state.get_admin_messages_success,
        get_admin_messages_error: state.get_admin_messages_error,
        get_user_messages_success: state.get_user_messages_success,
        get_user_messages_error: state.get_user_messages_error,
        message_send_success: state.message_send_success,
        message_send_error: state.message_send_error,
        admin_reply_success: state.admin_reply_success,
        admin_reply_error: state.admin_reply_error,
        forgot_password_success: state.forgot_password_success,
        forgot_password_error: state.forgot_password_error,
        admin_auth: state.admin_auth,
        adminLogin,
        getAdminMessages,
        getUserMessages,
        sendMessage,
        adminReply,
        forgotPassword,
        clearError,
        clearInfo,
        logout,
      }}
    >
      {" "}
      {props.children}
    </MessagesContext.Provider>
  );
};

export default MessagesState;
