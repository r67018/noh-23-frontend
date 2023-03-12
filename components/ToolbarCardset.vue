<template>
  <v-toolbar>
    <v-spacer />
    <v-btn
      color="red"
      variant="elevated"
    >
      <v-icon>{{ mdiTrashCan }}</v-icon>
      削除
    </v-btn>
<!--    <v-btn-->
<!--      color="yellow"-->
<!--      variant="elevated"-->
<!--    >-->
<!--      <v-icon>{{ mdiShare }}</v-icon>-->
<!--      共有-->
<!--    </v-btn>-->
    <v-btn
      color="primary"
      variant="elevated"
      @click="handleEdit"
    >
      <v-icon>{{ mdiBookEdit }}</v-icon>
      編集
    </v-btn>
  </v-toolbar>
</template>

<script setup lang="ts">
import { mdiTrashCan, mdiShare, mdiBookEdit } from '@mdi/js'

defineProps<{
  handleEdit: () => void
}>()
</script>

<style scoped>
</style>