import { describe, expect, it } from 'vitest';
import { buildBGPPeerPatch, getBGPPeerTemplateYAML } from './bgpPeer';
describe('bgpPeer utils', () => {
  it('builds a template with metallb-system as default namespace', () => {
    const yaml = getBGPPeerTemplateYAML();
    expect(yaml).toContain('namespace: metallb-system');
    expect(yaml).toContain('kind: BGPPeer');
    expect(yaml).toContain('peerAddress: 192.168.1.1');
  });
  it('creates a patch with edited spec and metadata labels/annotations', () => {
    const original: any = {
      metadata: { name: 'peer-a', namespace: 'metallb-system' },
      spec: { peerAddress: '192.168.1.2', peerASN: 64513 },
    };
    const edited: any = {
      metadata: {
        name: 'peer-a',
        namespace: 'metallb-system',
        labels: { env: 'dev' },
        annotations: { owner: 'netops' },
      },
      spec: {
        peerAddress: '192.168.1.3',
        peerASN: 64514,
        ebgpMultiHop: true,
      },
    };
    expect(buildBGPPeerPatch(original, edited)).toEqual({
      metadata: {
        labels: { env: 'dev' },
        annotations: { owner: 'netops' },
      },
      spec: {
        peerAddress: '192.168.1.3',
        peerASN: 64514,
        ebgpMultiHop: true,
      },
    });
  });
  it('rejects edits that change name or namespace', () => {
    const original: any = {
      metadata: { name: 'peer-a', namespace: 'metallb-system' },
      spec: { peerAddress: '192.168.1.2', peerASN: 64513 },
    };
    const edited: any = {
      metadata: { name: 'peer-b', namespace: 'other-ns' },
      spec: { peerAddress: '192.168.1.3', peerASN: 64514 },
    };
    expect(() => buildBGPPeerPatch(original, edited)).toThrow(
      'metadata.name and metadata.namespace cannot be changed when editing.'
    );
  });
});
