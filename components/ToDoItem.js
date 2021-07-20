import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { AntDesign } from '@expo/vector-icons'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default function ToDoItem({ item, pressHandler }) {

    return (
        <View style={styles.itemContainer}>
            <BouncyCheckbox
                fillColor="blue"
                unfillColor="#FFFFFF"
                iconStyle={{ borderColor: "blue" }}
            />
            <TouchableOpacity style={styles.item}>
                <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <AntDesign name="delete" style={styles.icon} onPress={() => pressHandler(item.title, item.key)}/>
            </TouchableOpacity>
        </View>
        
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        marginHorizontal: 40,
        flexDirection: 'row',
        marginTop: 16,
        justifyContent: 'flex-start',
    },
    item: {
        width: '70%',
        borderStyle: 'solid',
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'flex-start'
    },
    itemText: {
        padding: 10,
        fontSize: 17
    },
    icon: {
        fontSize: 30,
        color: 'red',
        marginLeft: 15,
        marginTop: '10%'
    }
});
