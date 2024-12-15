import { FileJson } from "lucide-react";
import { useState } from "react";
import { JsonInput } from "./components/JsonInput";
import { JsonOutput } from "./components/JsonOutput";
import type { JsonTemplateState } from "./types/json";
import { formatJson, generateTemplate } from "./utils/jsonUtils";

function App() {
  const [state, setState] = useState<JsonTemplateState>({
    sourceJson: "",
    templateJson: "",
    error: null,
    isProcessing: false,
  });

  const handleJsonChange = (value: string) => {
    setState((prev) => ({
      ...prev,
      sourceJson: value,
      error: null,
    }));
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      handleJsonChange(content);
    };
    reader.readAsText(file);
  };

  const handleGenerate = () => {
    try {
      setState((prev) => ({ ...prev, isProcessing: true, error: null }));

      if (!state.sourceJson.trim()) {
        throw new Error("Please enter some JSON first");
      }

      const parsedJson = JSON.parse(state.sourceJson);
      const template = generateTemplate(parsedJson);
      const formattedTemplate = formatJson(template);

      setState((prev) => ({
        ...prev,
        templateJson: formattedTemplate,
        isProcessing: false,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : "Invalid JSON format",
        isProcessing: false,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FileJson size={48} className="text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            JSON Template Generator
          </h1>
          <p className="mt-2 text-gray-600">
            Generate structured templates from your JSON data
          </p>
        </div>

        <div className="space-y-6 bg-white p-6 rounded-lg shadow">
          <JsonInput
            value={state.sourceJson}
            onChange={handleJsonChange}
            onFileUpload={handleFileUpload}
            error={state.error}
          />

          <div className="flex justify-center">
            <button
              onClick={handleGenerate}
              disabled={state.isProcessing}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              Generate Template
            </button>
          </div>

          {state.templateJson && <JsonOutput value={state.templateJson} />}
        </div>
      </div>
    </div>
  );
}

export default App;
