import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ToDoItem({ item, pressHandler }) {
    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity style={styles.item}>
                <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteItem} onPress={() => pressHandler(item.key)}>
                <Text style={styles.deleteItemText}>X</Text>
            </TouchableOpacity>
        </View>
        
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        marginHorizontal: 30,
        flexDirection: 'row',
        marginTop: 16,
    },
    item: {
        width: 200,
        borderStyle: 'solid',
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center'
    },
    deleteItem: {
        width: 40,
        marginLeft: 20,
        borderStyle: 'dotted',
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    itemText: {
        padding: 10,
    },
    deleteItemText: {
        color: 'red'
    }
});
