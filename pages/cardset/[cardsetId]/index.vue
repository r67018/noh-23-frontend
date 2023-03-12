<template>
  <ToolbarCardset
    :handle-edit="handleEdit"
  >
  </ToolbarCardset>
  <v-container>
    <v-carousel>
      <v-carousel-item
        v-for="(card, i) in cardset.cards"
        :key="i"
        class="d-flex justify-center align-center"
      >
        <QuestionCard :card="card">
        </QuestionCard>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script setup lang="ts">
import { Cardset } from '~/types/card'
import { Ref } from 'vue'
import ToolbarCardset from '~/components/ToolbarCardset.vue'

const route = useRoute()

const id = route.params.cardsetId
console.log(id)
const { data: cardset } = await useApi(`/cardset/${id}`)
// const cardset: Ref<Cardset> = ref({
//     id: '',
//     name: '',
//     cards: [
//       {
//         question: 'question1',
//         answer: 'answer1',
//       },
//       {
//         question: 'question2',
//         answer: 'answer2',
//       },
//     ]
// })

const handleEdit = () => {
  navigateTo(`/cardset/${cardset.value.id}/edit`)
}
</script>

<style scoped>
</style>