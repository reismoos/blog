import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'
import { Redirect } from 'react-router-dom'

import classes from '../form.module.scss'
import { editUser } from '../forms-slice'

const EditUserForm = () => {
  const { isLogined, errorMessage, error, username, email, image } = useSelector((state) => state.user)

  const makeBody = (data) => {
    const body = { user: {} }
    if (data.username !== username && data.username) {
      body.user.username = data.username
    }
    if (data.email !== email && data.email) {
      body.user.email = data.email
    }
    if (data.password) {
      body.user.password = data.password
    }
    if (data.image !== image && data.image) {
      body.user.image = data.image
    }
    return body
  }

  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = (data) => {
    dispatch(editUser(makeBody(data)))
  }

  useMemo(() => {
    username ? setValue('username', username) : null
    email ? setValue('email', email) : null
    image ? setValue('image', image) : null
  }, [username, email, image])

  if (!isLogined) {
    return <Redirect to="/sign-in" />
  }

  return (
    <div className={classes['form']}>
      <h2 className={classes['form__title']}>Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username
          <input
            type="text"
            placeholder="Username"
            {...register('username', {
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
          {errors?.username && <div className={classes['form__error-message']}>{errors.username.message}</div>}
        </label>
        <label>
          Email address
          <input
            type="text"
            placeholder="Email address"
            {...register('email', {
              pattern: {
                value: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                message: 'Please, enter valid email.',
              },
            })}
          />
          {errors?.email && <div className={classes['form__error-message']}>{errors.email.message}</div>}
        </label>
        <label>
          New password
          <input
            type="password"
            placeholder="New password"
            {...register('password', {
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
        <label>
          Avatar image (url)
          <input
            type="text"
            placeholder="Url"
            {...register('image', {
              pattern: {
                value: /[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/gi,
                message: 'Please, enter valid url.',
              },
            })}
          />
          {errors?.url && <div className={classes['form__error-message']}>{errors.url.message}</div>}
        </label>
        {error ? <div className={classes['form__error-message']}>{errorMessage}</div> : null}
        <button className={classes['form__btn']}>Save</button>
      </form>
    </div>
  )
}

export default EditUserForm
