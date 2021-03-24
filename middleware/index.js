import thunk from "redux-thunk"
import decks from "./decks"
import {applyMiddleware} from "redux"

export default applyMiddleware(
    thunk,
    decks
)
