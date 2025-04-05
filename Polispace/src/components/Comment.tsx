import { CommentInterface } from "src/datamodels";

function Comment(props: { commentData: CommentInterface }) {
  return <div>{props.commentData.authorId}</div>;
}

export default Comment;
