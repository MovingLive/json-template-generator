export interface JsonTemplateState {
  sourceJson: string;
  templateJson: string;
  error: string | null;
  isProcessing: boolean;
}

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };