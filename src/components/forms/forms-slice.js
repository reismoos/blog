import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd'

import { useHttp } from '../../service/hooks/http.hook'

const initialState = {
  isLogined: false,
  loading: true,
  image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
  error: false,
}

export const fetchForLogin = createAsyncThunk('login/fetchLogin', async (data) => {
  const body = { user: data }
  const { request } = useHttp()
  return await request('https://blog.kata.academy/api/users/login', 'POST', JSON.stringify(body))
})

export const registration = createAsyncThunk('register', async (data) => {
  const body = {
    user: {
      username: data.username,
      email: data.email.toLowerCase(),
      password: data.password,
    },
  }

  const { request } = useHttp()

  return await request('https://blog.kata.academy/api/users', 'POST', JSON.stringify(body))
})

export const editUser = createAsyncThunk('user/editUser', async (data) => {
  const { request } = useHttp()

  return await request('https://blog.kata.academy/api/user', 'PUT', JSON.stringify(data))
})

export const logiByToken = createAsyncThunk('user/loginByToken', async () => {
  const { request } = useHttp()
  return await request('https://blog.kata.academy/api/user')
})

const setUserToState = (state, data) => {
  state.error = false
  state.loading = false
  state.isLogined = true
  for (let prop in data) {
    state[prop] = data[prop]
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      state.isLogined = false
      state.image = ''
      state.username = ''
      state.email = ''
      state.token = ''
      sessionStorage.removeItem('blogToken')
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchForLogin.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchForLogin.fulfilled, (state, action) => {
      sessionStorage.setItem('blogToken', action.payload.user.token)
      setUserToState(state, action.payload.user)
    })
    builder.addCase(fetchForLogin.rejected, (state, action) => {
      state.errorMessage = `email or password ${JSON.parse(action.error.message)['email or password']}`
      state.error = true
    })
    builder.addCase(registration.fulfilled, (state, action) => {
      sessionStorage.setItem('blogToken', action.payload.user.token)
      setUserToState(state, action.payload.user)
    })
    builder.addCase(registration.rejected, (state, action) => {
      const err = JSON.parse(action.error.message)
      const message = []
      for (let prop in err) {
        message.push(`${prop} ${err[prop]}`)
      }
      state.errorMessage = message
      state.error = true
    })
    builder.addCase(editUser.fulfilled, (state, action) => {
      setUserToState(state, action.payload.user)
      message.success('Success', [2])
    })
    builder.addCase(editUser.rejected, (state, action) => {
      const err = JSON.parse(action.error.message)
      const message = []
      for (let prop in err) {
        message.push(`${prop} ${err[prop]}`)
      }
      state.errorMessage = message
      state.error = true
      message.error('Error', [2])
    })
    builder.addCase(logiByToken.fulfilled, (state, action) => {
      setUserToState(state, action.payload.user)
    })
  },
})

const { actions, reducer } = userSlice

export default reducer
export const { logOut } = actions
