import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker"


export default function DatePicker({ newDate, defaultDate, showPicker, pickerVisible, handleConfirm, hidePicker }) {
    return (
        <View style={styles.date}>
            <Text style={styles.default}>Date: </Text>
            <Text style={[newDate.date != defaultDate ? styles.afterInput : styles.input]}>
                {newDate.date.toString() != defaultDate ? 
                newDate.date.toString().substring(4, 15) : 
                newDate.date.toString()}
            </Text>
            <Button title="Select" onPress={showPicker}/>
            <DateTimePickerModal
                isVisible={pickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hidePicker}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    date: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      color: 'lightgrey',
      fontSize: 18,
      marginRight: 30,
      marginLeft: 10
    },
    afterInput: {
      color: 'black',
      fontSize: 18,
      marginRight: 30,
      marginLeft: 10
    },
    default: {
      fontSize: 18
    }
  });
