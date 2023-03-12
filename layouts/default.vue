<template>
  <div>
    <v-app-bar>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
      />
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      location="left"
    >
      <v-list nav>
        <v-list-item
          :prepend-icon="mdiPlusCircle"
          title="作成"
          to="/"
        >
        </v-list-item>
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-icon="mdiPencil"
              title="学習セット"
            >
            </v-list-item>
          </template>

          <v-list-item
            v-for="cardset in cardsets"
            :key="cardset.id"
            :prepend-icon="mdiCardMultiple"
            :title="cardset.name"
            :to="`/cardset/${cardset.id}`"
          >
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { mdiPlusCircle, mdiPencil, mdiCardMultiple } from '@mdi/js'
import { Cardset } from '~/types/card'

const drawer = ref(false)

const { data: cardsets } = await useApi('/cardset')
</script>

<style scoped>
</style>