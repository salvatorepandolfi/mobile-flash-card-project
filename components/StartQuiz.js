import React, {Component} from "react"
import {StyleSheet, Text, View} from 'react-native'
import {connect} from "react-redux";
import StyledButton from "./StyledButton";

class StartQuiz extends Component {
    state = {
        progress: 1,
        rightAnswers: 0,
        wrongAnswers: 0
    }
    answer = (right) => {
        let {progress, rightAnswers, wrongAnswers} = this.state
        if (right === true) {
            rightAnswers++
        } else {
            wrongAnswers++
        }
        progress++
        this.setState({progress, rightAnswers, wrongAnswers})
    }


    render() {
        const {progress} = this.state
        const {deck} = this.props
        const {questions} = deck
        return (
            <View style={styles.container}>
                {progress <= questions.length
                    ? (
                        <View style={styles.details}>
                            <Text style={styles.title}>This is question {progress} of {questions.length}</Text>
                            <View style={styles.cardContainer}>
                                <Text>{questions[progress - 1].question}</Text>
                            </View>
                        </View>
                    )
                    : (
                        <View style={styles.details}>
                            <Text style={styles.results}>Results</Text>
                        </View>
                    )
                }
                <View style={styles.actions}>
                    <StyledButton style={styles.button} onPress={() => this.answer(true)}>Correct</StyledButton>
                    <StyledButton style={styles.button} onPress={() => this.answer(false)}>Incorrect</StyledButton>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        padding: 20
    },
    cardContainer: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'red',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    details: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actions: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    button: {
        alignSelf: 'stretch'
    },
    title: {
        alignSelf: 'flex-start',
        fontSize: 25
    },
    results: {
        fontSize: 25
    }
})


const mapStateToProps = ({decks}, {route}) => {
    const {deckId} = route.params
    return {deck: decks[deckId]}
}
export default connect(mapStateToProps)(StartQuiz)
