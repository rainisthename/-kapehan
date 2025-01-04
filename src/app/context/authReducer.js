export default function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };
      
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        token: action.payload.token, // Store token
      };  

    case "LOGIN_FAILURE":
      return { ...state, loading: false, error: action.error };
      
    case "USER_FETCH_REQUEST":
      return { ...state, loading: true };
      
    case "USER_FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload, // Store fetched user data
      };

    case "USER_FETCH_FAILURE":
      console.log("USER_FETCH_FAILURE: Error fetching user data.", action.error);
      return { ...state, loading: false, error: action.error };
      
    case "LOGOUT":
      return { ...state, user: null, token: null };
      
    case "LOGOUT_FAILURE":
      return { ...state, loading: false, error: action.error };
      
    default:
      return state;
  }
}
