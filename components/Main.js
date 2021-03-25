import React, {Component} from 'react'
import {connect} from "react-redux";
import {StyleSheet, Text} from "react-native";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";
import {handleGetDecks} from "../actions/decks";

class Main extends Component {

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(handleGetDecks)
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text>This will contains our decks</Text>
                <StatusBar style="auto"/>
            </SafeAreaView>
        )
    }
}


export default connect()(Main)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
