import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, TouchableWithoutFeedback, Keyboard, ScrollView, Button, Text } from 'react-native';
import Header from './components/Header'
import ToDoItem from './components/ToDoItem'
import AddToDo from './components/AddToDo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DateTimePickerModal from "react-native-modal-datetime-picker"


export default function App() {
  const defaultDate = 'Select a date...'

  const [todos, setTodos] = useState([])
  const [pickerVisible, setPickerVisible] = useState(false)
  const [newDate, setNewDate] = useState({date: defaultDate})
  

  const showPicker = () => {
    setPickerVisible(true)
  }

  const hidePicker = () => {
    setPickerVisible(false)
  }

  const handleConfirm = (date) => {
    setNewDate({date: date})
    hidePicker()
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('todos', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('todos')
      const json = JSON.parse(jsonValue)

      if(jsonValue == null || !json[0].date){
        return [{title: 'Example To Do', key: '1', toggle: false, date: new Date()}]
      }
      else{
        return json
      }
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    async function fetchTodos(){
      const response = await getData()
      setTodos(response)
    }
   
    fetchTodos()
  }, [])


  const deleteHandler = (key) => {
    const newTodos = todos.filter(todo => todo.key != key)
    setTodos(newTodos)
    storeData(newTodos)
  }

  const pressHandler = (title, key) => {
    Alert.alert('Are you sure you want to delete the following?', `${title}`, [
      {text: 'No'},
      {text: 'Yes', onPress: () => 
        deleteHandler(key)
      }
    ])
  }

  const toggleHandler = async (item) => {
    // New List without the selected item
    const copyTodos = todos.filter(todo => todo.key !== item.key)

    // Copy of selected item with reversed toggle
    const previous = todos.filter(todo => todo.key === item.key)
    const changedTodo = { title: item.title, key: item.key, toggle: !previous[0].toggle, date: item.date }
    const newTodos = [changedTodo, ...copyTodos]
    const sortByDateTodos = newTodos.sort((x, y) => new Date(x.date) - new Date(y.date))
    const sortByToggle = sortByDateTodos.sort((x, y) => x.toggle - y.toggle)

    setTodos(sortByToggle)
    storeData(sortByToggle)
  }

  const addHandler = (text, date) => {
    const newTodos = [{ title: text, key: Math.random().toString(), toggle: false, date: date }, ...todos]
    const sortTodos = newTodos.sort((x, y) => new Date(x.date) - new Date(y.date))
    setTodos(sortTodos)
    storeData(sortTodos)
  }

  const submitHandler = (text) => {
    if(text.length === 0){
      Alert.alert('Text field is empty', 'Please enter an item', [
        {text: 'Back'}
      ])
    }
    if(newDate.date === defaultDate){
      Alert.alert('Date field is empty', 'Please select a date', [
        {text: 'Back'}
      ])
    }
    else{
      addHandler(text, newDate.date)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
    }}>
      <View style={styles.container}>
        <Header/>
        <View style={styles.container2}>
          <AddToDo submitHandler={submitHandler}/>
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
          <View style={styles.list}>
            <ScrollView>
              {!todos ? null : 
                todos.map(item => {
                  return(
                    <View key={item.key}>
                      <ToDoItem item={item} toggleHandler={toggleHandler} pressHandler={pressHandler} />
                    </View>
                  )
                })
              }
            </ScrollView>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    marginTop: 0
  },
  container2: {
    alignItems: 'center'
  },
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
