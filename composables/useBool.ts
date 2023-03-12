import { Ref } from 'vue'

export const useBool: () => [
  Ref<boolean>,
  () => void,
  () => void
] = (init = false) => {
  const b = ref(init)

  const setTrue = (): void => {
    b.value = true
  }

  const setFalse = (): void => {
    b.value = false
  }

  return [b, setTrue, setFalse]
}
