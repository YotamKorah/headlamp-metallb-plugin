import { ResourceListView } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { L2Advertisement } from '../../resources/l2Advertisement';

export function L2AdvertisementsList() {
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

