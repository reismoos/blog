import format from 'date-fns/format'
import { Link } from 'react-router-dom'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

import classes from './post.module.scss'

const PostHeader = ({ data, fullPost }) => {
  const { tagList, title, favoritesCount, author, updatedAt, slug, description } = data
  const date = format(new Date(updatedAt), 'MMMM d, yyyy')
  const renderTags = tagList ? tagList.map((tag, i) => <Tag key={i} tag={tag} />) : null
  const titleH2 = <h2 className={classes['post-header__title']}>{title}</h2>
  const linkTitle = fullPost ? titleH2 : <Link to={`/articles/${slug}`}>{titleH2}</Link>
  return (
    <>
      <div className={classes['post-header']}>
        <div className={classes['post-header__left-colomn']}>
          <div className={classes['post-header__title-and-likes']}>
            {linkTitle}
            <span className={classes['post-header__likes']}> {favoritesCount}</span>
          </div>

          <div className={classes['post-header__tags']}>{renderTags}</div>
        </div>
        <div className={classes['post-header__right-colomn']}>
          <div className={classes['post-header__author-name']}>{author.username}</div>
          <div className={classes['post-header__post-date']}>{date}</div>
          <img src={author.image} alt="logo" className={classes['post-header__author-logo']} />
        </div>
      </div>
      <p className={classes['post__text']}>{description}</p>
    </>
  )
}

const Tag = ({ tag }) => {
  return <span className={classes['post-header__tag']}>{tag}</span>
}

const PostBody = ({ data }) => {
  const { body } = data
  return <ReactMarkdown className={classes['full-post__body']}>{body}</ReactMarkdown>
}

export { PostHeader, PostBody }
