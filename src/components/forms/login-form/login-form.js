import { useForm } from 'react-hook-form'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import classes from '../form.module.scss'
import { fetchForLogin } from '../forms-slice'

const SignInForm = () => {
  const isLogined = useSelector((state) => state.user.isLogined)
  const errorMessage = useSelector((state) => state.user.errorMessage)
  const error = useSelector((state) => state.user.error)

  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = (data) => {
    dispatch(fetchForLogin(data))
    reset()
  }

  if (isLogined) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    )
  }
  return (
    <div className={classes['form']}>
      <h2 className={classes['form__title']}>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Email address
          <input
            type="text"
            placeholder="Email address"
            {...register('email', {
              required: 'please, enter your email.',
              pattern: {
                value: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                message: 'Please, enter valid email.',
              },
            })}
          />
          {errors?.email && <div className={classes['form__error-message']}>{errors.email.message}</div>}
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Please, enter your password.',
              maxLength: {
                value: 40,
                message: 'Your password needs to be maximum 40 characters.',
              },
              minLength: {
                value: 6,
                message: 'Your password needs to be at least 6 characters.',
              },
            })}
          />
          {errors?.password && <div className={classes['form__error-message']}>{errors.password.message}</div>}
        </label>
        {error ? <div className={classes['form__error-message']}>{errorMessage}</div> : null}
        <button className={classes['form__btn']}>Login</button>
      </form>
      <p className={classes['form__after-form-text']}>
        Don’t have an account?<Link to="/sign-up"> Sign Up.</Link>
      </p>
    </div>
  )
}

export default SignInForm
