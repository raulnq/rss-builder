import { Form } from 'react-router';

export type AddFeedFormProps = {
  isSubmitting: boolean;
};

export default function AddFeedForm({ isSubmitting }: AddFeedFormProps) {
  return (
    <Form method="post" className="flex gap-4 mb-6">
      <input type="hidden" name="intent" value="create" />
      <input
        type="text"
        name="name"
        placeholder="Feed name"
        required
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Creating...' : 'Create Feed'}
      </button>
    </Form>
  );
}
