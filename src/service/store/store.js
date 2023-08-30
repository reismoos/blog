import { configureStore } from '@reduxjs/toolkit'

import posts from '../../components/posts-list/posts-slice'
import post from '../../components/post/post-slice'
import user from '../../components/forms/login-form/login-slice'

export const store = configureStore({
  reducer: {
    posts,
    post,
    user,
  },
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== 'production',
})
