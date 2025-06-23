import axios from 'axios'

const API_URL = 'https://your-server.com/api' // Замените на адрес вашего сервера

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password })
    return response.data
  } catch (error) {
    throw error
  }
}