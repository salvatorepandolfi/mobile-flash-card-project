import React from "react"
import {TouchableOpacity, Text, StyleSheet} from 'react-native'

export default function ({children, onPress, style = {}}) {
    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={onPress}
        >
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'black',
        padding:10,
        paddingLeft: 40,
        paddingRight: 40,
        borderRadius: 7,

    },
    text: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center'
    }
})
