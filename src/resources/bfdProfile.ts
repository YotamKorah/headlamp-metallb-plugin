import { KubeObject } from '@kinvolk/headlamp-plugin/lib/k8s/cluster';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/k8s/cluster';

export interface BFDProfileSpec {
  receiveInterval?: number;
  transmitInterval?: number;
  detectMultiplier?: number;
  echoInterval?: number;
  echoMode?: boolean;
  passiveMode?: boolean;
  minimumTtl?: number;
}

export interface MetallbBFDProfile extends KubeObjectInterface {
  spec: BFDProfileSpec;
}

export class BFDProfile extends KubeObject<MetallbBFDProfile> {
  static kind = 'BFDProfile';
  static apiName = 'bfdprofiles';
  static apiVersion = 'metallb.io/v1beta1';
  static isNamespaced = true;

  static get detailsRoute() {
    return '/metallb/bfdprofiles/:namespace/:name';
  }

  get spec() {
    return this.jsonData.spec;
  }
}
