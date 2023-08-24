import classes from './post.module.scss'
import { PostHeader } from './post-details'

const PrePost = ({ data }) => {
  return <li className={classes['pre-post']}>{<PostHeader data={data} />}</li>
}

export default PrePost
