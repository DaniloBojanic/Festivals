import { combineReducers } from "redux";
import getPlacesReducers from "./GetPlacesReducers";

export default combineReducers ({
    places: getPlacesReducers
});