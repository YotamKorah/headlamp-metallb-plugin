import { MetallbBFDProfile } from '../resources/bfdProfile';

export const DEFAULT_BFD_PROFILE_NAMESPACE = 'metallb-system';

export function getBFDProfileTemplateYAML() {
  return `apiVersion: metallb.io/v1beta1
kind: BFDProfile
metadata:
  name: example-bfdprofile
  namespace: ${DEFAULT_BFD_PROFILE_NAMESPACE}
spec:
  receiveInterval: 300
  transmitInterval: 300
  detectMultiplier: 3
`;
}

export function buildBFDProfilePatch(
  original: MetallbBFDProfile,
  edited: MetallbBFDProfile
): Record<string, any> {
  const originalName = original.metadata?.name;
  const originalNamespace = original.metadata?.namespace;
  const editedName = edited.metadata?.name;
  const editedNamespace = edited.metadata?.namespace;

  if (!editedName || !editedNamespace) {
    throw new Error('Edited BFDProfile must include metadata.name and metadata.namespace.');
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
