import React from "react"
import {Text, TextInput, View, StyleSheet} from "react-native";

export default function SyledTextInput({value, placeholder, onChange, error, options = {}}) {
    return (
        <View style={styles.inputContainer}>
            <View style={{flexDirection: 'row'}}>
                <TextInput
                    style={styles.titleInput}
                    value={value}
                    placeholder={placeholder}
                    onChangeText={onChange}
                    {...options}
                />
            </View>
            <Text style={styles.error}>{error}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        alignItems: 'center'
    },
    titleInput: {
        flex: 1,
        marginRight: 20,
        marginLeft: 20,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 25,
        minHeight: 60,
        borderWidth: 1,
        borderRadius: 5,
    },
    error: {
        color: '#ed4337',
    }
})
