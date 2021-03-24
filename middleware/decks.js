import {ADD_QUESTION, CREATE_DECK} from "../actions/decks";
import {Alert} from "react-native";

const decks = (store) => (next) => (action) => {
    const state = store.getState();
    if (action.type === CREATE_DECK && state[action.title]) {
        return Alert.alert('A deck with the same name already exits.')
    }
    if (action.type === ADD_QUESTION
        && state[action.title]
        && state[action.title].questions.length > 0
        && state[action.title].questions.filter(q => q.question === action.question).length > 0) {
        return Alert.alert('This question is already been asked in this deck.')
    }
    return next(action)
}

export default decks
