import { ResourceListView } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { BGPAdvertisement } from '../../resources/bgpAdvertisement';

export function BGPAdvertisementsList() {
  return (
    <ResourceListView
      title="BGPAdvertisements"
      resourceClass={BGPAdvertisement}
      columns={[
        'name',
        'namespace',
        {
          id: 'ipAddressPools',
          label: 'IPAddressPools',
          getValue: item => (item.spec.ipAddressPools || []).join(', '),
          render: item => (item.spec.ipAddressPools || []).join(', ') || '-',
        },
        {
          id: 'peers',
          label: 'Peers',
          getValue: item => (item.spec.peers || []).join(', '),
          render: item => (item.spec.peers || []).join(', ') || '-',
        },
        {
          id: 'localPref',
          label: 'Local Pref',
          getValue: item => item.spec.localPref ?? '-',
        },
        'age',
      ]}
    />
  );
}

