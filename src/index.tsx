/*
 * Copyright 2026 The Kubernetes Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { registerRoute, registerSidebarEntry } from '@kinvolk/headlamp-plugin/lib';
import { BGPAdvertisementDetail } from './components/bgpAdvertisements/Detail';
import { BGPAdvertisementsList } from './components/bgpAdvertisements/List';
import { IPAddressPoolDetail } from './components/ipAddressPools/Detail';
import { IPAddressPoolsList } from './components/ipAddressPools/List';
import { L2AdvertisementDetail } from './components/l2Advertisements/Detail';
import { L2AdvertisementsList } from './components/l2Advertisements/List';

registerSidebarEntry({
  parent: '',
  name: 'metallb',
  label: 'MetalLB',
  url: '/metallb/ipaddresspools',
  icon: 'mdi:ip-network',
});

registerSidebarEntry({
  parent: 'metallb',
  name: 'metallb-ipaddresspools',
  label: 'IPAddressPools',
  url: '/metallb/ipaddresspools',
});

registerSidebarEntry({
  parent: 'metallb',
  name: 'metallb-l2advertisements',
  label: 'L2Advertisements',
  url: '/metallb/l2advertisements',
});

registerSidebarEntry({
  parent: 'metallb',
  name: 'metallb-bgpadvertisements',
  label: 'BGPAdvertisements',
  url: '/metallb/bgpadvertisements',
});

registerRoute({
  path: '/metallb/ipaddresspools',
  sidebar: 'metallb-ipaddresspools',
  name: 'IPAddressPools',
  exact: true,
  component: () => <IPAddressPoolsList />,
});

registerRoute({
  path: '/metallb/ipaddresspools/:namespace/:name',
  sidebar: 'metallb-ipaddresspools',
  name: 'IPAddressPool',
  component: () => <IPAddressPoolDetail />,
});

registerRoute({
  path: '/metallb/l2advertisements',
  sidebar: 'metallb-l2advertisements',
  name: 'L2Advertisements',
  exact: true,
  component: () => <L2AdvertisementsList />,
});

registerRoute({
  path: '/metallb/l2advertisements/:namespace/:name',
  sidebar: 'metallb-l2advertisements',
  name: 'L2Advertisement',
  component: () => <L2AdvertisementDetail />,
});

registerRoute({
  path: '/metallb/bgpadvertisements',
  sidebar: 'metallb-bgpadvertisements',
  name: 'BGPAdvertisements',
  exact: true,
  component: () => <BGPAdvertisementsList />,
});

registerRoute({
  path: '/metallb/bgpadvertisements/:namespace/:name',
  sidebar: 'metallb-bgpadvertisements',
  name: 'BGPAdvertisement',
  component: () => <BGPAdvertisementDetail />,
});
