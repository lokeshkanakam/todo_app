import './App.css'

import React, { useState } from 'react'

const App = () => {

  const stringifiedTodosList = localStorage.getItem('todosList')
  const parsedTodosList = JSON.parse(stringifiedTodosList)
  const getData = () =>{
    if(parsedTodosList !== null){
      return parsedTodosList
    } else{
      return []
    }
  }
  
// set state for input text
  const [todoText, setTodoText] = useState({
    id:'',
    text:''
  })
  // set state for todo list
  const [todoList, setTodoList] = useState(getData())
  // set state for edit status
  const [editStatus, setEditStatus] = useState({
    id:'',
    isEdit: false
  })
  // handle add todo 
  const addTodo = e =>{
    e.preventDefault()
    const newTodo = {
      id: new Date().getTime().toString(),
      text: todoText.text,
      isChecked: false,
    }
     todoText.text.startsWith(' ') || todoText.text === "" ?  alert("Enter valid Todo") : setTodoList([...todoList, newTodo])
    
    setTodoText({
      id:'',
      text:''
    }) 
  }
// handle delete
  const onDelete = id =>{
    const newTodoList = todoList.filter(each => each.id !== id)
    setTodoList(newTodoList)
  }
// handle edit text to input field
  const onEdit = id =>{
    const editableTodo = todoList.find(each => each.id === id)
    setTodoText({
      id,
      text: editableTodo.text
    })
    setEditStatus({
      id,
      isEdit: true
    })
  }
// handle add edited todo to todo list
  const handleEdit = e =>{
    e.preventDefault()
    const newTodos = todoList.map(each => {
      if(each.id === editStatus.id){
        return {
          id: editStatus.id,
          text: todoText.text,
          isChecked: false
        }
      }
      return each
    })
    setTodoList(newTodos)
    setTodoText({
      id:'',
      text:''
    })
    setEditStatus({
      id:'',
      isEdit: false
    })
  }

  // handle save button to save data on local storage
  const saveTodos = () =>{
    localStorage.setItem("todosList", JSON.stringify(todoList))
    alert('Todos Saved Successfully')
  }
  // change todo Checked Statud

  const changeCheckedStatus = id =>{
    const newList = todoList.map(each =>{
      if (each.id === id){
        return{
          ...each,
          isChecked: !each.isChecked
        }
      } return each
    })
    setTodoList(newList)
  }

  return (
    <div className='App'>
      <form>
        <input type='text' name="todo text" placeholder='Enter Todo Here'
        value={todoText.text} onChange={e => setTodoText({text:e.target.value})}/>
        {editStatus.isEdit ? <button type='submit' onClick={handleEdit}>Edit</button>
          :<button type='submit' onClick={addTodo}>Add</button>}
      </form>
      <button className ="save-btn-sm" type='button' onClick={saveTodos}>Save</button>
      <hr/>
      <ul>
        {
         todoList.length !== 0 ?  todoList.map(each => (
          <li key={each.id}>
            <input type='checkbox' id={each.id} onClick={() => changeCheckedStatus(each.id)} checked={each.isChecked}/>
            <label htmlFor={each.id} className={each.isChecked && 'checked'}>{each.text}</label>
            <div>
            <button type='button' onClick={() => onEdit(each.id)}>Edit</button>
            <button type='button' onClick={() => onDelete(each.id)}>Delete</button>
            </div>
          </li>
        )) : <h2>No Todos Added</h2>
        }
      </ul>
      <button className ="save-btn-lg" type='button' onClick={saveTodos}>Save</button>
    </div>
  )
}

export default App
