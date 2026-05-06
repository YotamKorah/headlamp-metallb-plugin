import { describe, expect, it } from 'vitest';
import { buildCommunityPatch, getCommunityTemplateYAML } from './community';

describe('community utils', () => {
  it('builds a template with metallb-system as default namespace', () => {
    const yaml = getCommunityTemplateYAML();
    expect(yaml).toContain('namespace: metallb-system');
    expect(yaml).toContain('kind: Community');
    expect(yaml).toContain('64512:100');
  });

  it('creates a patch with edited spec and metadata labels/annotations', () => {
    const original: any = {
      metadata: { name: 'my-communities', namespace: 'metallb-system' },
      spec: { communities: [{ name: 'no-export', value: '65535:65282' }] },
    };
    const edited: any = {
      metadata: {
        name: 'my-communities',
        namespace: 'metallb-system',
        labels: { env: 'prod' },
        annotations: { owner: 'netops' },
      },
      spec: {
        communities: [
          { name: 'no-export', value: '65535:65282' },
          { name: 'local-as', value: '64512:200' },
        ],
      },
    };
    expect(buildCommunityPatch(original, edited)).toEqual({
      metadata: { labels: { env: 'prod' }, annotations: { owner: 'netops' } },
      spec: {
        communities: [
          { name: 'no-export', value: '65535:65282' },
          { name: 'local-as', value: '64512:200' },
        ],
      },
    });
  });

  it('rejects edits that change name or namespace', () => {
    const original: any = {
      metadata: { name: 'my-communities', namespace: 'metallb-system' },
      spec: { communities: [] },
    };
    const edited: any = {
      metadata: { name: 'other-communities', namespace: 'other-ns' },
      spec: { communities: [] },
    };
    expect(() => buildCommunityPatch(original, edited)).toThrow(
      'metadata.name and metadata.namespace cannot be changed when editing.'
    );
  });
});
