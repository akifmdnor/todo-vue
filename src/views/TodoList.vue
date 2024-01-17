<template>
  <div id="todo-app" class="max-w-lg px-4 mx-auto">
    <h1 class="my-6 text-2xl font-semibold text-center text-gray-800">To-Do App</h1>

    <div class="flex border-b">
      <button
        class="px-4 py-2 text-gray-700 hover:text-blue-500"
        :class="{ 'border-b-2 border-blue-500': currentTab === 'all' }"
        @click="currentTab = 'all'"
      >
        All
      </button>
      <button
        class="px-4 py-2 text-gray-700 hover:text-blue-500"
        :class="{ 'border-b-2 border-blue-500': currentTab === 'completed' }"
        @click="currentTab = 'completed'"
      >
        Completed
      </button>
    </div>

    <ul class="p-0 list-none">
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @delete="deleteTodoItem"
        @complete="toggleComplete"
      />
    </ul>

    <div v-if="currentTab !== 'completed'" class="flex justify-between mb-4">
      <input
        v-model="newTodo"
        @keyup.enter="addTodoItem"
        placeholder="What needs to be done?"
        class="flex-grow p-2 mr-2 border-2 border-gray-200 rounded"
      />
      <button
        @click="addTodoItem"
        class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        <i class="fas fa-plus"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import TodoItem from '../components/TodoItem.vue'
import { TodoType } from '../types'
import { addTodo, deleteTodo, getTodos, updateTodo } from '../api'

export default defineComponent({
  components: { TodoItem },
  setup() {
    const newTodo = ref<string>('')
    const todos = ref<TodoType[]>([])
    const currentTab = ref<string>('all')

    const loadTodos = async () => {
      const data = await getTodos()
      todos.value = data
    }

    const addTodoItem = async () => {
      if (newTodo.value.trim() === '') return
      const newTodoItem = { name: newTodo.value, completed: false }

      try {
        await addTodo(newTodoItem)
        loadTodos()
        newTodo.value = ''
      } catch (error) {
        console.error(error)
      }
    }

    const deleteTodoItem = async (id: number) => {
      await deleteTodo(id)
      todos.value = todos.value.filter((todo) => todo.id !== id)
    }

    const toggleComplete = async (id: number) => {
      const todo = todos.value.find((todo) => todo.id === id)
      if (todo) {
        todo.completed = true
        await updateTodo(id, todo)
      }
    }

    onMounted(() => {
      loadTodos()
    })

    const filteredTodos = computed(() => {
      return currentTab.value === 'completed'
        ? todos.value.filter((todo) => todo.completed)
        : todos.value.filter((todo) => todo.completed === false)
    })

    return {
      newTodo,
      todos,
      addTodoItem,
      deleteTodoItem,
      toggleComplete,
      filteredTodos,
      currentTab
    }
  }
})
</script>
