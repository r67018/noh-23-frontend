<template>
  <v-container>
    <v-form @submit.prevent="onSubmit">
      <v-text-field
        v-model="user.loginId"
        label="ログインID"
      ></v-text-field>
      <v-text-field
        v-model="user.password"
        label="パスワード"
      ></v-text-field>
      <v-btn
        type="submit"
        color="primary"
      >
        <v-icon class="mr-1">{{ mdiSend }}</v-icon>
        ログイン
      </v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { mdiSend } from '@mdi/js'
import { User } from '~/types/user'

const user = ref<User>({
  id: '',
  loginId: '',
  password: '',
})

const onSubmit = () => {
  navigateTo('/')
}
</script>

<style scoped>
</style>