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
      height: '12%',
      backgroundColor: '#a58cdb',
      alignItems: 'center',
    },
    title: {
        marginTop: '13.5%',
        fontSize: 25,
        fontWeight: '600',
        color: 'white'
    }
});