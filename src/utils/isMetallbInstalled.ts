import { ApiProxy } from '@kinvolk/headlamp-plugin/lib';

export async function isMetallbInstalled(): Promise<boolean> {
  try {
    const response = await ApiProxy.request('/apis/metallb.io/v1beta1', {
      method: 'GET',
    });
    return !!response;
  } catch (error) {
    return false;
  }
}
