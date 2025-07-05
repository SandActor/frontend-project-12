import axios from 'axios'

export const login = async (username, password) => {
  try {
    const response = await axios.post(`http://localhost:5001/api/v1/login`, { username, password })
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}