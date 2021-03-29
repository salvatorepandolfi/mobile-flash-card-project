import React, {Component} from "react"
import {connect} from "react-redux"
import {StyleSheet, ScrollView, View, Text, TouchableOpacity, Animated} from "react-native"
import {MaterialCommunityIcons} from '@expo/vector-icons'


class Deck extends Component {
    state = {animationValue: new Animated.Value(1)}

    go = () => {
        const {deck, goToDeck} = this.props
        const {animationValue} = this.state
        Animated.sequence([
            Animated.timing(animationValue, {duration: 200, toValue: 100, useNativeDriver: true}),
            Animated.timing(animationValue, {toValue: 1, duration: 50, useNativeDriver: true})
        ]).start()
        goToDeck(deck.title)
    }

    render() {
        const {deck} = this.props
        const {animationValue} = this.state
        return (
            <TouchableOpacity onPress={this.go}>
                <Animated.View style={[styles.deckContainer, {transform: [{scale: animationValue}]}]}>
                    <Text style={styles.deckTitle}>
                        {deck.title}
                    </Text>
                    <Text style={styles.deckCardCounter}>
                        {deck.questions.length} cards
                    </Text>
                </Animated.View>
            </TouchableOpacity>
        )
    }
}


class DeckList extends Component {
    goToDeck = (deckId) => {
        this.props.navigation.navigate('Deck View',
            {deckId})
    }
    goToAdd = () => {
        this.props.navigation.navigate('New Deck')
    }

    render() {
        const {decks} = this.props
        return decks.length > 0
            ? (<ScrollView>
                {decks.map((deck, key) => (<Deck deck={deck} goToDeck={this.goToDeck} key={key}/>))}
            </ScrollView>)
            : (<View style={styles.noDecks}>
                <MaterialCommunityIcons name="alert-decagram" size={150} color="black"/>
                <Text style={{fontSize: 25}}>No decks availalbe!</Text>
                <TouchableOpacity style={{paddingTop: 5}} onPress={this.goToAdd}><Text> Add
                    one. </Text></TouchableOpacity>
            </View>)
    }
}

const styles = StyleSheet.create({
    deckContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 200,
        borderBottomWidth: 1,
        borderBottomColor: 'blue'
    },
    noDecks: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deckTitle: {
        fontSize: 50,
        fontWeight: 'bold'
    },
    deckCardCounter: {}
})

const mapStateToProps = ({decks}) => {
    return {decks: Object.values(decks)}
}
export default connect(mapStateToProps)(DeckList)
