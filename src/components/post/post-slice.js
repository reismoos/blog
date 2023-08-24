import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { useHttp } from '../../service/hooks/http.hook'

const initialState = {
  post: {},
  loading: true,
  error: false,
}

export const fetchPost = createAsyncThunk('post/fetchPost', async (slug) => {
  const { request } = useHttp()
  console.log('request slug')
  return await request(`https://blog.kata.academy/api/articles/${slug}`)
})

const postsSlice = createSlice({
  name: 'post',
  initialState,
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
  },
})

const { actions, reducer } = postsSlice

export default reducer
export const { changePage, setMaxPage } = actions
