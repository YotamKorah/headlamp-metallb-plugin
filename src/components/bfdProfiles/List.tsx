import { ResourceListView } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { useMetallbInstalled } from '../../hooks/useMetallbInstalled';
import { BFDProfile } from '../../resources/bfdProfile';
import { NotInstalledBanner } from '../common/CommonComponents';

export function BFDProfilesList() {
  const { isInstalled, isMetallbCheckLoading } = useMetallbInstalled();

  if (!isInstalled) {
    return <NotInstalledBanner isLoading={isMetallbCheckLoading} />;
  }

  return (
    <ResourceListView
      title="BFDProfiles"
      resourceClass={BFDProfile}
      columns={[
        'name',
        'namespace',
        {
          id: 'receiveInterval',
          label: 'Receive Interval (ms)',
          getValue: item => item.spec.receiveInterval ?? 300,
        },
        {
          id: 'transmitInterval',
          label: 'Transmit Interval (ms)',
          getValue: item => item.spec.transmitInterval ?? 300,
        },
        {
          id: 'detectMultiplier',
          label: 'Detect Multiplier',
          getValue: item => item.spec.detectMultiplier ?? 3,
        },
        {
          id: 'echoMode',
          label: 'Echo Mode',
          getValue: item => (item.spec.echoMode ? 'Yes' : 'No'),
        },
        {
          id: 'passiveMode',
          label: 'Passive Mode',
          getValue: item => (item.spec.passiveMode ? 'Yes' : 'No'),
        },
        'age',
      ]}
    />
  );
}
