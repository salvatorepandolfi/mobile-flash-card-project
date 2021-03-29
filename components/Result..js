import React from 'react'
import {StyleSheet, Text, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function Result({questions, rightAnswers}) {
    const result = rightAnswers / questions * 100
    let color = '#dbbc06'
    let resultMessage = `Great`
    let icon = "thumb-up"
    if (result >= 70) {
        color = '#197e10'
        resultMessage = `Excellent!`
        icon = "party-popper"
    } else {
        if (result <= 50) {
            color = '#ab0606'
            resultMessage = `Oh no!`
            icon = "thumb-down"
        }
    }
    return (
        <View style={styles.container}>
            <Text style={[styles.results, {
                fontSize: 45,
                color: color
            }]}>
                <MaterialCommunityIcons
                    name={icon}
                    size={55}
                /> {resultMessage}
            </Text>
            <Text style={[styles.results, {marginTop: 15}]}>
                You scored {result}% right answers
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        results: {
            fontSize: 25,
            color: 'black'
        }
    }
)
