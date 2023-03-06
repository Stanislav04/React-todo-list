import './App.css'
import { useState } from 'react'
import FormCreator from './components/todo-creator/todo-creator'
import TodoItem from './components/todo-item/todo-item'

function App() {
  let [todos, addTodos] = useState([]);
  let [finishedTodos, finishTodos] = useState([]);

  const todosHook = [todos, addTodos]
  const finishedTodosHook = [finishedTodos, finishTodos]

  const addTodo = (title) => addTodos([...todos, { title }])
  const removeTodo = (index, [todoList, updateFunc]) => {
    return () => {
      todoList.splice(index, 1)
      updateFunc([...todoList])
    }
  }
  const updateTitle = (index, [todoList, updateFunc]) => {
    return (newTitle) => {
      todoList[index].title = newTitle
      updateFunc([...todoList])
      console.log("Hello")
    }
  }
  const moveTodo = (index, { oldHook: [oldList, oldUpdateFunc], newHook: [newList, newUpdateFunc] }) => {
    return () => {
      const [todo] = oldList.splice(index, 1)
      newUpdateFunc([...newList, todo])
      oldUpdateFunc([...oldList])
    }
  }

  return (
    <div className="App">
      <h1 className="page-title">Todo list</h1>
      <FormCreator createTodo={addTodo} />
      <section className="column-container">
        <ul className="column | todo">
          {
            todos.map((todo, index) => {
              return (
                <TodoItem key={index} title={todo.title} checked={false} deleteItem={removeTodo(index, todosHook)} updateTitle={updateTitle(index, todosHook)} moveItem={moveTodo(index, { oldHook: todosHook, newHook: finishedTodosHook })} />
              );
            })
          }
        </ul>
        <ul className="column | done">
          {
            finishedTodos.map((todo, index) => {
              return (
                <TodoItem key={index} title={todo.title} checked={true} deleteItem={removeTodo(index, finishedTodosHook)} updateTitle={updateTitle(index, finishedTodosHook)} moveItem={moveTodo(index, { oldHook: finishedTodosHook, newHook: todosHook })} />
              );
            })
          }
        </ul>
      </section>
    </div>
  )
}

export default App
