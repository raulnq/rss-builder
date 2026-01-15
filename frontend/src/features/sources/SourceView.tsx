import type { Source } from '../../types';

export type SourceViewProps = {
  source: Source;
};

export default function SourceView({ source }: SourceViewProps) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-2">{source.name}</h2>
      <p className="text-sm text-gray-500 mb-2 truncate">{source.url}</p>
      {source.syncedAt && (
        <p className="text-xs text-gray-400 mb-6">
          Last synced: {new Date(source.syncedAt).toLocaleString()}
        </p>
      )}
    </>
  );
}
