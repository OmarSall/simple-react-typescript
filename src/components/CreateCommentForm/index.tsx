import { useCreateCommentForm } from './useCreateCommentForm';

export const CreateCommentForm = () => {
  const { handleSubmit, error, createdComments } = useCreateCommentForm();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Create your comment:</p>
        <input name="name" placeholder="name" />
        <input name="body" placeholder="body" />
        <p data-testid="comment-error">{error}</p>
        <button>Create comment</button>
      </form>
      <div>
        <p>Created comments:</p>
        {createdComments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.name}</p>
            <p>{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
