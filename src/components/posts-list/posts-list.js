import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spin, Alert } from 'antd'

import PrePost from '../post/pre-post'

import classes from './posts-list.module.scss'
import { fetchPosts } from './posts-slice'

const PostsList = () => {
  const dispatch = useDispatch()

  const posts = useSelector((state) => state.posts.posts)
  const currentPage = useSelector((state) => state.posts.currentPage)
  const loading = useSelector((state) => state.posts.loading)
  const error = useSelector((state) => state.posts.error)

  useEffect(() => {
    dispatch(fetchPosts(currentPage))
  }, [currentPage])

  const postsForRender =
    posts.length && !error && !loading ? posts.map((post) => <PrePost data={post} key={post.slug} />) : null

  const renderSpinner = loading ? <Spin /> : null
  const renderError = error ? (
    <Alert message="Error" description="Something gone wrong! Try again later!" type="error" showIcon />
  ) : null

  return (
    <ul className={classes['posts-list']}>
      {renderSpinner}
      {renderError}
      {postsForRender}
    </ul>
  )
}

export default PostsList
