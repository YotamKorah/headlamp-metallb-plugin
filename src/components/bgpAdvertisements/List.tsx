import { ResourceListView } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { useMetallbInstalled } from '../../hooks/useMetallbInstalled';
import { BGPAdvertisement } from '../../resources/bgpAdvertisement';
import { NotInstalledBanner } from '../common/CommonComponents';

export function BGPAdvertisementsList() {
  const { isInstalled, isMetallbCheckLoading } = useMetallbInstalled();

  if (!isInstalled) {
    return <NotInstalledBanner isLoading={isMetallbCheckLoading} />;
  }

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
