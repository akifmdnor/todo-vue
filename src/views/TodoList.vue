<template>
  <div id="todo-app" class="max-w-lg mx-auto px-4">
    <h1 class="text-center text-2xl text-gray-800 font-semibold my-6">To-Do App</h1>

     <div class="flex border-b">
      <button 
        class="py-2 px-4 text-gray-700 hover:text-blue-500"
        :class="{ 'border-b-2 border-blue-500': currentTab === 'all' }"
        @click="currentTab = 'all'">
        All
      </button>
      <button 
        class="py-2 px-4 text-gray-700 hover:text-blue-500"
        :class="{ 'border-b-2 border-blue-500': currentTab === 'completed' }"
        @click="currentTab = 'completed'">
        Completed
      </button>
    </div>
    
    <ul class="list-none p-0">
      <li v-for="(todo, index) in todos" :key="index" 
          class="bg-gray-100 border border-gray-200 p-3 mb-2 flex justify-between items-center rounded">
        {{ todo.text }}
        <button @click="deleteTodo(index)" 
                class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">
          Delete
        </button>
      </li>
    </ul>
    <div class="flex justify-between mb-4">
      <input v-model="newTodo" @keyup.enter="addTodo" 
             placeholder="What needs to be done?" 
             class="flex-grow p-2 border-2 border-gray-200 rounded mr-2">
      <button @click="addTodo" 
              class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
        Add
      </button>
    </div>
    
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'TodoList',
  setup() {
    const newTodo = ref('')
    const todos = ref<{ text: string; completed: boolean }[]>([])
    const currentTab = ref('all')

    const addTodo = () => {
      if (newTodo.value.trim() === '') return
      todos.value.push({ text: newTodo.value, completed: false })
      newTodo.value = ''
    }

    const deleteTodo = (index: number) => {
      todos.value.splice(index, 1)
    }

    const toggleComplete = (index: number) => {
      const todo = todos.value[index]
      todo.completed = !todo.completed
    }

    const filteredTodos = computed(() => {
      return currentTab.value === 'completed'
        ? todos.value.filter(todo => todo.completed)
        : todos.value
    })

    return { newTodo, todos, addTodo, deleteTodo, toggleComplete, filteredTodos, currentTab }
  }
})
</script>

