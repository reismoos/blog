import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Alert } from 'antd'
import { useDispatch } from 'react-redux'

import Header from '../header/header'
import PostsList from '../posts-list/posts-list'
import MyPagination from '../pagination/pagination'
import './App.css'
import FullPost from '../post/full-post'
import SignInForm from '../forms/login-form/login-form'
import RegistrationForm from '../forms/reigistration-form/registration-form'
import EditUserForm from '../forms/edit-user-form/edit-user-form'
import { logiByToken } from '../forms/login-form/login-slice'

function App() {
  const dispatch = useDispatch()
  const token = sessionStorage.getItem('blogToken')
  token ? dispatch(logiByToken(token)) : null
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
        <Route path="/sign-in">
          <SignInForm />
        </Route>
        <Route path="/sign-up">
          <RegistrationForm />
        </Route>
        <Route path="/profile">
          <EditUserForm />
        </Route>
        <Route path="*">
          <Alert message="Error" description="Something gone wrong! Try again later!" type="error" showIcon />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
