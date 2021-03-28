import React, {Component} from "react"
import {Text, View, StyleSheet} from 'react-native'
import {connect} from "react-redux"
import StyledButton from "./StyledButton";


class DeckView extends Component {
    componentDidMount() {
        this.setTitle(this.props.route.params.deckId);
    }

    setTitle = (deckId) => {
        if (!deckId) return;
        this.props.navigation.setOptions({title: deckId});
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
                    <StyledButton onPress={() => navigation.navigate('Add Card', {deckId: deck.title})}>Add
                        Card</StyledButton>
                    {deck.questions.length >= 0
                    && <StyledButton onPress={() => navigation.navigate('Start Quiz', {deckId: deck.title})}>Start
                        Quiz</StyledButton>}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    details: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actions: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    title: {
        fontSize: 70
    },
    subtitle: {
        fontSize: 20
    }
})
//TODO add a remove deck action with an alert dialog to confirm action
const mapStateToProps = ({decks}, {route}) => {
    const {deckId} = route.params
    return {deck: decks[deckId]}
}
export default connect(mapStateToProps)(DeckView)
