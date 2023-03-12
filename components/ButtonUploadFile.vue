<template>
  <v-btn
    color="secondary"
    variant="elevated"
  >
    <label>
      {{ label }}
      <input
        type="file"
        @change="handleChange"
      >
      <input>
    </label>
    <slot name="read"></slot>
  </v-btn>
</template>

<script setup lang="ts">

defineProps<{
  label: string
  handleChange: (file: File) => void
}>()
</script>

<style scoped>
input {
  display: none;
}
</style>