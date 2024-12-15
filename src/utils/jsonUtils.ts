import { JsonValue } from '../types/json';

export const isValidJson = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

export const generateTemplate = (json: JsonValue): JsonValue => {
  if (json === null) return null;
  
  if (Array.isArray(json)) {
    return json.length > 0 ? [generateTemplate(json[0])] : [];
  }
  
  if (typeof json === 'object') {
    const template: Record<string, JsonValue> = {};
    for (const [key, value] of Object.entries(json)) {
      template[key] = generateTemplate(value);
    }
    return template;
  }
  
  // Return empty placeholder based on type
  switch (typeof json) {
    case 'string': return '';
    case 'number': return 0;
    case 'boolean': return false;
    default: return null;
  }
};

export const formatJson = (json: JsonValue): string => {
  return JSON.stringify(json, null, 2);
};