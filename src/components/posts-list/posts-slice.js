import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { useHttp } from '../../service/hooks/http.hook'

const initialState = {
  posts: [],
  currentPage: 1,
  postsCount: 0,
  loading: true,
  error: false,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (currentPage) => {
  const { request } = useHttp()
  return await request(`https://blog.kata.academy/api/articles?offset=${currentPage * 5 - 5}&limit=5`)
})

export const likePost = createAsyncThunk('post/like', async (slug) => {
  const { request } = useHttp()
  return await request(`https://blog.kata.academy/api/articles/${slug}/favorite`, 'POST')
})

export const unLikePost = createAsyncThunk('post/unlike', async (slug) => {
  const { request } = useHttp()
  return await request(`https://blog.kata.academy/api/articles/${slug}/favorite`, 'DELETE')
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false
      state.posts = action.payload.articles
      state.postsCount = action.payload.articlesCount
    })
    builder.addCase(fetchPosts.rejected, (state) => {
      state.error = true
    })
    builder.addCase(likePost.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.slug === action.payload.article.slug) {
          post.favorited = action.payload.article.favorited
          post.favoritesCount = action.payload.article.favoritesCount
        }
        return post
      })
    })
    builder.addCase(unLikePost.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.slug === action.payload.article.slug) {
          post.favorited = action.payload.article.favorited
          post.favoritesCount = action.payload.article.favoritesCount
        }
        return post
      })
    })
  },
})

const { actions, reducer } = postsSlice

export default reducer
export const { changePage } = actions
