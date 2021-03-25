import {AsyncStorage} from 'react-native'

const STORAGE_KEY = 'FlashCard:decks'

export function getDecksFromStorage() {
    return AsyncStorage.getItem(STORAGE_KEY)
}


export function removeDeckFromStorage(id) {
    return new Promise((res, rej) => {
        AsyncStorage.getItem(STORAGE_KEY)
            .then((results) => {
                const data = JSON.parse(results)
                data[id] = undefined
                delete data[key]
                res(AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data)))
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
                res(AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data)))
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
                res(AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data)))
            })
            .catch(e => rej(e))
    })
}

