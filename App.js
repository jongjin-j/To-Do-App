import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import Header from './components/Header'
import ToDoItem from './components/ToDoItem'
import AddToDo from './components/AddToDo'

export default function App() {
  const [todos, setTodos] = useState([
    { title: 'Example To Do', key: '1', toggle: false },
    { title: 'Example To Do 2', key: '2', toggle: false },
    { title: 'Example To Do 3', key: '3', toggle: false }
  ])

  //const notChecked = todos.filter(todo => todo.toggle == false)
  //const checked = todos.filter(todo => todo.toggle == true)

  const newTodos = todos.sort((x, y) => x.toggle - y.toggle)

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

  const toggleHandler = async (item) => {
    // New List without the selected item
    const copyTodos = todos.filter(todo => todo.key != item.key)

    // Copy of selected item with reversed toggle
    const previous = todos.filter(todo => todo.key == item.key)
    const changedTodo = { title: item.title, key: item.key, toggle: !previous[0].toggle }
    const newTodos = [changedTodo, ...copyTodos]

    setTodos(newTodos)
  }

  const submitHandler = (text) => {
    if(text.length > 0){
      setTodos((previous) => {
        return [
          { title: text, key: Math.random().toString(), toggle: 'false' }, 
          ...previous
        ]
      })
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
        <View>
          <AddToDo submitHandler={submitHandler}/>
          <View style={styles.list}>
            <ScrollView>

              {newTodos.map(item => {
                return(
                  <View key={item.key}>
                    <ToDoItem item={item} toggleHandler={toggleHandler} pressHandler={pressHandler} />
                  </View>
                )
              })
              }
              
            </ScrollView>
            {todos.map((item) => {
              <Text>{item.title}</Text>
            })}
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100
  }
});
