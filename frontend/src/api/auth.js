import axios from 'axios'

const API_URL = 'http://localhost:4000' // Замените на адрес вашего сервера

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password })
    return response.data
  } catch (error) {
    throw error
  }
}