import { KubeObject } from '@kinvolk/headlamp-plugin/lib/k8s/cluster';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/k8s/cluster';

export interface CommunityAlias {
  name?: string;
  value?: string;
}

export interface CommunitySpec {
  communities?: CommunityAlias[];
}

export interface MetallbCommunity extends KubeObjectInterface {
  spec: CommunitySpec;
}

export class Community extends KubeObject<MetallbCommunity> {
  static kind = 'Community';
  static apiName = 'communities';
  static apiVersion = 'metallb.io/v1beta1';
  static isNamespaced = true;

  static get detailsRoute() {
    return '/metallb/communities/:namespace/:name';
  }

  get spec() {
    return this.jsonData.spec;
  }
}
