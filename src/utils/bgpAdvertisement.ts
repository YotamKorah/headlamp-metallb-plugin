import { MetallbBGPAdvertisement } from '../resources/bgpAdvertisement';

export const DEFAULT_BGP_ADVERTISEMENT_NAMESPACE = 'metallb-system';

export function getBGPAdvertisementTemplateYAML() {
  return `apiVersion: metallb.io/v1beta1
kind: BGPAdvertisement
metadata:
  name: example-bgpadvertisement
  namespace: ${DEFAULT_BGP_ADVERTISEMENT_NAMESPACE}
spec:
  ipAddressPools:
    - example-ipaddresspool
`;
}

export function buildBGPAdvertisementPatch(
  original: MetallbBGPAdvertisement,
  edited: MetallbBGPAdvertisement
): Record<string, any> {
  const originalName = original.metadata?.name;
  const originalNamespace = original.metadata?.namespace;
  const editedName = edited.metadata?.name;
  const editedNamespace = edited.metadata?.namespace;

  if (!editedName || !editedNamespace) {
    throw new Error('Edited BGPAdvertisement must include metadata.name and metadata.namespace.');
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

