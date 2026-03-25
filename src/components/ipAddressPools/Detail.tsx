import {
  DetailsGrid,
  NameValueTable,
  SectionBox,
} from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IPAddressPool } from '../../resources/ipAddressPool';
import { IPAddressPoolYamlEditor } from './YamlEditor';

export function IPAddressPoolDetail() {
  const { name, namespace } = useParams<{ name: string; namespace: string }>();
  const [item, error] = IPAddressPool.useGet(name, namespace);
  const [editOpen, setEditOpen] = useState(false);

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
                id: 'ipaddresspool-spec',
                section: (
                  <SectionBox title="Specification">
                    <NameValueTable
                      rows={[
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
                      ]}
                    />
                  </SectionBox>
                ),
              },
            {
              id: 'ipaddresspool-status',
              section: (
                <SectionBox title="Status">
                  <NameValueTable
                    rows={[
                      {
                        name: 'IPv4 Addresses',
                        value: `${resource.status.assignedIPv4} Assigned / ${resource.status.availableIPv4} Available` || '-',
                      },
                      {
                        name: "IPv6 Addresses",
                        value: `${resource.status.assignedIPv6} Assigned / ${resource.status.availableIPv6} Available` || '-',
                      }
                    ]}
                  />
                </SectionBox>
              ),
            },
            ]
          : []
      }
    >
      <IPAddressPoolYamlEditor
        open={editOpen}
        item={item}
        onClose={() => setEditOpen(false)}
      />
    </DetailsGrid>
  );
}



