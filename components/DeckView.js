import React, {Component} from "react"
import {Text, View, StyleSheet, Alert} from 'react-native'
import {connect} from "react-redux"
import StyledButton from "./StyledButton"
import {handleDeleteDeck} from "../actions/decks"
import {showMessage} from "../actions/message"


class DeckView extends Component {
    componentDidMount() {
        this.setTitle(this.props.route.params.deckId);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.deck !== undefined
    }

    setTitle = (deckId) => {
        if (!deckId) return;
        this.props.navigation.setOptions({title: deckId});
    }

    deleteDialog = () => {
        Alert.alert(
            "Attention!",
            "Are you sure you want to delete this deck and all its cards?\n\nThe operation cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        this.props.deleteDeck()
                    }
                }
            ]
        );
    }

    render() {
        const {deck, navigation} = this.props
        return (
            <View style={styles.container}>
                <View style={styles.details}>
                    <Text style={styles.title}>
                        {deck.title}
                    </Text>
                    <Text style={styles.subtitle}>
                        {deck.questions.length} {deck.questions.length <= 1 ? 'card' : 'cards'}
                    </Text>
                </View>
                <View style={styles.actions}>
                    <StyledButton style={styles.button}
                                  onPress={() => navigation.navigate('Add Card', {deckId: deck.title})}>Add
                        Card</StyledButton>
                    {deck.questions.length >= 0
                    && <StyledButton style={styles.button}
                                     onPress={() => navigation.navigate('Start Quiz', {deckId: deck.title})}>Start
                        Quiz</StyledButton>}
                    <StyledButton style={styles.button} onPress={() => this.deleteDialog()}>Delete Deck</StyledButton>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
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

    },
    button: {
        alignSelf: 'stretch'
    },
    title: {
        fontSize: 70
    },
    subtitle: {
        fontSize: 20
    }
})

const mapStateToProps = ({decks}, {route}) => {
    const {deckId} = route.params
    return {deck: decks[deckId]}
}
const mapDispatchToProps = (dispatch, {route, navigation}) => {
    return {
        deleteDeck: () => {
            const {deckId} = route.params
            return new Promise(res => {
                dispatch(handleDeleteDeck(deckId, () => {
                    navigation.navigate('Home')
                    return res(dispatch(showMessage('Deck deleted')))
                }))
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DeckView)
