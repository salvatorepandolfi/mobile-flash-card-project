import React, {Component} from 'react'
import {connect} from "react-redux"
import {StyleSheet} from "react-native"
import {StatusBar} from "expo-status-bar"
import {SafeAreaView} from "react-native-safe-area-context"
import {NavigationContainer} from '@react-navigation/native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import {handleGetDecks} from "../actions/decks"
import DeckList from "./DeckList"
import NewDeck from "./NewDeck"
import DeckView from "./DeckView";
import AddCard from "./AddCard";
import StartQuiz from "./StartQuiz";
import Message from './Message'
import {setLocalNotification} from "../utils";


const Tab = createMaterialTopTabNavigator()

const TabNav = () => (
    <Tab.Navigator>
        <Tab.Screen name="Decks" component={DeckList}/>
        <Tab.Screen name="New Deck" component={NewDeck}/>
    </Tab.Navigator>
)
const Stack = createStackNavigator();

const StackNav = () => (
    <Stack.Navigator headerMode='screen'>
        <Stack.Screen name='Home' component={TabNav} options={{headerShown: false}}/>
        <Stack.Screen name='Deck View' component={DeckView}/>
        <Stack.Screen name='Add Card' component={AddCard}/>
        <Stack.Screen name='Start Quiz' component={StartQuiz}/>
    </Stack.Navigator>
)

class Main extends Component {
    componentDidMount() {
        const {dispatch} = this.props
        dispatch(handleGetDecks())
        setLocalNotification()
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <NavigationContainer>
                    <StackNav/>
                    <Message/>
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
