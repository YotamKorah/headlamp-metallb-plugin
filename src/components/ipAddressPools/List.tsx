import { ResourceListView } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { useMetallbInstalled } from '../../hooks/useMetallbInstalled';
import { IPAddressPool } from '../../resources/ipAddressPool';
import { NotInstalledBanner } from '../common/CommonComponents';

export function IPAddressPoolsList() {
  const { isInstalled, isMetallbCheckLoading } = useMetallbInstalled();

  if (!isInstalled) {
    return <NotInstalledBanner isLoading={isMetallbCheckLoading} />;
  }

  return (
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
  );
}
