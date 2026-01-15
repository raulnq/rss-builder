import { Form } from 'react-router';

export type AddSourceFormProps = {
  isSubmitting: boolean;
};

export default function AddSourceForm({ isSubmitting }: AddSourceFormProps) {
  return (
    <Form method="post" className="flex gap-4 mb-6">
      <input type="hidden" name="intent" value="addSource" />
      <input
        type="text"
        name="name"
        placeholder="Source name"
        required
        className="flex-1 px-4 py-2 border rounded-lg"
      />
      <input
        type="url"
        name="url"
        placeholder="RSS feed URL"
        required
        className="flex-1 px-4 py-2 border rounded-lg"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        Add Source
      </button>
    </Form>
  );
}
