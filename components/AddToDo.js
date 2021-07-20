import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddToDo({ submitHandler }) {
    const [text, setText] = useState('')

    const changeHandler = (value) => {
        setText(value)
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder='New To Do...'
                onChangeText={changeHandler}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => submitHandler(text)}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 30,
        marginTop: 20,
        alignItems: 'center'
    },
    textInput: {
        width: 220,
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    addButton: {
        width: 30,
        height: 30,
        marginLeft: 10,
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center'
    },
    addButtonText: {
        color: 'black',
        fontSize: 20,
        fontWeight: '500'
    }
});