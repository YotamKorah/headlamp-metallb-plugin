import { KubeObject } from '@kinvolk/headlamp-plugin/lib/k8s/cluster';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/k8s/cluster';

export interface IPAddressPoolSpec {
  addresses?: string[];
  autoAssign?: boolean;
  avoidBuggyIPs?: boolean;
  serviceAllocation?: {
    priority?: number;
    namespaces?: string[];
    namespaceSelectors?: Record<string, any>[];
    serviceSelectors?: Record<string, any>[];
  };
}

export interface IPAddressPoolStatus {
  assignedIPv4?: number;
  assignedIPv6?: number;
  availableIPv4?: number;
  availableIPv6?: number;
}

export interface MetallbIPAddressPool extends KubeObjectInterface {
  spec: IPAddressPoolSpec;
  status?: IPAddressPoolStatus;
}

export class IPAddressPool extends KubeObject<MetallbIPAddressPool> {
  static kind = 'IPAddressPool';
  static apiName = 'ipaddresspools';
  static apiVersion = ['metallb.io/v1beta1'];
  static isNamespaced = true;

  // Keep links on the plugin page instead of the default generated route.
  static get detailsRoute() {
    return '/metallb/ipaddresspools/:namespace/:name';
  }

  get spec() {
    return this.jsonData.spec;
  }

  get status() {
    return this.jsonData.status;
  }
}
