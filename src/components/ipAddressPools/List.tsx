import { ResourceListView } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { IPAddressPool } from '../../resources/ipAddressPool';

export function IPAddressPoolsList() {
  return (
    <>
      <ResourceListView
        title="IPAddressPools"
        resourceClass={IPAddressPool}
        columns={[
          'name',
          'namespace',
          {
            id: 'addresses',
            label: 'Addresses',
            getValue: item => (item.spec.addresses || []).join(', '),
            render: item => (item.spec.addresses || []).join(', ') || '-',
          },
          {
            id: 'autoAssign',
            label: 'Auto Assign',
            getValue: item => (item.spec.autoAssign === false ? 'No' : 'Yes'),
          },
          'age',
        ]}
      />
    </>
  );
}
