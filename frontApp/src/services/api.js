// api.js, aqui usamos a rota que esta no .env para mais segurança na aplicação
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

export default api