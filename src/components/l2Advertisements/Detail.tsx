import {
  DetailsGrid,
} from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Box, Typography } from '@mui/material';
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

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={2} minHeight="200px">
        <Typography color="error">
          Error getting L2Advertisement {name}: {error.message}
        </Typography>
      </Box>
    );
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
            name: 'IPAddressPool Selectors',
            value: <SelectorList selectors={resource.spec.ipAddressPoolSelectors} />,
          },
          {
            name: 'Node Selectors',
            value: <SelectorList selectors={resource.spec.nodeSelectors} />,
          },
        ]
      }
    />
  );
}
