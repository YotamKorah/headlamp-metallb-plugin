import { ResourceListView } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { useMetallbInstalled } from '../../hooks/useMetallbInstalled';
import { Community } from '../../resources/community';
import { NotInstalledBanner } from '../common/CommonComponents';

export function CommunitiesList() {
  const { isInstalled, isMetallbCheckLoading } = useMetallbInstalled();

  if (!isInstalled) {
    return <NotInstalledBanner isLoading={isMetallbCheckLoading} />;
  }

  return (
    <ResourceListView
      title="Communities"
      resourceClass={Community}
      columns={[
        'name',
        'namespace',
        {
          id: 'communityCount',
          label: 'Community Aliases',
          getValue: item => item.spec.communities?.length ?? 0,
        },
        {
          id: 'communityNames',
          label: 'Alias Names',
          getValue: item =>
            (item.spec.communities || [])
              .map(c => c.name)
              .filter(Boolean)
              .join(', '),
          render: item => {
            const names = (item.spec.communities || []).map(c => c.name).filter(Boolean);
            return names.length ? names.join(', ') : '-';
          },
        },
        'age',
      ]}
    />
  );
}
