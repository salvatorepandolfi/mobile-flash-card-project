import React, {Component} from 'react'
import {connect} from "react-redux"
import {StyleSheet, Text} from "react-native"
import {StatusBar} from "expo-status-bar"
import {SafeAreaView} from "react-native-safe-area-context"
import {NavigationContainer} from '@react-navigation/native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {handleGetDecks} from "../actions/decks"
import DeckList from "./DeckList";


const Tab = createMaterialTopTabNavigator()

const TabNav = () => (
    <Tab.Navigator>
        <Tab.Screen name="Decks" component={DeckList}/>
    </Tab.Navigator>
)

class Main extends Component {
    componentDidMount() {
        const {dispatch} = this.props
        dispatch(handleGetDecks())
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <NavigationContainer>
                    <TabNav/>
                    <StatusBar style="auto"/>
                </NavigationContainer>
            </SafeAreaView>
        )
    }
}


export default connect()(Main)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
