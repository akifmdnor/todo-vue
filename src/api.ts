
import axios from 'axios'
import { TodoType } from './types'


const apiUrl = 'https://radiant-atoll-90845-e9a5ce57817b.herokuapp.com/todos' 

interface TodoResponse {
  data: TodoType[]
}

export const getTodos = async () => {
  try {
    const response = await axios.get<TodoResponse>(apiUrl+"/")
    return response.data.data
  } catch (error) {
    throw new Error('Error fetching todos: ' + error)
  }
}

export const addTodo = async (newTodoItem: TodoType) => {
  try {
    const response = await axios.post<TodoType>(apiUrl + '/', newTodoItem)
    return response.data
  } catch (error) {
    throw new Error('Error adding todo: ' + error)
  }
}

export const deleteTodo = async (id: number) => {
  try {
    await axios.delete(`${apiUrl}/${id}`)
  } catch (error) {
    throw new Error('Error deleting todo: ' + error)
  }
}

export const updateTodo = async (id: number, updatedTodo: TodoType) => {
  try {
    await axios.patch(`${apiUrl}/${id}`, updatedTodo)
  } catch (error) {
    throw new Error('Error updating todo: ' + error)
  }
}

