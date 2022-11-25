import axios from 'axios'

const api = axios.create({
  baseURL: 'http://54.152.240.123:3333/api/v2/', // AT Vision 2.0
  // baseURL: 'http://192.168.15.150:5001/api/v2/', // localhost do PC na Visuri
  // baseURL: 'http://192.168.1.105:5001/api/v2/', // localhost do PC na Visuri 7 andar
  // baseURL: 'http://192.168.0.71:5001/api/v2/', // localhost do PC em casa
  // baseURL: 'http://192.168.169.137:5001/api/v2/', // localhost do PC na rede moto g8 power
})

export default api
