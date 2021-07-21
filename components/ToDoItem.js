import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { XCircle } from 'react-native-feather'


export default function ToDoItem({ item, toggleHandler, pressHandler }) {

    return (
        <View style={styles.itemContainer}>
            <BouncyCheckbox
                fillColor="blue"
                unfillColor="#FFFFFF"
                iconStyle={{ borderColor: "blue" }}
                onPress={() => toggleHandler(item)}
            />
            <TouchableOpacity style={styles.item}>
                {item.toggle == false ? 
                <Text style={styles.itemText}>{item.title}</Text>
                :
                <Text style={styles.itemTextToggle}>{item.title}</Text>
                }
            </TouchableOpacity>
            <TouchableOpacity>
                <XCircle 
                    stroke="red"
                    fill="#fff"
                    width={28} 
                    height={28}
                    style={styles.icon} 
                    onPress={() => pressHandler(item.title, item.key)}
                    
                />
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
        alignItems: 'center'
    },
    item: {
        width: '75%',
        borderStyle: 'solid',
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'flex-start'
    },
    itemText: {
        padding: 10,
        fontSize: 17,
    },
    itemTextToggle: {
        padding: 10,
        fontSize: 17,
        color: 'grey',
        textDecorationLine: 'line-through', 
        textDecorationStyle: 'solid'
    },
    icon: {
        color: 'red',
        marginLeft: 10,
    }
});
