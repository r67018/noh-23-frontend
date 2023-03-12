<template>
  <div>
    <v-dialog
      v-model="dialog"
      persistent
    >
      <v-card>
        <v-card-text class="d-flex flex-column align-center text-center">
          <slot></slot>
          <div>{{ progressPercentage }}%</div>
          <v-progress-circular
            :model-value="progressPercentage"
          ></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ComputedRef } from 'vue'

const props = defineProps<{
  show: boolean
  progress: number // 0 ~ 1
}>()

const dialog = ref(false)
watch(() => props.show, () => {
  dialog.value = props.show
})
const progressPercentage: ComputedRef<string> = computed(() => (props.progress * 100).toFixed())
</script>

<style scoped>
</style>