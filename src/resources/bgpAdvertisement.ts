import { KubeObject } from '@kinvolk/headlamp-plugin/lib/k8s/cluster';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/k8s/cluster';

export interface BGPAdvertisementSpec {
  aggregationLength?: number;
  aggregationLengthV6?: number;
  localPref?: number;
  communities?: string[];
  ipAddressPools?: string[];
  ipAddressPoolSelectors?: Record<string, any>[];
  peers?: string[];
  nodeSelectors?: Record<string, any>[];
}

export interface MetallbBGPAdvertisement extends KubeObjectInterface {
  spec: BGPAdvertisementSpec;
}

export class BGPAdvertisement extends KubeObject<MetallbBGPAdvertisement> {
  static kind = 'BGPAdvertisement';
  static apiName = 'bgpadvertisements';
  static apiVersion = 'metallb.io/v1beta1';
  static isNamespaced = true;

  static get detailsRoute() {
    return '/metallb/bgpadvertisements/:namespace/:name';
  }

  get spec() {
    return this.jsonData.spec;
  }
}


