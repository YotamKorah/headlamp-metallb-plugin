import { describe, expect, it } from 'vitest';
import { parseDocument } from 'yaml';
import { serializeAsValidatedYAML, YAMLValue } from './yaml';

describe('yaml utils', () => {
  it('serializes selector-like objects to valid YAML', () => {
    const selector = {
      matchLabels: {
        role: 'edge',
      },
      matchExpressions: [
        {
          key: 'kubernetes.io/hostname',
          operator: 'In',
          values: ['node-a', 'node-b'],
        },
      ],
    };

    const { yaml, error } = serializeAsValidatedYAML(selector);

    expect(error).toBeUndefined();
    expect(yaml).toContain('matchLabels:');
    expect(yaml).toContain('matchExpressions:');
    expect(parseDocument(yaml).errors).toHaveLength(0);
  });

  it('returns an error for non-serializable values', () => {
    const invalidValue = { unsupported: Symbol('bad') };

    const { yaml, error } = serializeAsValidatedYAML(invalidValue as unknown as YAMLValue);

    expect(yaml).toBe('');
    expect(error).toBeDefined();
  });
});




