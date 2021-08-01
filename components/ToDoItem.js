import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Modal, TextInput } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { XCircle } from 'react-native-feather'


export default function ToDoItem({ item, toggleHandler, pressHandler, editHandler }) {

    const dateString = JSON.stringify(item.date)

    const [ title, setTitle ] = useState(item.title)
    const [ modalOn, setModalOn ] = useState(false)

    const stringDate = (date) => {
        if(date[0] == '0'){
            return date.substring(1, date.length).replace('-', '/')
        }
    }

    const changeHandler = (value) => {
        setTitle(value)
    }

    return (
        <View style={styles.itemContainer}>
            <BouncyCheckbox
                fillColor="blue"
                unfillColor="#FFFFFF"
                iconStyle={{ borderColor: "blue" }}
                onPress={() => toggleHandler(item)}
            />
            <TouchableOpacity style={styles.item} onPress={() => setModalOn(true)}>
                {item.toggle == false ? 
                <Text style={styles.itemText}>{stringDate(dateString.substring(6, 11))} {item.title}</Text>
                :
                <Text style={styles.itemTextToggle}>{stringDate(dateString.substring(6, 11))} {item.title}</Text>
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
            <Modal
                animationType='fade'
                visible={modalOn}
                onRequestClose={() => setModalOn(false)}
                style={styles.container}
            >
                <View style={styles.modal}>
                    <Text style={styles.editText}>Edit item: </Text>
                    <TextInput
                        value={title}
                        onChangeText={changeHandler}
                        style={styles.inputText}
                        onSubmitEditing={() => {editHandler(item, title); setModalOn(false);}}
                    />
                    <View style={styles.border}/>
                    <TouchableOpacity style={styles.button} onPress={() => {editHandler(item, title); setModalOn(false);}}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                </View>
                
            </Modal>
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
    editText: {
        fontSize: 20,
        fontWeight: '500'
    },
    inputText: {
        fontSize: 20,
        fontWeight: '400',
        marginTop: 25,
    },
    border: {
        borderColor: 'black',
        borderWidth: 0.6,
        width: 200,
        marginTop: 2
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
        marginLeft: 10
    },
    modal: {
        marginTop: 310,
        alignItems: 'center',
    },
    button: {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
        width: 80,
        height: 30,
        marginTop: 15,
        borderRadius: 15
    },
    buttonText: {
        color: 'white',
        alignSelf: 'center',
        fontWeight: '700',
        fontSize: 16,
    }
});
