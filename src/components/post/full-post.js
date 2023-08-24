import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Spin, Alert } from 'antd'

import { fetchPost } from './post-slice'
import { PostHeader, PostBody } from './post-details'
import classes from './post.module.scss'

const FullPost = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()
  const post = useSelector((state) => state.post.post)
  const loading = useSelector((state) => state.post.loading)
  const error = useSelector((state) => state.post.error)
  useEffect(() => {
    dispatch(fetchPost(slug))
  }, [slug])

  const renderLoading = loading ? <Spin /> : null
  const renderError = error ? (
    <Alert message="Error" description="Something gone wrong! Try again later!" type="error" showIcon />
  ) : null
  const renderContent =
    !loading && !error ? (
      <>
        {<PostHeader data={post} fullPost={true} />}
        {<PostBody data={post} />}
      </>
    ) : null
  return (
    <div className={classes['full-post']}>
      {renderLoading}
      {renderError}
      {renderContent}
    </div>
  )
}

export default FullPost
