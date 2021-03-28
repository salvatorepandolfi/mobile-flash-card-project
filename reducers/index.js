import {combineReducers} from "redux";
import decks from "./decks";
import message from "./message";

export default combineReducers({
    decks,
    message
})
