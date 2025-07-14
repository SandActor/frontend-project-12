import axios from 'axios'

export const login = async (username, password) => {
  try {
    const response = await axios.post(`/api/v1/login`,
      { username, password },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('username', response.data.username)
    return response.data
  }
  catch (error) {
    console.log(error)
    throw error
  }
}
