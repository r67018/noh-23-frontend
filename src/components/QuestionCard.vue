<template>
  <div
    :class="{ 'is-answer': showAnswer, 'is-question': !showAnswer }"
    @click="showAnswer = !showAnswer"
    class="card d-flex justify-center align-center text-h4"
  >
    <v-card
      elevation="10"
      min-height="300px"
      class="question d-flex justify-center align-center text-center pa-3"
    >
      {{ card.question }}
    </v-card>
    <v-card
      elevation="10"
      min-height="300px"
      class="answer d-flex justify-center align-center text-center pa-3"
    >
      {{ card.answer }}
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { Card } from '~/types/card'

defineProps<{
  card: Card
}>()

const showAnswer = ref(false)
</script>

<style scoped>
.card {
  position: relative;
}

.question {
  width: 80%;
}
.answer {
  backface-visibility: hidden;
  position: absolute;
  width: 80%;
}

/* 表面の表示 */
.is-question .question {
  opacity: 1;
  transform: rotateY(0deg);
  transition:
    opacity 100ms 150ms,
    transform 300ms 150ms;
}
.is-question .answer {
  opacity: 0;
  transform: rotateY(90deg);
  transition:
    opacity 50ms 200ms,
    transform 300ms;
}

/* 裏面の表示 */
.is-answer .question {
  opacity: 0;
  transform:rotateY(90deg);
  transition:
    opacity 50ms 200ms,
    transform 300ms;
}
.is-answer .answer {
  opacity: 1;
  transform:rotateY(0deg);
  transition:
    opacity 100ms 150ms,
    transform 300ms 150ms;
}

/*.flip {*/
/*  animation: flip 2s linear infinite;*/
/*  font-size: 3em;*/
/*}*/

/*@keyframes flip {*/
/*  0% {*/
/*    transform: rotateY(0deg);*/
/*  }*/
/*  100% {*/
/*    transform: rotateY(360deg);*/
/*  }*/
/*}*/

/*.question,*/
/*.answer {*/
/*  -webkit-answerface-visibility: hidden;*/
/*  answerface-visibility: hidden;*/
/*}*/

/*.answer {*/
/*  transform: rotateY(180deg);*/
/*}*/
</style>