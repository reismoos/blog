import { Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { changePage } from '../posts-list/posts-slice'

const MyPagination = () => {
  const dispatch = useDispatch()
  const { postsCount, currentPage } = useSelector((state) => state.posts)
  const onChangePage = (page) => {
    dispatch(changePage(page))
  }
  return (
    <Pagination
      defaultCurrent={1}
      current={currentPage}
      onChange={onChangePage}
      total={postsCount}
      showSizeChanger={false}
      style={{ textAlign: 'center', marginBottom: 10 }}
    />
  )
}

export default MyPagination
