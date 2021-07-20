import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/Header'
import ToDoItem from './components/ToDoItem'
import AddToDo from './components/AddToDo'

export default function App() {

  const [todos, setTodos] = useState([
    { title: 'Example To Do', key: '1' }
  ])

  const pressHandler = (title, key) => {
    Alert.alert('Are you sure you want to delete the following?', `${title}`, [
      {text: 'Yes', onPress: () => 
        setTodos((previous) => {
          return previous.filter(todo => todo.key != key)
        })
      },
      {text: 'No'}
    ])
  }

  const submitHandler = (text) => {
    setTodos((previous) => {
      return [
        { title: text, key: Math.random().toString() }, 
        ...previous
      ]
    })
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
    }}>
      <View style={styles.container}>
        <Header/>
        <View>
          <AddToDo submitHandler={submitHandler}/>
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <ToDoItem item={item} pressHandler={pressHandler} />
              )}
            />
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
  }
});
