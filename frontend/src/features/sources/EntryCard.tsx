import type { Entry } from '../../types';

export type EntryCardProps = {
  entry: Entry;
};

export default function EntryCard({ entry }: EntryCardProps) {
  return (
    <div key={entry.entryId} className="bg-white p-4 rounded-lg shadow">
      <a
        href={entry.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-blue-600 hover:underline"
      >
        {entry.name}
      </a>
      <div className="flex gap-4 mt-1 text-sm text-gray-500">
        {entry.author && <span>By {entry.author}</span>}
        <span>{new Date(entry.publishedAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
