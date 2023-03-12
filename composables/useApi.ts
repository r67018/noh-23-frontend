import { UseFetchOptions } from '#app'

export const useApi = (request: any, opts?: UseFetchOptions<any>) => {
  return useFetch(request, { baseURL: 'http://c81e-220-98-199-219.ngrok.io/', ...opts})
  // const config = useRuntimeConfig()
  // return useFetch(request, { baseURL: config.public.baseURL, ...opts })
}
