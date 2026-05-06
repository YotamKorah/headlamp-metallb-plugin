import { MetallbCommunity } from '../resources/community';

export const DEFAULT_COMMUNITY_NAMESPACE = 'metallb-system';

export function getCommunityTemplateYAML() {
  return `apiVersion: metallb.io/v1beta1
kind: Community
metadata:
  name: example-community
  namespace: ${DEFAULT_COMMUNITY_NAMESPACE}
spec:
  communities:
    - name: example-community
      value: "64512:100"
`;
}

export function buildCommunityPatch(
  original: MetallbCommunity,
  edited: MetallbCommunity
): Record<string, any> {
  const originalName = original.metadata?.name;
  const originalNamespace = original.metadata?.namespace;
  const editedName = edited.metadata?.name;
  const editedNamespace = edited.metadata?.namespace;

  if (!editedName || !editedNamespace) {
    throw new Error('Edited Community must include metadata.name and metadata.namespace.');
  }

  if (editedName !== originalName || editedNamespace !== originalNamespace) {
    throw new Error('metadata.name and metadata.namespace cannot be changed when editing.');
  }

  return {
    metadata: {
      annotations: edited.metadata?.annotations,
      labels: edited.metadata?.labels,
    },
    spec: edited.spec,
  };
}
