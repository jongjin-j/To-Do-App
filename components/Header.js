import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>To Do List</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
      height: 60,
      backgroundColor: 'beige',
      alignItems: 'center',
    },
    title: {
        marginTop: 23,
        fontSize: 20,
        fontWeight: '600'
    }
});