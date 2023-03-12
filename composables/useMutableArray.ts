import { Ref } from 'vue'

export const useMutableArray = <T>(init: T[] = []) => {
  const array = ref(init) as Ref<T[]>

  const add = (elem: T) => {
    array.value.push(elem)
  }

  const remove = (index: number) => {
    array.value.splice(index, 1)
  }

  return {
    array,
    add,
    remove,
  }
}
