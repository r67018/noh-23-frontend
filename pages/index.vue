<template>
  <Toolbar
    v-model:set-name="setName"
    :handle-create="handleCreate"
    :handle-delete="handleDelete"
    :handle-read="handleRead"
  >
    <template #create>
      <v-snackbar v-model="snackbar">
        名前が入力されていないか、空欄のテキストエリアがあります
        <template v-slot:actions>
          <v-btn
            color="pink"
            @click="closeSnackbar"
          >
            閉じる
          </v-btn>
        </template>
      </v-snackbar>
    </template>
  </Toolbar>

  <v-progress-linear
    v-if="linerProgress"
    indeterminate
  ></v-progress-linear>

  <div>
    <v-container>
      <v-row
        v-for="(_, i) in sentences"
        :key="i"
        justify="center"
        class="d-flex flex-column mt-2 mx-2"
      >
        <div class="d-flex justify-space-between">
          <span>{{ `#${i+1}` }}</span>
          <v-icon
            @click="removeSentence(i)"
            size="large"
            class="mr-1"
          >{{ mdiClose }}</v-icon>
        </div>
        <v-textarea
          v-model="sentences[i]"
          rows="1"
          cols="50"
          auto-grow
        ></v-textarea>
      </v-row>
      <v-hover>
        <template v-slot:default="{ isHovering, props }">
          <v-row
            justify="center"
            @click="addSentence('')"
            :class="isHovering ? 'bg-grey-lighten-5' : undefined"
            v-bind="props"
          >
            <v-icon
              size="x-large"
              id="add-btn"
              class="ma-2"
            >
              {{ mdiPlusCircle }}
            </v-icon>
          </v-row>
        </template>
      </v-hover>
    </v-container>

    <DialogProgress
      :show="dialogProgress"
      :progress="ocrProgress"
    >
      画像から文章を読み取っています
    </DialogProgress>
  </div>
</template>

<script setup lang="ts">
import { mdiPlusCircle, mdiClose } from '@mdi/js'
import { useMutableArray } from '~/composables/useMutableArray'
import Toolbar from '~/components/Toolbar.vue'
import { Ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const setName: Ref<string> = ref('')
const { array: sentences, add: addSentence, remove: removeSentence } = useMutableArray<string>([''])
watchEffect(() => {
  if (sentences.value.length === 0) {
    addSentence('')
  }
})

const [snackbar, openSnackbar, closeSnackbar] = useBool()
const [dialogProgress, openDialogProgress, closeDialogProgress] = useBool()
const [linerProgress, showLinerProgress, hideLinerProgress] = useBool()
const ocrProgress: Ref<number> = ref(0)

// 読み取り
const recognizer = useOCR()
const handleRead = async (e: Event) => {
  if (e.target instanceof HTMLInputElement) {
    if (e.target.files) {
      const file = e.target.files[0]
      openDialogProgress()
      const { data: { text } } = await recognizer(file, {
        logger: m => {
          if (m.status === 'recognizing text') {
            ocrProgress.value = m.progress
          }
          console.log(m)
        },
      })
      if (sentences.value.length === 1 && sentences.value[0] === '') {
        sentences.value[0] = text
      } else {
        addSentence(text)
      }
      // 段落で分ける
      // const paragraphs = text.split(/\n{2,}/).map(v => v.trim().replaceAll('\n', ''))
      // console.log(paragraphs)
      // paragraphs.map(addSentence)
      closeDialogProgress()
      ocrProgress.value = 0
    }
  }
}

// 削除
const handleDelete = () => {
  sentences.value = ['']
}

// 作成
const formatSentences = () => {
  return sentences.value.map(v => v.trim())
}
const validateSentences = (sentences: string[]) => {
  return sentences.every(v => v !== '')
}
const handleCreate = async () => {
  const formattedSentences = formatSentences()
  if (!setName.value || !validateSentences(formattedSentences)) {
    openSnackbar()
    console.log('ng')
    return
  }

  console.log('ok')
  const body = {
    id: uuidv4(),
    name: setName.value,
    sentences: sentences.value,
  }
  showLinerProgress()
  await useApi('/cardset/create', {
    method: 'POST',
    body: body,
  })
  hideLinerProgress()
  navigateTo(`/cardset/${body.id}`)
}
</script>

<style scoped>
</style>