import { ResourceListView } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import Service from '@kinvolk/headlamp-plugin/lib/K8s/service';

export function IPAssignmentsList() {
  return (
    <ResourceListView
      title="IP Assignments"
      resourceClass={Service}
      filterFunction={service => service.spec.type === 'LoadBalancer'}
      columns={[
        'name',
        'namespace',
        {
          id: 'externalIPs',
          label: 'Assigned IP',
          getValue: service => {
            const ingress = service.status?.loadBalancer?.ingress ?? [];
            return ingress
              .map((i: { ip?: string; hostname?: string }) => i.ip ?? i.hostname)
              .filter(Boolean)
              .join(', ') || '-';
          },
        },
        {
          id: 'pool',
          label: 'Pool',
          getValue: service =>
            service.metadata?.annotations?.['metallb.universe.tf/ip-allocated-from-pool'] ?? '-',
        },
        'age',
      ]}
    />
  );
}
