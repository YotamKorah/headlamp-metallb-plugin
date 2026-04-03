import { Box, CircularProgress, Divider, Grid, Link as MuiLink, Typography } from '@mui/material';
import { serializeAsValidatedYAML, YAMLValue } from '../../utils/yaml';

interface NotInstalledBannerProps {
  isLoading?: boolean;
}

interface SelectorListProps {
  selectors?: Array<Record<string, YAMLValue>>;
  emptyText?: string;
}

export function SelectorList({ selectors, emptyText = '-' }: SelectorListProps) {
  if (!selectors?.length) {
    return <>{emptyText}</>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {selectors.map((selector, index) => (
        <Box key={index}>
          {(() => {
            const { yaml, error } = serializeAsValidatedYAML(selector);

            if (error) {
              return (
                <Box sx={{ pl: 2, py: 1 }}>
                  <Typography color="error" variant="body2">
                    Invalid YAML: {error}
                  </Typography>
                </Box>
              );
            }

            return (
              <Box
                component="pre"
                sx={{
                  pl: 2,
                  py: 1,
                  m: 0,
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace',
                }}
              >
                {yaml}
              </Box>
            );
          })()}
          {index < selectors.length - 1 ? <Divider /> : null}
        </Box>
      ))}
    </Box>
  );
}

export function NotInstalledBanner({ isLoading = false }: NotInstalledBannerProps) {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={2} minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={2} minHeight="200px">
      <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
        <Grid item>
          <Typography variant="h5">
            MetalLB was not detected on your cluster. If you haven't already, please install it.
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            Learn how to{' '}
            <MuiLink
              href="https://metallb.io/installation/"
              target="_blank"
              rel="noopener noreferrer"
            >
              install
            </MuiLink>{' '}
            MetalLB
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
