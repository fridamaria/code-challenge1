import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInformation: {
    accessToken: null,
    userId: null,
    name: null,
    messages: [],
    likes: []
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
      state.userInformation.messages
    },
    setLikes: (state, action) => {
      const { likes } = action.payload
      state.userInformation.likes = likes
    },
    logout: () => { return initialState }
  }
})