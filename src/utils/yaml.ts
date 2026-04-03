import { parseDocument, stringify } from 'yaml';

export type YAMLValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | YAMLValue[]
  | { [key: string]: YAMLValue };

interface YAMLSerializationResult {
  yaml: string;
  error?: string;
}

export function serializeAsValidatedYAML(value: YAMLValue): YAMLSerializationResult {
  try {
    const yaml = stringify(value, { indent: 2 }).trimEnd();
    const parsed = parseDocument(yaml);

    if (parsed.errors.length > 0) {
      return {
        yaml,
        error: parsed.errors.map(err => err.message).join('; '),
      };
    }

    return { yaml };
  } catch (err: unknown) {
    return {
      yaml: '',
      error: err instanceof Error ? err.message : 'Unknown YAML serialization error',
    };
  }
}

