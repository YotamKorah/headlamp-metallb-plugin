import { KubeObject } from '@kinvolk/headlamp-plugin/lib/k8s/cluster';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/k8s/cluster';
export interface BGPPeerSpec {
  peerAddress?: string;
  peerASN?: number;
  myASN?: number;
  sourceAddress?: string;
  holdTime?: string;
  keepaliveTime?: string;
  ebgpMultiHop?: boolean;
  bfdProfile?: string;
  nodeSelectors?: Record<string, any>[];
}
export interface MetallbBGPPeer extends KubeObjectInterface {
  spec: BGPPeerSpec;
}
export class BGPPeer extends KubeObject<MetallbBGPPeer> {
  static kind = 'BGPPeer';
  static apiName = 'bgppeers';
  static apiVersion = ['metallb.io/v1beta2', 'metallb.io/v1beta1'];
  static isNamespaced = true;
  static get detailsRoute() {
    return '/metallb/bgppeers/:namespace/:name';
  }
  get spec() {
    return this.jsonData.spec;
  }
}
