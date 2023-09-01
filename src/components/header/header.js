import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logOut } from '../forms/login-form/login-slice'
import { setStopEditing } from '../post/post-slice'

import classes from './header.module.scss'

const Header = () => {
  const isLogined = useSelector((state) => state.user.isLogined)
  return (
    <header className={classes.header}>
      <div className={classes['header__wrapper']}>
        <Link className={classes['header__title']} to="/">
          <h1>Realworld Blog</h1>
        </Link>
        {isLogined ? <LoginedHeaderBtns /> : <HeaderBtns />}
      </div>
    </header>
  )
}

const HeaderBtns = () => {
  return (
    <div>
      <Link to={'/sign-in'} className={classes['header__btn-sign-in']}>
        Sign In
      </Link>
      <Link to={'/sign-up'} className={classes['header__btn-sign-up']}>
        Sign Up
      </Link>
    </div>
  )
}

const LoginedHeaderBtns = () => {
  const { image, username } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const onLogOut = () => {
    dispatch(logOut())
  }

  return (
    <div className={classes['header__logined']}>
      <Link
        onClick={() => dispatch(setStopEditing())}
        to="/new-article"
        className={classes['header__btn-create-article']}
      >
        Create article
      </Link>
      <Link to="/profile" className={classes['header__user-info']}>
        <p className={classes['header__user-name']}>{username}</p>
        <img className={classes['header__user-logo']} src={image} alt="user logo" />
      </Link>
      <button onClick={onLogOut} className={classes['header__btn-log-out']}>
        Log Out
      </button>
    </div>
  )
}

export default Header
