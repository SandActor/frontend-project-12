import axios from 'axios'

export const login = async (username, password) => {
  try {
    const response = await axios.get(`/api/v1/login`, { username, password })
    localStorage.setItem('authToken', response.data.token);
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}