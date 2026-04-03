import { MetallbBGPPeer } from '../resources/bgpPeer';
export const DEFAULT_BGP_PEER_NAMESPACE = 'metallb-system';
export function getBGPPeerTemplateYAML() {
  return `apiVersion: metallb.io/v1beta1
kind: BGPPeer
metadata:
  name: example-bgppeer
  namespace: ${DEFAULT_BGP_PEER_NAMESPACE}
spec:
  peerAddress: 192.168.1.1
  peerASN: 64512
`;
}
export function buildBGPPeerPatch(
  original: MetallbBGPPeer,
  edited: MetallbBGPPeer
): Record<string, any> {
  const originalName = original.metadata?.name;
  const originalNamespace = original.metadata?.namespace;
  const editedName = edited.metadata?.name;
  const editedNamespace = edited.metadata?.namespace;
  if (!editedName || !editedNamespace) {
    throw new Error('Edited BGPPeer must include metadata.name and metadata.namespace.');
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
