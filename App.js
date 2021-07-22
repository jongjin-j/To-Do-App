import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import Header from './components/Header'
import ToDoItem from './components/ToDoItem'
import AddToDo from './components/AddToDo'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
  const [todos, setTodos] = useState([])

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
      return jsonValue != null ? JSON.parse(jsonValue) : [{title: 'Example To Do', key: '1', toggle: false }];
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
    const changedTodo = { title: item.title, key: item.key, toggle: !previous[0].toggle }
    const newTodos = [changedTodo, ...copyTodos]
    const sortTodos = newTodos.sort((x, y) => x.toggle - y.toggle)

    setTodos(sortTodos)
    storeData(sortTodos)
  }

  const addHandler = (text) => {
    const newTodos = [{ title: text, key: Math.random().toString(), toggle: false }, ...todos]
    setTodos(newTodos)
    storeData(newTodos)
  }

  const submitHandler = (text) => {
    if(text.length > 0){
      addHandler(text)
    }
    else{
      Alert.alert('Field is empty', 'Please enter an item', [
        {text: 'Back'}
      ])
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
  }
});
