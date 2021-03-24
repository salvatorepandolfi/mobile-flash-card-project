import {ADD_QUESTION, REMOVE_QUESTION, DELETE_DECK, CREATE_DECK, RECEIVE_DECKS} from "../actions/decks";

export default function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }

        case CREATE_DECK:
            return {
                ...state,
                [action.title]: {
                    title: action.title,
                    questions: []
                }
            }
        case DELETE_DECK: {
            const {[action.title]: deck, ...othersDecks} = state
            return {
                ...othersDecks,
            }
        }
        case ADD_QUESTION: {
            const {title, question, answer} = action
            return {
                ...state,
                [title]:
                    {
                        ...state[title],
                        questions: state[title].questions.concat([{question, answer}])
                    }
            }
        }
        case REMOVE_QUESTION: {
            const {title, question} = action
            return {
                ...state,
                [title]:
                    {
                        ...state[title],
                        questions: state[title].questions.filter(q => q.question !== question)
                    }
            }
        }
        default:
            return state
    }
}
