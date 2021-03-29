import React, {Component} from "react"
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {connect} from "react-redux";
import StyledButton from "./StyledButton";
import Card from "./Card";
import Result from "./Result.";

class StartQuiz extends Component {
    state = {
        progress: 1,
        rightAnswers: 0,
        wrongAnswers: 0,
        show: 'question'
    }

    componentDidMount() {
        this.setTitle(this.props.route.params.deckId + " quiz");
    }

    setTitle = (title) => {
        if (!title) return;
        this.props.navigation.setOptions({title});
    }

    answer = (right) => {
        let {progress, rightAnswers, wrongAnswers} = this.state
        if (right === true) {
            rightAnswers++
        } else {
            wrongAnswers++
        }
        progress++
        this.setState({progress, rightAnswers, wrongAnswers, show: 'question'})
    }
    toggleShow = () => {
        this.setState((state) => {
            return {
                ...state,
                show: state.show === 'question' ? 'answer' : 'question'
            }
        })
    }


    render() {
        const {progress, rightAnswers,  show} = this.state
        const {deck} = this.props
        const {questions} = deck
        return (
            <View style={styles.container}>
                {progress <= questions.length
                    ? (
                        <View style={styles.details}>
                            <Text style={styles.title}>This is question {progress} of {questions.length}</Text>
                            <View style={styles.cardContainer}>
                                <Card
                                    question={questions[progress - 1].question}
                                    answer={questions[progress - 1].answer}
                                    show={show}
                                />
                                <TouchableOpacity onPress={() => (this.toggleShow())}>
                                    <Text
                                        style={styles.toggleBtn}>Show {show === 'question' ? 'answer' : 'question'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                    : (
                        <View style={styles.details}>
                            <Result questions={questions.length} rightAnswers={rightAnswers}/>
                        </View>
                    )
                }

                {progress <= questions.length
                    ? (<View style={styles.actions}>
                        <StyledButton style={styles.button} onPress={() => this.answer(true)}>Correct</StyledButton>
                        <StyledButton style={styles.button} onPress={() => this.answer(false)}>Incorrect</StyledButton>
                    </View>)
                    : (
                        <View style={styles.actions}>
                            <StyledButton style={styles.button} onPress={() => this.setState({
                                progress: 1,
                                rightAnswers: 0,
                                wrongAnswers: 0,
                                show: 'question'
                            })}>Restart the quiz</StyledButton>
                            <StyledButton style={styles.button}
                                          onPress={() => this.props.navigation.navigate('Deck View', {deckId: deck.title})}
                            >Back to Deck</StyledButton>
                        </View>
                    )
                }
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
        toggleBtn: {
            fontSize: 25,
            alignSelf: 'center',
            fontWeight: 'bold',
            color: '#2b342b'
        }
    }
)


const mapStateToProps = ({decks}, {route}) => {
    const {deckId} = route.params
    return {deck: decks[deckId]}
}
export default connect(mapStateToProps)(StartQuiz)
