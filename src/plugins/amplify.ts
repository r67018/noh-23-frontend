import { Amplify } from 'aws-amplify'
import '@aws-amplify/ui-vue'
import awsExports from '~/aws-exports'

export default defineNuxtPlugin(() => {
  Amplify.configure(awsExports)
})
