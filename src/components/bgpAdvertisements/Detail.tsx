import {
  DetailsGrid,
} from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { useParams } from 'react-router-dom';
import { useMetallbInstalled } from '../../hooks/useMetallbInstalled';
import { BGPAdvertisement } from '../../resources/bgpAdvertisement';
import { NotInstalledBanner, SelectorList } from '../common/CommonComponents';

export function BGPAdvertisementDetail() {
  const { name, namespace } = useParams<{ name: string; namespace: string }>();
  const [, error] = BGPAdvertisement.useGet(name, namespace);
  const { isInstalled, isMetallbCheckLoading } = useMetallbInstalled();

  if (!isInstalled) {
    return <NotInstalledBanner isLoading={isMetallbCheckLoading} />;
  }

  return (
    <DetailsGrid
      resourceType={BGPAdvertisement}
      name={name}
      namespace={namespace}
      extraInfo={resource =>
        resource && [
          {
            name: 'IPAddressPools',
            value: (resource.spec.ipAddressPools || []).join(', ') || '-',
          },
          {
            name: 'IPAddressPool Selectors',
            value: <SelectorList selectors={resource.spec.ipAddressPoolSelectors} />,
          },
          {
            name: 'Peers',
            value: (resource.spec.peers || []).join(', ') || '-',
          },
          {
            name: 'Communities',
            value: (resource.spec.communities || []).join(', ') || '-',
          },
          {
            name: 'Local Pref',
            value: resource.spec.localPref ?? '-',
          },
          {
            name: 'Aggregation Length (IPv4)',
            value: resource.spec.aggregationLength ?? '-',
          },
          {
            name: 'Aggregation Length (IPv6)',
            value: resource.spec.aggregationLengthV6 ?? '-',
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
