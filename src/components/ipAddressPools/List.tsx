import { ResourceListView } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { IPAddressPool } from '../../resources/ipAddressPool';
import { IPAddressPoolYamlEditor } from './YamlEditor';

export function IPAddressPoolsList() {
  const [createOpen, setCreateOpen] = useState(false);

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
        headerProps={{
          titleSideActions: [
            <Button key="create-ipaddresspool" variant="contained" onClick={() => setCreateOpen(true)}>
              Create IPAddressPool
            </Button>,
          ],
        }}
      />
      <IPAddressPoolYamlEditor
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        item={null}
      />
    </>
  );
}
