import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOCATION,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  _id: "",
  name: "",
  isAuth: false,
  createdAt: new Date().getTime(),
  userLat: 43.653908,
  userLng: -79.384293
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      console.log(payload);

      return {
        ...state,
        id: payload._id,
        name: payload.name,
        isAuth: true
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        token: payload.token,
        id: payload._id,
        name: payload.name,
        isAuth: true
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      sessionStorage.clear();
      return { ...state, _id: "", name: "", isAuth: false };

    case USER_LOCATION:
      return {
        ...state,
        userLat: payload.lat,
        userLng: payload.lng
      };
    default:
      return state;
  }
}
