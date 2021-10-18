import appConfig from '@/app.config.json'
import axios from 'axios'

const client = axios.create({
  baseURL: appConfig.api.contact.url,
})

client.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

client.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

export default client
