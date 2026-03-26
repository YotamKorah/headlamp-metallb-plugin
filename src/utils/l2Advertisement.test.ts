import { describe, expect, it } from 'vitest';
import { buildL2AdvertisementPatch, getL2AdvertisementTemplateYAML } from './l2Advertisement';

describe('l2Advertisement utils', () => {
  it('builds a template with metallb-system as default namespace', () => {
    const yaml = getL2AdvertisementTemplateYAML();

    expect(yaml).toContain('namespace: metallb-system');
    expect(yaml).toContain('kind: L2Advertisement');
  });

  it('creates a patch with edited spec and metadata labels/annotations', () => {
    const original: any = {
      metadata: { name: 'adv-a', namespace: 'metallb-system' },
      spec: { ipAddressPools: ['pool-a'] },
    };

    const edited: any = {
      metadata: {
        name: 'adv-a',
        namespace: 'metallb-system',
        labels: { env: 'dev' },
        annotations: { owner: 'netops' },
      },
      spec: { ipAddressPools: ['pool-b'], interfaces: ['eth0'] },
    };

    expect(buildL2AdvertisementPatch(original, edited)).toEqual({
      metadata: {
        labels: { env: 'dev' },
        annotations: { owner: 'netops' },
      },
      spec: {
        ipAddressPools: ['pool-b'],
        interfaces: ['eth0'],
      },
    });
  });

  it('rejects edits that change name or namespace', () => {
    const original: any = {
      metadata: { name: 'adv-a', namespace: 'metallb-system' },
      spec: { ipAddressPools: ['pool-a'] },
    };

    const edited: any = {
      metadata: { name: 'adv-b', namespace: 'other-ns' },
      spec: { ipAddressPools: ['pool-b'] },
    };

    expect(() => buildL2AdvertisementPatch(original, edited)).toThrow(
      'metadata.name and metadata.namespace cannot be changed when editing.'
    );
  });
});
