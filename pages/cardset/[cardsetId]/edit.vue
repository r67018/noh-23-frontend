<template>
  <ToolbarCardsetEdit
    :handle-save="handleSave"
  ></ToolbarCardsetEdit>

  <v-progress-linear
    v-if="linerProgress"
    indeterminate
  ></v-progress-linear>

  <v-container>
    <v-row>
      <v-col>
        <v-textarea
          label="問題"
          v-model="editingCard.question"
        ></v-textarea>
      </v-col>
      <v-col>
        <v-textarea
          label="解答"
          v-model="editingCard.answer"
          auto-grow
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-pagination
        v-model="currentCardIndex"
        :length="cardset.cards.length"
      ></v-pagination>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { Card } from '~/types/card'
import { Ref } from 'vue'

const route = useRoute()
const [linerProgress, showLinerProgress, hideLinerProgress] = useBool()

const id = route.params.cardsetId
const { data: cardset } = await useApi(`/cardset/${id}`)

const currentCardIndex: Ref<number> = ref(1)
const editingCard: Ref<Card> = ref(cardset.value.cards[0])
watch(currentCardIndex, () => {
  editingCard.value = cardset.value.cards[currentCardIndex.value - 1]
})

const validateCards = (): boolean => {
  return cardset.value.cards.every(v =>
    (v.answer !== '') && (v.question !== '')
  )
}
const handleSave = async () => {
  if (!validateCards()) {
    return
  }
  showLinerProgress()
  await useApi(`/cardset/${id}/edit`, {
    method: 'PUT',
    body: cardset.value,
  })
  hideLinerProgress()
  navigateTo(`/cardset/${id}`)
}
</script>

<style scoped>
</style>