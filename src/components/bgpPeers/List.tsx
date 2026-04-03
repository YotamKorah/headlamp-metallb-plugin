import { ResourceListView } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { useMetallbInstalled } from '../../hooks/useMetallbInstalled';
import { BGPPeer } from '../../resources/bgpPeer';
import { NotInstalledBanner } from '../common/CommonComponents';

export function BGPPeersList() {
  const { isInstalled, isMetallbCheckLoading } = useMetallbInstalled();

  if (!isInstalled) {
    return <NotInstalledBanner isLoading={isMetallbCheckLoading} />;
  }

  return (
    <ResourceListView
      title="BGPPeers"
      resourceClass={BGPPeer}
      columns={[
        'name',
        'namespace',
        {
          id: 'peerAddress',
          label: 'Peer Address',
          getValue: item => item.spec.peerAddress || '-',
          render: item => item.spec.peerAddress || '-',
        },
        {
          id: 'peerASN',
          label: 'Peer ASN',
          getValue: item => item.spec.peerASN ?? '-',
        },
        {
          id: 'myASN',
          label: 'My ASN',
          getValue: item => item.spec.myASN ?? '-',
        },
        'age',
      ]}
    />
  );
}
