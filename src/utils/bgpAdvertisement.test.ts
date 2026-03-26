import { describe, expect, it } from 'vitest';
import {
  buildBGPAdvertisementPatch,
  getBGPAdvertisementTemplateYAML,
} from './bgpAdvertisement';

describe('bgpAdvertisement utils', () => {
  it('builds a template with metallb-system as default namespace', () => {
    const yaml = getBGPAdvertisementTemplateYAML();

    expect(yaml).toContain('namespace: metallb-system');
    expect(yaml).toContain('kind: BGPAdvertisement');
  });

  it('creates a patch with edited spec and metadata labels/annotations', () => {
    const original: any = {
      metadata: { name: 'bgp-adv-a', namespace: 'metallb-system' },
      spec: { ipAddressPools: ['pool-a'], peers: ['peer-a'] },
    };

    const edited: any = {
      metadata: {
        name: 'bgp-adv-a',
        namespace: 'metallb-system',
        labels: { env: 'dev' },
        annotations: { owner: 'netops' },
      },
      spec: {
        ipAddressPools: ['pool-b'],
        peers: ['peer-b'],
        localPref: 100,
      },
    };

    expect(buildBGPAdvertisementPatch(original, edited)).toEqual({
      metadata: {
        labels: { env: 'dev' },
        annotations: { owner: 'netops' },
      },
      spec: {
        ipAddressPools: ['pool-b'],
        peers: ['peer-b'],
        localPref: 100,
      },
    });
  });

  it('rejects edits that change name or namespace', () => {
    const original: any = {
      metadata: { name: 'bgp-adv-a', namespace: 'metallb-system' },
      spec: { ipAddressPools: ['pool-a'] },
    };

    const edited: any = {
      metadata: { name: 'bgp-adv-b', namespace: 'other-ns' },
      spec: { ipAddressPools: ['pool-b'] },
    };

    expect(() => buildBGPAdvertisementPatch(original, edited)).toThrow(
      'metadata.name and metadata.namespace cannot be changed when editing.'
    );
  });
});

