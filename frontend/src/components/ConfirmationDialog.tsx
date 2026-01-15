import type { PropsWithChildren } from 'react';

export interface ConfirmationDialogProps extends PropsWithChildren {
  title: string;
  message: string;
  onCancel: () => void;
}

export default function ConfirmationDialog({
  title,
  message,
  onCancel,
  children,
}: ConfirmationDialogProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
