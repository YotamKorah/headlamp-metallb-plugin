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
import { BFDProfileDetail } from './components/bfdProfiles/Detail';
import { BFDProfilesList } from './components/bfdProfiles/List';
import { BGPAdvertisementDetail } from './components/bgpAdvertisements/Detail';
import { BGPAdvertisementsList } from './components/bgpAdvertisements/List';
import { BGPPeerDetail } from './components/bgpPeers/Detail';
import { BGPPeersList } from './components/bgpPeers/List';
import { CommunityDetail } from './components/communities/Detail';
import { CommunitiesList } from './components/communities/List';
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

registerSidebarEntry({
  parent: 'metallb',
  name: 'metallb-bgppeers',
  label: 'BGPPeers',
  url: '/metallb/bgppeers',
});

registerSidebarEntry({
  parent: 'metallb',
  name: 'metallb-bfdprofiles',
  label: 'BFDProfiles',
  url: '/metallb/bfdprofiles',
});

registerSidebarEntry({
  parent: 'metallb',
  name: 'metallb-communities',
  label: 'Communities',
  url: '/metallb/communities',
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

registerRoute({
  path: '/metallb/bgppeers',
  sidebar: 'metallb-bgppeers',
  name: 'BGPPeers',
  exact: true,
  component: () => <BGPPeersList />,
});

registerRoute({
  path: '/metallb/bgppeers/:namespace/:name',
  sidebar: 'metallb-bgppeers',
  name: 'BGPPeer',
  component: () => <BGPPeerDetail />,
});

registerRoute({
  path: '/metallb/bfdprofiles',
  sidebar: 'metallb-bfdprofiles',
  name: 'BFDProfiles',
  exact: true,
  component: () => <BFDProfilesList />,
});

registerRoute({
  path: '/metallb/bfdprofiles/:namespace/:name',
  sidebar: 'metallb-bfdprofiles',
  name: 'BFDProfile',
  component: () => <BFDProfileDetail />,
});

registerRoute({
  path: '/metallb/communities',
  sidebar: 'metallb-communities',
  name: 'Communities',
  exact: true,
  component: () => <CommunitiesList />,
});

registerRoute({
  path: '/metallb/communities/:namespace/:name',
  sidebar: 'metallb-communities',
  name: 'Community',
  component: () => <CommunityDetail />,
});

