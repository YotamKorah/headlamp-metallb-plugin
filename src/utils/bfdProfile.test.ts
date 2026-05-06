import { describe, expect, it } from 'vitest';
import { buildBFDProfilePatch, getBFDProfileTemplateYAML } from './bfdProfile';

describe('bfdProfile utils', () => {
  it('builds a template with metallb-system as default namespace', () => {
    const yaml = getBFDProfileTemplateYAML();
    expect(yaml).toContain('namespace: metallb-system');
    expect(yaml).toContain('kind: BFDProfile');
    expect(yaml).toContain('receiveInterval: 300');
  });

  it('creates a patch with edited spec and metadata labels/annotations', () => {
    const original: any = {
      metadata: { name: 'fast-bfd', namespace: 'metallb-system' },
      spec: { receiveInterval: 300, transmitInterval: 300, detectMultiplier: 3 },
    };
    const edited: any = {
      metadata: {
        name: 'fast-bfd',
        namespace: 'metallb-system',
        labels: { env: 'prod' },
        annotations: { owner: 'netops' },
      },
      spec: { receiveInterval: 100, transmitInterval: 100, detectMultiplier: 5, echoMode: true },
    };
    expect(buildBFDProfilePatch(original, edited)).toEqual({
      metadata: { labels: { env: 'prod' }, annotations: { owner: 'netops' } },
      spec: { receiveInterval: 100, transmitInterval: 100, detectMultiplier: 5, echoMode: true },
    });
  });

  it('rejects edits that change name or namespace', () => {
    const original: any = {
      metadata: { name: 'fast-bfd', namespace: 'metallb-system' },
      spec: { receiveInterval: 300 },
    };
    const edited: any = {
      metadata: { name: 'slow-bfd', namespace: 'other-ns' },
      spec: { receiveInterval: 1000 },
    };
    expect(() => buildBFDProfilePatch(original, edited)).toThrow(
      'metadata.name and metadata.namespace cannot be changed when editing.'
    );
  });
});
