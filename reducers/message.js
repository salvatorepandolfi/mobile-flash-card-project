import {SHOW_MESSAGE, HIDE_MESSAGE} from "../actions/message";

export default function message(state = {
    text: '',
    severity: 'success',
    open: false
}, action) {
    switch (action.type) {
        case SHOW_MESSAGE:
            return {
                text: action.message.text,
                severity: action.message.severity,
                open: true
            }
        case HIDE_MESSAGE:
            return {
                text: '',
                severity: 'success',
                open: false
            }
        default:
            return state
    }
}
