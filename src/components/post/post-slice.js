import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd'

import { useHttp } from '../../service/hooks/http.hook'

const initialState = {
  post: {},
  loading: true,
  error: false,
  editing: false,
}

export const fetchPost = createAsyncThunk('post/fetchPost', async (slug) => {
  const { request } = useHttp()
  return await request(`https://blog.kata.academy/api/articles/${slug}`)
})

export const createPost = createAsyncThunk('post/createPost', async (data) => {
  const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${data[1]}`,
  }
  const { request } = useHttp()
  return await request('https://blog.kata.academy/api/articles', 'POST', JSON.stringify(data[0]), header)
})

export const editPost = createAsyncThunk('post/editPost', async (data) => {
  const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${data[1]}`,
  }
  const { request } = useHttp()
  return await request(`https://blog.kata.academy/api/articles/${data[2]}`, 'PUT', JSON.stringify(data[0]), header)
})

export const deletePost = createAsyncThunk('post/deletePost', async (data) => {
  const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${data[0]}`,
  }
  const { request } = useHttp()
  return await request(`https://blog.kata.academy/api/articles/${data[1]}`, 'DELETE', null, header)
})

const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setStartEditing: (state) => {
      state.editing = true
    },
    setStopEditing: (state) => {
      state.editing = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPost.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.loading = false
      state.post = action.payload.article
    })
    builder.addCase(fetchPost.rejected, (state) => {
      state.error = true
    })
    builder.addCase(editPost.fulfilled, () => {
      message.success('Success', [2])
    })
    builder.addCase(deletePost.fulfilled, () => {
      message.success('Success', [2])
    })
  },
})

const { actions, reducer } = postsSlice

export default reducer

export const { setStartEditing, setStopEditing } = actions
