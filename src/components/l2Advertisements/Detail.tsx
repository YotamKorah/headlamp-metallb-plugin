import {
  DetailsGrid,
  NameValueTable,
  SectionBox,
} from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { useParams } from 'react-router-dom';
import { useMetallbInstalled } from '../../hooks/useMetallbInstalled';
import { L2Advertisement } from '../../resources/l2Advertisement';
import { NotInstalledBanner, SelectorList } from '../common/CommonComponents';

export function L2AdvertisementDetail() {
  const { name, namespace } = useParams<{ name: string; namespace: string }>();
  const [, error] = L2Advertisement.useGet(name, namespace);
  const { isInstalled, isMetallbCheckLoading } = useMetallbInstalled();

  if (!isInstalled) {
    return <NotInstalledBanner isLoading={isMetallbCheckLoading} />;
  }

  return (
    <DetailsGrid
      resourceType={L2Advertisement}
      name={name}
      namespace={namespace}
      extraInfo={resource =>
        resource && [
          {
            name: 'IPAddressPools',
            value: (resource.spec.ipAddressPools || []).join(', ') || '-',
          },
          {
            name: 'Interfaces',
            value: (resource.spec.interfaces || []).join(', ') || '-',
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
      extraSections={resource =>
        resource
          ? [
              {
                id: 'l2advertisement-spec',
                section: (
                  <SectionBox title="Specification">
                    <NameValueTable
                      rows={[
                        {
                          name: 'IPAddressPools',
                          value: (resource.spec.ipAddressPools || []).join(', ') || '-',
                        },
                        {
                          name: 'Interfaces',
                          value: (resource.spec.interfaces || []).join(', ') || '-',
                        },
                        {
                          name: 'IPAddressPool Selectors',
                          value: <SelectorList selectors={resource.spec.ipAddressPoolSelectors} />,
                        },
                        {
                          name: 'Node Selectors',
                          value: <SelectorList selectors={resource.spec.nodeSelectors} />,
                        },
                      ]}
                    />
                  </SectionBox>
                ),
              },
            ]
          : []
      }
    />
  );
}
