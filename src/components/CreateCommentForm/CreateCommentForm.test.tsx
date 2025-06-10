import { fireEvent, render } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import { CreateCommentForm } from './index';
import { createComment } from '../../shared/api/commentsApi';
import { describe, expect, it, beforeEach } from 'vitest';

vi.mock('../../shared/api/commentsApi', () => ({
  createComment: vi.fn(),
}));

describe('The CreateCommentForm', () => {
  beforeEach(() => {
    (createComment as Mock).mockReturnValue(new Promise(() => null));
  });
  describe('when the user types the name and the body', () => {
    it('should make attempt to create the POST request', () => {
      const createCommentForm = render(<CreateCommentForm />);

      const nameInput = createCommentForm.getByPlaceholderText('name');
      const bodyInput = createCommentForm.getByPlaceholderText('body');

      const name = 'Comment name';
      const body = 'Comment body';

      fireEvent.change(nameInput, { target: { value: name } });
      fireEvent.change(bodyInput, { target: { value: body } });

      const button = createCommentForm.getByRole('button');

      fireEvent.click(button);

      expect(createComment).toBeCalledWith({
        name,
        body,
      });
    });
  });

  describe('when the comment is created successfully', () => {
    it('should display the new comment in the list', async () => {
      const newComment = {
        id: 1,
        name: 'Test Comment',
        body: 'Test body',
      };

      (createComment as Mock).mockResolvedValue(newComment);

      const createCommentForm = render(<CreateCommentForm />);

      const nameInput = createCommentForm.getByPlaceholderText('name');
      const bodyInput = createCommentForm.getByPlaceholderText('body');

      fireEvent.change(nameInput, { target: { value: newComment.name } });
      fireEvent.change(bodyInput, { target: { value: newComment.body } });

      const button = createCommentForm.getByRole('button');

      fireEvent.click(button);

      const nameParagraph = await createCommentForm.findByText(newComment.name);
      const bodyParagraph = await createCommentForm.findByText(newComment.body);

      expect(nameParagraph).toBeDefined();
      expect(bodyParagraph).toBeDefined();
    });
  });

  describe('when there is an error when creating the comment', () => {
    it('should display the error message', async () => {
      (createComment as Mock).mockRejectedValue(new Error('API error'));

      const createCommentForm = render(<CreateCommentForm />);

      const nameInput = createCommentForm.getByPlaceholderText('name');
      const bodyInput = createCommentForm.getByPlaceholderText('body');

      fireEvent.change(nameInput, { target: { value: 'Error Test' } });
      fireEvent.change(bodyInput, { target: { value: 'Error Body' } });

      const button = createCommentForm.getByRole('button');

      fireEvent.click(button);

      const errorParagraph =
        await createCommentForm.findByTestId('comment-error');

      expect(errorParagraph.textContent).toBe(
        'Something went wrong when creating the comment',
      );
    });
  });
});