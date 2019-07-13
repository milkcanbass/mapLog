import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOCATION,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  POST_ABLE,
  POST_DISABLE
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import store from "../store";
import { modalClose } from "./modalActions";

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    dispatch({
      type: USER_LOADED
    });
  } catch (err) {
    console.log(err.message);

    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = ({ name, email, password }) => async dispatch => {
  console.log({ name, email, password });

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("api/auth/register", body, config);

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser());
    store.dispatch(modalClose());
  } catch (err) {
    console.log(err.message);

    dispatch({ type: REGISTER_FAIL });
  }
};

export const login = ({ email, password }) => async dispatch => {
  console.log({ email, password });

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("api/auth/login", body, config);

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
    store.dispatch(modalClose());
  } catch (err) {
    console.log(err.message);

    dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};

export const moveToCurrentLoc = payload => dispatch => {
  try {
    if (!navigator.geolocation) {
      return alert("Geolocation is not supported by your browser");
    }
    navigator.geolocation.getCurrentPosition(position => {
      dispatch({ type: USER_LOCATION, payload: position });
    });
    dispatch(loadUser());
  } catch (err) {
    alert(err);
    console.log(err.message);
  }
};

export const postAble = payload => dispatch => {
  dispatch({
    type: POST_ABLE
  });
};

export const postDisable = payload => dispatch => {
  dispatch({
    type: POST_DISABLE
  });
};
