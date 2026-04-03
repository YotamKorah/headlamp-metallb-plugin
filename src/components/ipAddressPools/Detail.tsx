import {
  DetailsGrid, MetadataDictGrid,
  NameValueTable,
} from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useMetallbInstalled } from '../../hooks/useMetallbInstalled';
import { IPAddressPool } from '../../resources/ipAddressPool';
import {NotInstalledBanner, SelectorList} from '../common/CommonComponents';

export function IPAddressPoolDetail() {
  const { name, namespace } = useParams<{ name: string; namespace: string }>();
  const [, error] = IPAddressPool.useGet(name, namespace);
  const { isInstalled, isMetallbCheckLoading } = useMetallbInstalled();

  if (!isInstalled) {
    return <NotInstalledBanner isLoading={isMetallbCheckLoading} />;
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={2} minHeight="200px">
        <Typography color="error">
          Error getting IPAddressPool {name}: {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <DetailsGrid
      resourceType={IPAddressPool}
      name={name}
      namespace={namespace}
      extraInfo={resource =>
        resource && [
          {
            name: 'Addresses',
            value: (resource.spec.addresses || []).join(', ') || '-',
          },
          {
            name: 'Auto Assign',
            value: resource.spec.autoAssign === false ? 'No' : 'Yes',
          },
          {
            name: 'Avoid Buggy IPs',
            value: resource.spec.avoidBuggyIPs ? 'Yes' : 'No',
          },
          resource.spec.serviceAllocation ? {
            name: "Service Allocation",
            value: <NameValueTable
              rows={[
                {
                  name: 'Priority',
                  value: resource.spec.serviceAllocation.priority || '-',
                },
                {
                  name: 'Namespaces',
                  value: resource.spec.serviceAllocation.namespaces ?
                    <MetadataDictGrid dict={resource.spec.serviceAllocation.namespaces as { [index: number]: string }} showKeys={false} /> :
                    '-',
                },
                {
                  name: 'Namespace Selectors',
                  value: <SelectorList selectors={resource.spec.serviceAllocation.namespaceSelectors} />,
                },
                {
                  name: 'Service Selectors',
                  value: <SelectorList selectors={resource.spec.serviceAllocation.serviceSelectors} />,
                }
              ]}
            />
          }: null,
          {
            name: 'IPv4 Addresses',
            value:
              `${resource.status.assignedIPv4} Assigned / ${resource.status.availableIPv4} Available` ||
              '-',
          },
          {
            name: 'IPv6 Addresses',
            value:
              `${resource.status.assignedIPv6} Assigned / ${resource.status.availableIPv6} Available` ||
              '-',
          },
        ]
      }
    />
  );
}
