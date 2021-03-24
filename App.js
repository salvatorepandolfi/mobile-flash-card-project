import {StatusBar} from 'expo-status-bar';
import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createStore} from "redux";
import reducers from './reducers'
import middleware from './middleware'
import {Provider} from "react-redux"

export default class App extends Component {
    render() {
        const store = createStore(reducers, middleware)
        return (
            <Provider store={store}>
                <SafeAreaView style={styles.container}>
                    <Text>This will contains our decks</Text>
                    <StatusBar style="auto"/>
                </SafeAreaView>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
