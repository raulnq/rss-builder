import { Link } from 'react-router';

export type BackToButtonProps = {
  text: string;
  url: string;
};

export default function BackToButton({ text, url }: BackToButtonProps) {
  return (
    <Link to={url} className="text-blue-600 hover:underline mb-4 inline-block">
      {text}
    </Link>
  );
}
