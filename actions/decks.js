export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const CREATE_DECK = 'CREATE_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'
export const REMOVE_QUESTION = 'REMOVE_QUESTION'

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function createDeck(title) {
    return {
        type: CREATE_DECK,
        title
    }
}

export function deleteDeck(title) {
    return {
        type: DELETE_DECK,
        title
    }
}

export function addQuestion({title, question, answer}) {
    return {
        type: ADD_QUESTION,
        title,
        question,
        answer
    }
}

export function removeQuestion({title, question}) {
    return {
        type: ADD_QUESTION,
        title,
        question
    }
}
