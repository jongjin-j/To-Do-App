import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Header from './components/Header'
import ToDoItem from './components/ToDoItem'
import AddToDo from './components/AddToDo'

export default function App() {

  const [todos, setTodos] = useState([
    { title: 'Example To Do', key: '1' }
  ])

  const pressHandler = (key) => {
    setTodos((previous) => {
      return previous.filter(todo => todo.key != key)
    })
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    marginTop: 10
  }
});
