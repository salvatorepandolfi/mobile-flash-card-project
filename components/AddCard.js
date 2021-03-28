import React, {Component} from "react"
import {Text, View} from 'react-native'
import {connect} from "react-redux"
import StyledTextInput from "./StyledTextInput";
import StyledButton from "./StyledButton";
import {handleAddQuestion} from "../actions/decks";

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

    render() {
        const {question, answer, errors} = this.state
        console.log(this.state)
        return (
            <View>
                <StyledTextInput
                    value={question}
                    error={errors.question}
                    onChange={this.onChangeQuestion}
                    placeholder='Question...'
                    options={{
                        maxLength: 150,
                        multiline: true,
                        numberOfLines: 4
                    }}
                />
                <StyledTextInput
                    value={answer}
                    error={errors.answer}
                    onChange={this.onChangeAnswer}
                    placeholder='Answer...'
                    options={{
                        maxLength: 150,
                        multiline: true,
                        numberOfLines: 4
                    }}
                />
                <StyledButton onPress={this.submit}>Submit</StyledButton>
            </View>
        )
    }
}

const mapStateToProps = ({decks}, {route}) => {
    return {
        deck: decks[route.params.deckId]
    }
}
const mapDispatchToProps = (dispatch, {navigation, route}) => {
    return {
        addQuestion: (question, answer) => {
            const {deckId} = route.params
            return dispatch(handleAddQuestion({
                title: deckId,
                question,
                answer
            }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
//TODO WIP finish layout and feedback on card creation or not
