import React from 'react';
import { Upload } from 'lucide-react';

interface JsonInputProps {
  value: string;
  onChange: (value: string) => void;
  onFileUpload: (file: File) => void;
  error?: string | null;
}

export const JsonInput: React.FC<JsonInputProps> = ({
  value,
  onChange,
  onFileUpload,
  error
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="space-y-2 w-full">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          Source JSON
        </label>
        <div className="relative">
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
          >
            <Upload size={16} />
            Upload JSON
          </label>
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-64 p-4 font-mono text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder="Paste your JSON here..."
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};