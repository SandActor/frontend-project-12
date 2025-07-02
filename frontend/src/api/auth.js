import axios from 'axios'

export const login = async (username, password) => {
  try {
    const response = await axios.post(`http://localhost:5002/api/v1/login`, { username, password })
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}