import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddToDo({ submitHandler }) {
    const [text, setText] = useState('')

    const changeHandler = (value) => {
        setText(value)
    }

    return (
        <View style={styles.container}>
            <TextInput
                value={text}
                style={styles.textInput}
                placeholder='New To Do...'
                onChangeText={changeHandler}
                onSubmitEditing={() => {submitHandler(text); setText('')}}
                clearButtonMode="always"
            />
            <TouchableOpacity 
                style={styles.addButton} 
                onPress={() => {submitHandler(text); setText('')}}
            >
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
        justifyContent: 'center'
    },
    textInput: {
        fontSize: 20,
        width: '80%',
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
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#a3d6ff',
        alignItems: 'center'
    },
    addButtonText: {
        color: '#a3d6ff',
        fontSize: 20,
        fontWeight: '500'
    }
});