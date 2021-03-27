import {ADD_QUESTION, CREATE_DECK} from "../actions/decks";
import {Alert} from "react-native";

const decks = (store) => (next) => (action) => {
    //TODO change alert message
    const state = store.getState();
    if (action.type === CREATE_DECK && state.decks[action.title]) {
        Alert.alert('A deck with the same name already exits.')
        throw new Error("DECK_ALREADY_EXIST")

    }
    if (action.type === ADD_QUESTION
        && state.decks[action.title]
        && state.decks[action.title].questions.length > 0
        && state.decks[action.title].questions.filter(q => q.question === action.question).length > 0) {
        Alert.alert('This question is already been asked in this deck.')
        throw new Error("CARD_ALREADY_EXIST")
    }
    return next(action)
}

export default decks
