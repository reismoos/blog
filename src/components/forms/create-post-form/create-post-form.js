import { useForm } from 'react-hook-form'
import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router-dom'

import classes from '../form.module.scss'
import { createPost, editPost } from '../../post/post-slice'

const CreatePostForm = () => {
  const [tagIds, setTagIds] = useState([0])
  const isLogined = useSelector((state) => state.user.isLogined)
  const editing = useSelector((state) => state.post.editing)
  const post = useSelector((state) => state.post.post)
  const { slug } = useParams()

  const dispatch = useDispatch()
  const history = useHistory()

  const {
    register,
    handleSubmit,
    formState: { errors },
    unregister,
    setValue,
  } = useForm({
    mode: 'onBlur',
    shouldUnregister: true,
  })

  useMemo(() => {
    if (editing) {
      const arr = []
      post.tagList.forEach((tag, i) => {
        arr.push(i)
      })
      setTagIds(arr)
    }
  }, [])

  useMemo(() => {
    if (editing) {
      setValue('title', post.title)
      setValue('shortDescription', post.description)
      setValue('text', post.body)
      tagIds.forEach((tag, i) => {
        console.log(post.tagList[i])
        setValue(`tag${i}`, post.tagList[i])
      })
    }
  }, [tagIds])

  const onSubmit = (data) => {
    const tags = []
    for (let prop in data) {
      if (prop.includes('tag')) {
        tags.push(data[prop])
      }
    }
    const article = {
      article: {
        title: data.title,
        description: data.shortDescription,
        body: data.text,
        tagList: tags,
      },
    }
    if (editing) {
      dispatch(editPost([article, slug]))
    } else {
      dispatch(createPost(article))
    }

    history.push('/')
  }

  const deleteTag = (id) => {
    setTagIds((tagIds) => tagIds.filter((tagId) => (tagId !== id ? true : false)))
    unregister(`tag${id}`)
  }

  const addTag = () => {
    setTagIds((tagIds) => {
      return [...tagIds, tagIds[tagIds.length - 1] + 1]
    })
  }

  const tagsForRender = tagIds.map((tagId, i) => {
    const addTagBtn = i === tagIds.length - 1 ? true : false
    return (
      <Tag key={tagId} register={register} tagId={tagId} addTagBtn={addTagBtn} deleteTag={deleteTag} addTag={addTag} />
    )
  })

  if (!isLogined) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    )
  }

  return (
    <div className={`${classes['form']} ${classes['post']}`}>
      <h2 className={classes['form__title']}>Create new article</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Title
          <input
            type="text"
            placeholder="Title"
            {...register('title', {
              required: 'Please, enter title.',
              maxLength: {
                value: 100,
                message: 'Title needs to be maximum 100 characters.',
              },
            })}
          />
          {errors?.title && <div className={classes['form__error-message']}>{errors.title.message}</div>}
        </label>

        <label>
          Short description
          <input
            type="text"
            placeholder="Short description"
            {...register('shortDescription', {
              required: 'Please, enter short description.',
            })}
          />
          {errors?.shortDescription && (
            <div className={classes['form__error-message']}>{errors.shortDescription.message}</div>
          )}
        </label>

        <label>
          Text
          <textarea
            cols={115}
            rows={7}
            type="text"
            placeholder="text"
            {...register('text', {
              required: 'Please, enter short description.',
            })}
          />
          {errors?.shortDescription && (
            <div className={classes['form__error-message']}>{errors.shortDescription.message}</div>
          )}
        </label>

        {tagsForRender}

        <button className={classes['post__btn']}>Send</button>
      </form>
    </div>
  )
}

const Tag = (props) => {
  const { register, tagId, addTagBtn, deleteTag, addTag } = props
  return (
    <label className={classes['form__tag']}>
      <input
        type="text"
        placeholder="Tag"
        {...register(`tag${tagId}`, {
          maxLength: {
            value: 100,
            message: 'Tags needs to be maximum 100 characters.',
          },
        })}
      />
      {tagId ? (
        <button className={classes['form__tag-delete']} onClick={() => deleteTag(tagId)}>
          Delete
        </button>
      ) : null}
      {addTagBtn ? (
        <button className={classes['form__tag-add']} onClick={addTag}>
          Add tag
        </button>
      ) : null}
    </label>
  )
}

export default CreatePostForm
