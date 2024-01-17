<template>
  <li class="flex items-center justify-between p-3 mb-2 bg-gray-100 border border-gray-200 rounded">
    <button
      v-if="!todo.completed"
      @click="complete(todo.id)"
      class="px-3 py-1 text-2xl rounded text-emerald-500"
    > <i class="fa-solid fa-check"></i>
    </button>
    <div
    v-if="todo.completed"
      @click="complete(todo.id)"
      class="px-3 py-1 text-2xl rounded text-slate-500"
    >
     <i class="fa-solid fa-clipboard-check"></i>
  </div>
    {{ todo.name }}

    <button
      @click="deleteItem(todo.id)"
      class="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
    >
      <i class="fa-solid fa-trash"></i>
    </button>
  </li>
</template>

<script lang="ts">
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  emits: ['delete', 'complete'],
  methods: {
    deleteItem(id: number | undefined) {
      if (id !== undefined) {
        this.$emit('delete', id)
      }
    },
    complete(id: number | undefined) {
      if (id !== undefined) {
        this.$emit('complete', id)
      }
    }
  }
}
</script>
