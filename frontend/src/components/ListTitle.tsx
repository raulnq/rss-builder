import type { PaginatedResponse } from '../types';

export type ListTitleProps<T> = {
  response: PaginatedResponse<T> | null;
  type: string;
};

export default function ListTitle<T>({ response, type }: ListTitleProps<T>) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold">
        {type} {response ? `(${response.totalItems})` : ''}
      </h3>
    </div>
  );
}
