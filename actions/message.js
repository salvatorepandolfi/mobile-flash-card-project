export const SHOW_MESSAGE = 'SHOW_MESSAGE'
export const HIDE_MESSAGE = 'HIDE_MESSAGE'

export function showMessage(text, severity = 'success') {
    return {
        type: SHOW_MESSAGE,
        message: {text, severity}
    }
}

export function hideMessage() {
    return {
        type: HIDE_MESSAGE,
    }
}
