import { describe, expect, it } from 'vitest';
import { buildIPAddressPoolPatch, getIPAddressPoolTemplateYAML } from './ipAddressPool';

describe('ipAddressPool utils', () => {
  it('builds a template with metallb-system as default namespace', () => {
    const yaml = getIPAddressPoolTemplateYAML();

    expect(yaml).toContain('namespace: metallb-system');
    expect(yaml).toContain('kind: IPAddressPool');
  });

  it('creates a patch with edited spec and metadata labels/annotations', () => {
    const original: any = {
      metadata: { name: 'pool-a', namespace: 'metallb-system' },
      spec: { addresses: ['10.0.0.1-10.0.0.10'] },
    };

    const edited: any = {
      metadata: {
        name: 'pool-a',
        namespace: 'metallb-system',
        labels: { env: 'dev' },
        annotations: { owner: 'netops' },
      },
      spec: { addresses: ['10.0.0.20-10.0.0.30'], autoAssign: false },
    };

    expect(buildIPAddressPoolPatch(original, edited)).toEqual({
      metadata: {
        labels: { env: 'dev' },
        annotations: { owner: 'netops' },
      },
      spec: {
        addresses: ['10.0.0.20-10.0.0.30'],
        autoAssign: false,
      },
    });
  });

  it('rejects edits that change name or namespace', () => {
    const original: any = {
      metadata: { name: 'pool-a', namespace: 'metallb-system' },
      spec: { addresses: ['10.0.0.1-10.0.0.10'] },
    };

    const edited: any = {
      metadata: { name: 'pool-b', namespace: 'other-ns' },
      spec: { addresses: ['10.0.0.20-10.0.0.30'] },
    };

    expect(() => buildIPAddressPoolPatch(original, edited)).toThrow(
      'metadata.name and metadata.namespace cannot be changed when editing.'
    );
  });
});
