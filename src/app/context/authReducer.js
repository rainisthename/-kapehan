// src/context/authReducer.js

export default function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
        token: action.token,
      };
    case "LOGIN_FAILURE":
      return { ...state, loading: false, error: action.error };
    case "LOGOUT":
      return { ...state, user: null, token: null };
    case "LOGOUT_FAILURE":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
