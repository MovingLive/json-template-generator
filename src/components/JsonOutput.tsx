import React from 'react';
import { Copy, Download } from 'lucide-react';

interface JsonOutputProps {
  value: string;
}

export const JsonOutput: React.FC<JsonOutputProps> = ({ value }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([value], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-2 w-full">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          Generated Template
        </label>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Copy size={16} />
            Copy
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <Download size={16} />
            Download
          </button>
        </div>
      </div>
      <pre className="w-full h-64 p-4 font-mono text-sm bg-gray-50 border border-gray-300 rounded-lg overflow-auto">
        {value || 'Template will appear here...'}
      </pre>
    </div>
  );
};