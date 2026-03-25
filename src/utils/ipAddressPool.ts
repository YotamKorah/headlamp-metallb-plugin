import { MetallbIPAddressPool } from '../resources/ipAddressPool';

export const DEFAULT_IP_ADDRESS_POOL_NAMESPACE = 'metallb-system';

export function getIPAddressPoolTemplateYAML() {
  return `apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata:
  name: example-ipaddresspool
  namespace: ${DEFAULT_IP_ADDRESS_POOL_NAMESPACE}
spec:
  addresses:
    - 192.168.1.240-192.168.1.250
`;
}

export function buildIPAddressPoolPatch(
  original: MetallbIPAddressPool,
  edited: MetallbIPAddressPool
): Record<string, any> {
  const originalName = original.metadata?.name;
  const originalNamespace = original.metadata?.namespace;
  const editedName = edited.metadata?.name;
  const editedNamespace = edited.metadata?.namespace;

  if (!editedName || !editedNamespace) {
    throw new Error('Edited IPAddressPool must include metadata.name and metadata.namespace.');
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

