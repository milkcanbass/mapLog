import {
  POST_SUCCESS,
  POST_FAIL,
  NEW_MARKER_SUCCESS,
  RESET_NEW_MARKER,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL
} from "../actions/types";

const initialState = {
  id: null,
  title: "",
  text: "",
  position: {
    markerLat: 43.653908,
    markerLng: -79.384293
  },
  myImg: null,
  commented: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case POST_SUCCESS:
      return {
        ...state,
        ...payload,

        commented: true
      };
    case POST_FAIL:
      return {
        ...state,
        ...payload,
        commented: null
      };
    case NEW_MARKER_SUCCESS:
      return {
        ...state,
        position: {
          markerLat: payload.lat,
          markerLng: payload.lng
        },
        boundFlag: false
      };
    case RESET_NEW_MARKER: {
      return {
        id: null,
        title: "",
        text: "",
        position: {
          markerLat: "",
          markerLng: ""
        },
        myImg: null,
        commented: null
      };
    }
    case DELETE_POST_SUCCESS: {
      return {
        ...state,
        deleted: true
      };
    }
    case DELETE_POST_FAIL: {
      return {
        ...state,
        deleted: null
      };
    }
    default:
      return state;
  }
}
