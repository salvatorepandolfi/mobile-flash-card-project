import React, {Component} from "react"
import {connect} from "react-redux"
import {View, Text, TextInput, StyleSheet, Keyboard} from "react-native"
import StyledButton from "./StyledButton"
import StyledTextInput from './StyledTextInput'
import {handleCreateDeck} from "../actions/decks"
import {showMessage} from "../actions/message"

class NewDeck extends Component {
    addNewDeck = () => {
        const {title} = this.state
        if (title.trim() === '') {
            return this.setState({error: 'Insert a valid title'})
        }
        this.props.addDeck(title).then(() => this.setState({title: ''}))
    }
    onChange = (title) => {
        this.setState(() => ({title, error: ''}),
            () => {
                if (this.state.title.trim() === '') {
                    this.setState({error: 'Insert a valid title'})
                }
            }
        )
    }
    state = {
        title: '',
        error: ''
    }

    render() {
        const {title, error} = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.header}>What is the title of the new deck?</Text>
                <StyledTextInput
                    value={title}
                    error={error}
                    onChange={this.onChange}
                    placeholder='Deck Title'
                    options={{maxLength:50}}
                />
                <StyledButton onPress={this.addNewDeck}>SUBMIT</StyledButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    header: {
        fontSize: 45,
        alignSelf: 'center',
        textAlign: 'center',
    }
})

const mapDispatchToProps = (dispatch, {navigation}) => {
    return {
        addDeck: (title) => {
            return new Promise((res) => {
                dispatch(handleCreateDeck(title, () => {
                    Keyboard.dismiss()
                    navigation.navigate('Decks')
                    dispatch(showMessage('New deck created'))
                    return res()
                }))
            })
        }
    }
}
export default connect(null, mapDispatchToProps)(NewDeck)

