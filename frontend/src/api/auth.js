import axios from 'axios'

export const login = async (username, password) => {
  try {
    const response = await axios.post(`/api/v1/login`, 
      { username, password },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}