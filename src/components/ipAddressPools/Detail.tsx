import {
  DetailsGrid, MetadataDictGrid,
  NameValueTable, NameValueTableRow, SectionBox,
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


  const getIPv4AddressAssignmentStatus = (resource: IPAddressPool): NameValueTableRow[] => {
    const rows = [];
    if (resource.status?.assignedIPv4 || resource.status?.availableIPv4) {
      rows.push({
        name: 'Total',
        value: (resource.status?.assignedIPv4 || 0) + (resource.status?.availableIPv4 || 0),
      })
      rows.push({
        name: 'Assigned',
        value: resource.status.assignedIPv4 || 0,
      })
      rows.push({
        name: "Available",
        value: resource.status.availableIPv4 || 0,
      })
    }
    return rows;
  }
  const getIPv6AddressAssignmentStatus = (resource: IPAddressPool): NameValueTableRow[] => {
    const rows = [];
    if (resource.status?.assignedIPv6 || resource.status?.availableIPv6) {
      rows.push({
        name: 'Total',
        value: (resource.status?.assignedIPv6 || 0) + (resource.status?.availableIPv6 || 0),
      })
      rows.push({
        name: 'Assigned',
        value: resource.status.assignedIPv6 || 0,
      })
      rows.push({
        name: "Available",
        value: resource.status.availableIPv6 || 0,
      })
    }
    return rows;
  }

  function getStatusRows(resource: IPAddressPool): NameValueTableRow[] {
    const rows = [];
    const ipv4 = getIPv4AddressAssignmentStatus(resource);
    if (ipv4.length > 0) {
      rows.push({
        name: 'IPv4 Addresses',
        value: <NameValueTable rows={ipv4}/>
      });
    }

    const ipv6 = getIPv6AddressAssignmentStatus(resource);
    if (ipv6.length > 0) {
      rows.push({
        name: 'IPv6 Addresses',
        value: <NameValueTable rows={ipv6}/>
      })
    }

    return rows;
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
          }: {
            name: 'Service Allocation',
            value: '-'
          }
        ]
      }
      extraSections={resource =>
        resource && resource?.status
          ? [
            {
              id: 'ipaddresspool-status',
              section: (
                <SectionBox title="Status">
                  <NameValueTable
                    rows={getStatusRows(resource)}
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
