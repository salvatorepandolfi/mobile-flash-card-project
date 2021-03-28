import {
    getDecksFromStorage,
    addCardToDeckToStorage,
    removeCardFromDeckToStorage,
    removeDeckFromStorage,
    saveDeckTitleToStorage
} from "../utils";

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const CREATE_DECK = 'CREATE_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'
export const REMOVE_QUESTION = 'REMOVE_QUESTION'

function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

function createDeck(title) {
    return {
        type: CREATE_DECK,
        title
    }
}

function deleteDeck(title) {
    return {
        type: DELETE_DECK,
        title
    }
}

function addQuestion({title, question, answer}) {
    return {
        type: ADD_QUESTION,
        title,
        question,
        answer
    }
}

function removeQuestion({title, question}) {
    return {
        type: ADD_QUESTION,
        title,
        question
    }
}

export function handleGetDecks() {
    return (dispatch) => {
        getDecksFromStorage()
            .then(decks => {
                decks !== null
                    ? dispatch(receiveDecks(JSON.parse(decks)))
                    : dispatch(receiveDecks({}))
            })

    }
}

export function handleCreateDeck(title, callback = ()=>{}) {
    return (dispatch) => {
        saveDeckTitleToStorage(title)
            .then(() => dispatch(createDeck(title)))
            .then(callback)
            .catch(e=>{})
    }
}

export function handleDeleteDeck(title, callback = ()=>{}) {
    return (dispatch) => {
        removeDeckFromStorage(title)
            .then(() => dispatch(deleteDeck(title)))
            .then(callback)
            .catch(e=>{})
    }
}

export function handleAddQuestion({title, question, answer},callback = ()=>{}) {
    return (dispatch) => {
        addCardToDeckToStorage(title, {question, answer})
            .then(() => dispatch(addQuestion({title, question, answer})))
            .then(callback)
            .catch(e=>{})
    }
}

export function handleRemoveQuestion({title, question}) {
    return (dispatch) => {
        removeCardFromDeckToStorage(title, {question, answer: ''})
            .then(() => dispatch(removeQuestion({title, question})))
    }
}

//TODO handle the catches, dispatching a message to the customer, even an alert could be fine
