import { MetallbL2Advertisement } from '../resources/l2Advertisement';

export const DEFAULT_L2_ADVERTISEMENT_NAMESPACE = 'metallb-system';

export function getL2AdvertisementTemplateYAML() {
  return `apiVersion: metallb.io/v1beta1
kind: L2Advertisement
metadata:
  name: example-l2advertisement
  namespace: ${DEFAULT_L2_ADVERTISEMENT_NAMESPACE}
spec:
  ipAddressPools:
    - example-ipaddresspool
`;
}

export function buildL2AdvertisementPatch(
  original: MetallbL2Advertisement,
  edited: MetallbL2Advertisement
): Record<string, any> {
  const originalName = original.metadata?.name;
  const originalNamespace = original.metadata?.namespace;
  const editedName = edited.metadata?.name;
  const editedNamespace = edited.metadata?.namespace;

  if (!editedName || !editedNamespace) {
    throw new Error('Edited L2Advertisement must include metadata.name and metadata.namespace.');
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

