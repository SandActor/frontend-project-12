import axios from 'axios'

const API_URL = 'http://0.0.0.0:5001'

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/login`, { username, password })
    return response.data
  } catch (error) {
    throw error
  }
}