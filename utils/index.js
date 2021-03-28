import {AsyncStorage} from 'react-native'

const STORAGE_KEY = 'FlashCard:decks'

export function resetStorage() {
    const decks = {
        'Deck 1': {
            title: 'Deck 1',
            questions: [
                {
                    question: 'Question 1',
                    answer: 'Answer 1'
                },
                {
                    question: 'Question 2',
                    answer: 'Answer 2'
                },
                {
                    question: 'Question 2',
                    answer: 'Answer 2'
                },
            ]
        },
        'Deck 2': {
            title: 'Deck 2',
            questions: [
                {
                    question: 'Question 1',
                    answer: 'Answer 1'
                },
                {
                    question: 'Question 2',
                    answer: 'Answer 2'
                },
                {
                    question: 'Question 2',
                    answer: 'Answer 2'
                },
            ]
        },
        'Deck 3': {
            title: 'Deck 3',
            questions: [
                {
                    question: 'Question 1',
                    answer: 'Answer 1'
                },
                {
                    question: 'Question 2',
                    answer: 'Answer 2'
                },
                {
                    question: 'Question 2',
                    answer: 'Answer 2'
                },
            ]
        },
        'Deck 4': {
            title: 'Deck 4',
            questions: [
                {
                    question: 'Question 1',
                    answer: 'Answer 1'
                },
                {
                    question: 'Question 2',
                    answer: 'Answer 2'
                },
                {
                    question: 'Question 2',
                    answer: 'Answer 2'
                },
            ]
        },
    }
    AsyncStorage.clear()
    return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
}

export function getDecksFromStorage() {
    // return new Promise((res) =>{
    //     resetStorage().then(()=>{
    //         res(AsyncStorage.getItem(STORAGE_KEY))
    //     })
    // })
    return AsyncStorage.getItem(STORAGE_KEY)
}


export function removeDeckFromStorage(id) {
    return new Promise((res, rej) => {
        AsyncStorage.getItem(STORAGE_KEY)
            .then((results) => {
                const data = JSON.parse(results)
                data[id] = undefined
                delete data[id]
                res(AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data)))
            })
            .catch(e => rej(e))
    })
}

export function saveDeckTitleToStorage(title) {
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(
        {
            [title]: {
                title,
                questions: []
            }
        }
    ))

}

export function addCardToDeckToStorage(title, card) {
    return new Promise((res, rej) => {
        AsyncStorage.getItem(STORAGE_KEY)
            .then((results) => {
                const data = JSON.parse(results)
                if (data[title] !== undefined) {
                    const {questions} = data[title]
                    data[title] = {
                        ...data[title],
                        questions: questions.concat([card])
                    }
                }
                res(AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data)))
            })
            .catch(e => rej(e))
    })
}


export function removeCardFromDeckToStorage(title, card) {
    return new Promise((res, rej) => {
        AsyncStorage.getItem(STORAGE_KEY)
            .then((results) => {
                const data = JSON.parse(results)
                if (data[title] !== undefined) {
                    const {questions} = data[title]
                    data[title] = {
                        ...data[title],
                        questions: questions.filter(q => q.question !== card.question)
                    }
                }
                res(AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data)))
            })
            .catch(e => rej(e))
    })
}

