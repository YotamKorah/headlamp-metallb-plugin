import { DetailsGrid, NameValueTable } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useMetallbInstalled } from '../../hooks/useMetallbInstalled';
import { Community } from '../../resources/community';
import { NotInstalledBanner } from '../common/CommonComponents';

export function CommunityDetail() {
  const { name, namespace } = useParams<{ name: string; namespace: string }>();
  const [, error] = Community.useGet(name, namespace);
  const { isInstalled, isMetallbCheckLoading } = useMetallbInstalled();

  if (!isInstalled) {
    return <NotInstalledBanner isLoading={isMetallbCheckLoading} />;
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={2} minHeight="200px">
        <Typography color="error">
          Error getting Community {name}: {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <DetailsGrid
      resourceType={Community}
      name={name}
      namespace={namespace}
      extraInfo={resource =>
        resource && [
          {
            name: 'Communities',
            value:
              resource.spec.communities && resource.spec.communities.length > 0 ? (
                <NameValueTable
                  rows={resource.spec.communities.map(c => ({
                    name: c.name || '-',
                    value: c.value || '-',
                  }))}
                />
              ) : (
                '-'
              ),
          },
        ]
      }
    />
  );
}
