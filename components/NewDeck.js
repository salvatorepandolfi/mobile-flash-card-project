import React, {Component} from "react"
import {connect} from "react-redux"
import {View, Text, TextInput, StyleSheet, Keyboard} from "react-native";
import StyledButton from "./StyledButton";
import {handleCreateDeck} from "../actions/decks";

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

                <View style={styles.inputContainer}>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            style={styles.titleInput}
                            placeholder="Deck Title"
                            onChangeText={this.onChange}
                            value={title}
                            maxLength={50}
                        />
                    </View>
                    <Text style={styles.error}>{error}</Text>
                </View>

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
    inputContainer: {
        width: '100%',
        alignItems: 'center'
    },
    header: {
        fontSize: 45,
        alignSelf: 'center',
        textAlign: 'center',
    },
    titleInput: {
        flex: 1,
        marginRight: 20,
        marginLeft: 20,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 25,
        height: 60,
        borderWidth: 1,
        borderRadius: 5,
    },
    error: {
        color: '#ed4337',
    }
})

const mapDispatchToProps = (dispatch, {navigation}) => {
    return {
        addDeck: (title) => {
            return new Promise((res) => {
                dispatch(handleCreateDeck(title, () => {
                    Keyboard.dismiss()
                    navigation.navigate('Decks')
                    return res()
                }))
            })
        }
    }
}
export default connect(null, mapDispatchToProps)(NewDeck)
//TODO add snackbar notification messages

