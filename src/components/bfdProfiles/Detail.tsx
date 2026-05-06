import { DetailsGrid } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useMetallbInstalled } from '../../hooks/useMetallbInstalled';
import { BFDProfile } from '../../resources/bfdProfile';
import { NotInstalledBanner } from '../common/CommonComponents';

export function BFDProfileDetail() {
  const { name, namespace } = useParams<{ name: string; namespace: string }>();
  const [, error] = BFDProfile.useGet(name, namespace);
  const { isInstalled, isMetallbCheckLoading } = useMetallbInstalled();

  if (!isInstalled) {
    return <NotInstalledBanner isLoading={isMetallbCheckLoading} />;
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={2} minHeight="200px">
        <Typography color="error">
          Error getting BFDProfile {name}: {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <DetailsGrid
      resourceType={BFDProfile}
      name={name}
      namespace={namespace}
      extraInfo={resource =>
        resource && [
          { name: 'Receive Interval (ms)', value: resource.spec.receiveInterval ?? 300 },
          { name: 'Transmit Interval (ms)', value: resource.spec.transmitInterval ?? 300 },
          { name: 'Detect Multiplier', value: resource.spec.detectMultiplier ?? 3 },
          { name: 'Echo Interval (ms)', value: resource.spec.echoInterval ?? 50 },
          { name: 'Echo Mode', value: resource.spec.echoMode ? 'Yes' : 'No' },
          { name: 'Passive Mode', value: resource.spec.passiveMode ? 'Yes' : 'No' },
          { name: 'Minimum TTL', value: resource.spec.minimumTtl ?? 254 },
        ]
      }
    />
  );
}
