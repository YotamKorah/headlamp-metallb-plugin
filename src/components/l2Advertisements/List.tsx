import { ResourceListView } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { useMetallbInstalled } from '../../hooks/useMetallbInstalled';
import { L2Advertisement } from '../../resources/l2Advertisement';
import { NotInstalledBanner } from '../common/CommonComponents';

export function L2AdvertisementsList() {
  const { isInstalled, isMetallbCheckLoading } = useMetallbInstalled();

  if (!isInstalled) {
    return <NotInstalledBanner isLoading={isMetallbCheckLoading} />;
  }

  return (
    <ResourceListView
      title="L2Advertisements"
      resourceClass={L2Advertisement}
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
          id: 'interfaces',
          label: 'Interfaces',
          getValue: item => (item.spec.interfaces || []).join(', '),
          render: item => (item.spec.interfaces || []).join(', ') || '-',
        },
        'age',
      ]}
    />
  );
}
