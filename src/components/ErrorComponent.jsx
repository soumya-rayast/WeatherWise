import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorComponent = ({ message }) => {
  return (
    <div className="bg-red-100 p-4 mt-4 rounded-lg text-red-700 flex items-center gap-2">
      <AlertCircle size={20} />
      <p>{message}</p>
    </div>
  );
};

export default ErrorComponent;
