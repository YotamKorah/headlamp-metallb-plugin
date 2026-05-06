import { KubeObject } from '@kinvolk/headlamp-plugin/lib/k8s/cluster';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/k8s/cluster';

export interface L2AdvertisementSpec {
  ipAddressPools?: string[];
  ipAddressPoolSelectors?: Record<string, any>[];
  nodeSelectors?: Record<string, any>[];
  interfaces?: string[];
}

export interface MetallbL2Advertisement extends KubeObjectInterface {
  spec: L2AdvertisementSpec;
}

export class L2Advertisement extends KubeObject<MetallbL2Advertisement> {
  static kind = 'L2Advertisement';
  static apiName = 'l2advertisements';
  static apiVersion = ['metallb.io/v1beta1'];
  static isNamespaced = true;

  static get detailsRoute() {
    return '/metallb/l2advertisements/:namespace/:name';
  }

  get spec() {
    return this.jsonData.spec;
  }
}
