<template>
  <v-toolbar>
<!--    <v-row>-->
<!--      <v-col>-->
    <v-spacer></v-spacer>
        <v-text-field
          label="セット名"
          type="input"
          v-model="name"
          class="mt-6"
        ></v-text-field>
<!--      </v-col>-->
    <v-spacer />
<!--    <v-col class="d-flex">-->
      <button-upload-file
        label="画像から読み取る"
        :handle-change="handleRead"
      ></button-upload-file>
      <v-btn
        color="red"
        variant="elevated"
        @click="handleDelete"
      >
        <v-icon>{{ mdiTrashCan }}</v-icon>
        削除
        <slot name="delete"></slot>
      </v-btn>
      <v-btn
        color="primary"
        variant="elevated"
        @click="handleCreate"
      >
        <v-icon class="mr-2">{{ mdiSend }}</v-icon>
        作成
        <slot name="create"></slot>
      </v-btn>
<!--    </v-col>-->
<!--    </v-row>-->
  </v-toolbar>
</template>

<script setup lang="ts">
import { mdiTrashCan, mdiSend } from '@mdi/js'
import ButtonUploadFile from '~/components/ButtonUploadFile.vue'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  setName: string
  handleCreate: () => void
  handleDelete: () => void
  handleRead: (file: File) => Promise<void>
}>()
const emit = defineEmits<{
  (e: 'update:setName', setName: string): void
}>()

const name = useVModel(props, 'setName', emit)
</script>

<style scoped>
</style>