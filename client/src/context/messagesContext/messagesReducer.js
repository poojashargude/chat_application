import {
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_ERROR,
  GET_ADMIN_MESSAGES_SUCCESS,
  GET_ADMIN_MESSAGES_ERROR,
  GET_USER_MESSAGES_SUCCESS,
  GET_USER_MESSAGES_ERROR,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_ERROR,
  CLEAR_ERROR,
  CLEAR_INFO,
  LOGOUT,
  ADMIN_REPLY_SUCCESS,
  ADMIN_REPLY_ERROR,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      console.log(action.payload);
      return {
        ...state,
        admin_login_success: action.payload,
        admin_auth: true,
      };

    case ADMIN_LOGIN_ERROR:
      console.log(action.payload);
      return {
        ...state,
        admin_login_error: action.payload,
      };

    case GET_ADMIN_MESSAGES_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        get_admin_messages_success: action.payload,
      };

    case GET_ADMIN_MESSAGES_ERROR:
      console.log(action.payload);
      return {
        ...state,
        get_admin_messages_error: action.payload,
      };

    case GET_USER_MESSAGES_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        get_user_messages_success: action.payload,
      };

    case GET_USER_MESSAGES_ERROR:
      console.log(action.payload);
      return {
        ...state,
        get_user_messages_error: action.payload,
      };

    case MESSAGE_SEND_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        message_send_success: action.payload,
      };

    case MESSAGE_SEND_ERROR:
      console.log(action.payload);
      return {
        ...state,
        message_send_error: action.payload,
      };

    case ADMIN_REPLY_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        admin_reply_success: action.payload,
      };

    case ADMIN_REPLY_ERROR:
      console.log(action.payload);
      return {
        ...state,
        admin_reply_error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        admin_login_error: null,
      };

    case CLEAR_INFO:
      return {
        ...state,
        admin_login_success: null,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("phone_number");
      localStorage.removeItem("password");
      console.log("hi");
      return {
        ...state,

        admin_auth: false,
      };

    default:
      return state;
  }
};
