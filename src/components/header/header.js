import { Link } from 'react-router-dom'

import classes from './header.module.scss'

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes['header__wrapper']}>
        <Link to="/">
          <h1 className={classes['header__title']}>Realworld Blog</h1>
        </Link>
        <div>
          <button className={classes['header__btn-sign-in']}>Sign In</button>
          <button className={classes['header__btn-sign-up']}>Sign Up</button>
        </div>
      </div>
    </header>
  )
}

export default Header
