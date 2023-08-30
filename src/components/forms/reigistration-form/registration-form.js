import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import classes from '../sign-form.module.scss'
import { registration } from '../login-form/login-slice'

const RegistrationForm = () => {
  const dispatch = useDispatch()
  const error = useSelector((state) => state.user.error)
  const errorMessage = useSelector((state) => state.user.errorMessage)
  let renderErrorMessage = null

  if (error) {
    renderErrorMessage = errorMessage.map((err, i) => (
      <div key={i} className={classes['sign-form__error-message']}>
        {err}
      </div>
    ))
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = (data) => {
    dispatch(registration(data))
    reset()
  }
  return (
    <div className={classes['sign-form']}>
      <h2 className={classes['sign-form__title']}>Create new account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username
          <input
            type="text"
            placeholder="Username"
            {...register('username', {
              required: 'please, enter username',
              maxLength: {
                value: 20,
                message: 'Maximum username length must be 20 characters',
              },
              minLength: {
                value: 3,
                message: 'Minimum username length must be 3 characters',
              },
            })}
          />
          {errors?.username && <div className={classes['sign-form__error-message']}>{errors.username.message}</div>}
        </label>
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
          {errors?.email && <div className={classes['sign-form__error-message']}>{errors.email.message}</div>}
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
          {errors?.password && <div className={classes['sign-form__error-message']}>{errors.password.message}</div>}
        </label>
        <label>
          Repeat Password
          <input
            type="password"
            placeholder="Password"
            {...register('repeatPassword', {
              required: 'Please, repeat your password.',
              validate: (val) => {
                if (watch('password') != val) {
                  return 'Passwords must match'
                }
              },
            })}
          />
          {errors?.repeatPassword && (
            <div className={classes['sign-form__error-message']}>{errors.repeatPassword.message}</div>
          )}
        </label>
        <div className={classes['sign-form__line']}></div>
        <label className={classes['sign-form__checkbox']}>
          I agree to the processing of my personal information
          <input
            type="checkbox"
            {...register('information', {
              required: 'You must agree with processing your personal infomation',
            })}
          ></input>
          {errors?.information && (
            <div className={classes['sign-form__error-message']}>{errors.information.message}</div>
          )}
        </label>
        {renderErrorMessage}
        <button className={classes['sign-form__btn']}>Create</button>
      </form>
      <p className={classes['sign-form__after-form-text']}>
        Already have an account? <Link to="/sign-in"> Sign In.</Link>
      </p>
    </div>
  )
}

export default RegistrationForm
