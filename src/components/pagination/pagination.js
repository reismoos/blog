import { Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { changePage } from '../posts-list/posts-slice'

const MyPagination = () => {
  const dispatch = useDispatch()
  const { postsCount, currentPage } = useSelector((state) => state.posts)
  useEffect(() => {
    const page = sessionStorage.getItem('page')
    page ? dispatch(changePage(+page)) : null
  }, [])
  const onChangePage = (page) => {
    dispatch(changePage(page))
    sessionStorage.setItem('page', page)
  }
  return (
    <Pagination
      current={currentPage}
      onChange={onChangePage}
      total={postsCount}
      showSizeChanger={false}
      style={{ textAlign: 'center', marginBottom: 10 }}
    />
  )
}

export default MyPagination
