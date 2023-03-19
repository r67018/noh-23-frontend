<template>
  <v-toolbar>
    <v-spacer />
    <v-btn
      color="primary"
      variant="elevated"
      @click="handleSave"
    >
      保存
    </v-btn>
  </v-toolbar>
</template>

<script setup lang="ts">
defineProps<{
  handleSave: () => Promise<void>
}>()
</script>

<style scoped>
</style>