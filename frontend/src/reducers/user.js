import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInformation: {
    accessToken: null,
    userId: null,
    name: null,
    messages: [],
    likes: [],
    errorMessage: null,
  }
}

export const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload
      state.userInformation.accessToken = accessToken
    },
    setUserId: (state, action) => {
      const { userId } = action.payload
      state.userInformation.userId = userId
    },
    setName: (state, action) => {
      const { name } = action.payload
      state.userInformation.name = name
    },
    setMessages: (state, action) => {
      const { messages } = action.payload
      state.userInformation.messages = messages
    },
    setLikes: (state, action) => {
      const { likes } = action.payload
      state.userInformation.likes = likes
    },
    logout: () => { return initialState }
  }
})

// Thunk to login
export const login = (email, password) => {
  const LOGIN_URL = 'http://localhost:8080/sessions'
  return (dispatch) => {
    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Kan inte logga in')
      })
      .then((json) => {
        dispatch(user.actions.setAccessToken({ accessToken: json.accessToken }))
        dispatch(user.actions.setUserId({ userId: json._id }))
        dispatch(user.actions.setName({ name: json.name }))
        dispatch(user.actions.setMessages({ messages: json.messages }))
        dispatch(user.actions.setLikes({ likes: json.likes }))
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}

// Thunk to sign up
export const signup = (
  name,
  email,
  password
) => {
  const SIGNUP_URL = 'http://localhost:8080/users'
  return (dispatch) => {
    fetch(SIGNUP_URL, {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Kunde inte registrera konto.')
        }
        return res.json()
      })
      .then((json) => {
        dispatch(user.actions.setAccessToken({ accessToken: json.accessToken }))
        dispatch(user.actions.setUserId({ userId: json._id }))
        dispatch(user.actions.setName({ name: json.name }))
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}