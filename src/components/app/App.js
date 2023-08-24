import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Alert } from 'antd'

import Header from '../header/header'
import PostsList from '../posts-list/posts-list'
import MyPagination from '../pagination/pagination'
import './App.css'
import FullPost from '../post/full-post'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <PostsList />
          <MyPagination />
        </Route>
        <Route path="/articles/:slug">
          <FullPost />
        </Route>
        <Route path="*">
          <Alert message="Error" description="Something gone wrong! Try again later!" type="error" showIcon />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
