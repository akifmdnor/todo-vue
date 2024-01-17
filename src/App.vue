<template>
  <div id="app" class="h-screen">
    <TodoList />
  </div>
</template>

<script lang="ts">
import TodoList from './views/TodoList.vue';

export default {
  name: 'App',
  components: {
    TodoList
  }
}
</script>

<style>
/* Global styles (if any) */
</style>