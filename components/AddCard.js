import React, {Component} from "react"
import {Platform,Keyboard,View,Text, KeyboardAvoidingView, StyleSheet} from 'react-native'
import {connect} from "react-redux"
import StyledTextInput from "./StyledTextInput"
import StyledButton from "./StyledButton"
import {handleAddQuestion} from "../actions/decks"
import {showMessage} from "../actions/message"


class AddCard extends Component {
    componentDidMount() {
        this.setTitle(this.props.deck.title)
    }

    setTitle = (deckId) => {
        if (!deckId) return;
        this.props.navigation.setOptions({title: `Add a card to ${deckId} deck`});
    }
    onChangeQuestion = (question) => {
        this.setState((state) => (
                {
                    ...state,
                    question,
                    errors: {
                        ...state.errors,
                        question: ''
                    },

                }
            ),
            () => {
                if (this.state.question.trim() === '')
                    this.setState((state) => ({
                        ...state,
                        errors: {...state.errors, question: 'Insert a valid question'}
                    }))
            }
        )
    }
    onChangeAnswer = (answer) => {
        this.setState((state) => (
                {
                    ...state,
                    errors: {
                        ...state.errors,
                        answer: ''
                    },
                    answer
                }
            ),
            () => {
                if (this.state.answer.trim() === '')
                    this.setState((state) => ({...state, errors: {...state.errors, answer: 'Insert a valid answer'}}))
            }
        )
    }

    submit = () => {
        const {question, answer, errors} = this.state
        let error = false
        if (question.trim() === '') {
            errors.question = 'Insert a valid question'
            error = true
        }
        if (answer.trim() === '') {
            errors.answer = 'Insert a valid answer'
            error = true
        }
        if (!error) {
            this.props.addQuestion(question, answer)
        } else {
            this.setState({errors})
        }
    }

    state = {
        question: '',
        answer: '',
        errors: {
            question: '',
            answer: ''
        }
    }
    inputOption = {
        maxLength: 150,
        multiline: true,
        numberOfLines: 4
    }

    render() {
        const {question, answer, errors} = this.state
        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
                                  style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.title}>Insert a question and its answer:</Text>
                    <StyledTextInput
                        value={question}
                        error={errors.question}
                        onChange={this.onChangeQuestion}
                        placeholder='Question...'
                        options={this.inputOption}
                    />
                    <StyledTextInput
                        value={answer}
                        error={errors.answer}
                        onChange={this.onChangeAnswer}
                        placeholder='Answer...'
                        options={this.inputOption}
                    />
                    <StyledButton onPress={this.submit}>Submit</StyledButton>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        padding: 20
    },
    title: {
        fontSize: 30
    }
})

const mapStateToProps = ({decks}, {route}) => {
    return {
        deck: decks[route.params.deckId]
    }
}
const mapDispatchToProps = (dispatch, {navigation, route}) => {
    return {
        addQuestion: (question, answer) => {
            const {deckId} = route.params
            return new Promise(res => {
                dispatch(handleAddQuestion({
                    title: deckId,
                    question,
                    answer
                }, () => {
                    Keyboard.dismiss()
                    navigation.navigate('Deck View', {deckId})
                    return res(dispatch(showMessage('Card added to the deck')))
                }))
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)

