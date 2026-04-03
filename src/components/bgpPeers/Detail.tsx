import {
  DetailsGrid,
} from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { useParams } from 'react-router-dom';
import { useMetallbInstalled } from '../../hooks/useMetallbInstalled';
import { BGPPeer } from '../../resources/bgpPeer';
import { NotInstalledBanner, SelectorList } from '../common/CommonComponents';

export function BGPPeerDetail() {
  const { name, namespace } = useParams<{ name: string; namespace: string }>();
  const [, error] = BGPPeer.useGet(name, namespace);
  const { isInstalled, isMetallbCheckLoading } = useMetallbInstalled();

  if (!isInstalled) {
    return <NotInstalledBanner isLoading={isMetallbCheckLoading} />;
  }

  return (
    <DetailsGrid
      resourceType={BGPPeer}
      name={name}
      namespace={namespace}
      extraInfo={resource =>
        resource && [
          {
            name: 'Peer Address',
            value: resource.spec.peerAddress || '-',
          },
          {
            name: 'Peer ASN',
            value: resource.spec.peerASN ?? '-',
          },
          {
            name: 'My ASN',
            value: resource.spec.myASN ?? '-',
          },
          {
            name: 'Source Address',
            value: resource.spec.sourceAddress || '-',
          },
          {
            name: 'Port',
            value: resource.spec.port ?? '-',
          },
          {
            name: 'Hold Time',
            value: resource.spec.holdTime || '-',
          },
          {
            name: 'Keepalive Time',
            value: resource.spec.keepaliveTime || '-',
          },
          {
            name: 'EBGP Multi Hop',
            value: resource.spec.ebgpMultiHop ? 'Yes' : 'No',
          },
          {
            name: 'BFD Profile',
            value: resource.spec.bfdProfile || '-',
          },
          {
            name: 'VRF',
            value: resource.spec.vrf || '-',
          },
          {
            name: 'Node Selectors',
            value: <SelectorList selectors={resource.spec.nodeSelectors} />,
          },
          {
            name: 'Error',
            value: error?.message,
          },
        ]
      }
    />
  );
}
