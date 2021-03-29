import React from "react"
import {View, Text, StyleSheet} from "react-native";


export default function Card({question, answer, show}) {
    return (
        <View
            style={[styles.cardContainer, show === 'question' ? {backgroundColor: '#2f2d2d'} : {backgroundColor: '#d2d2d2'}]}>
            {show === 'question'
                ? (<View style={styles.card}>
                    <Text style={[styles.text, {color: '#ffffff'}]}>{question}</Text>
                </View>)
                : (<View style={styles.card}>
                    <Text style={[styles.text, {color: '#2f2d2d'}]}>{answer}</Text>
                </View>)}
        </View>
    )
}


const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        margin: 15,
        padding: 15,
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 25,
        },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 11,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    text: {
        fontSize: 55,
        fontWeight: 'bold'
    }
})


