export type UnableToLoadViewProps = {
  title: string;
};

export default function UnableToLoadView({ title }: UnableToLoadViewProps) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <p className="text-gray-500">Unable to load. Please try again later.</p>
    </>
  );
}
