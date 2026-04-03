import { MetadataDictGrid, NameValueTable } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Box, CircularProgress, Divider, Grid, Link as MuiLink, Typography } from '@mui/material';

interface NotInstalledBannerProps {
  isLoading?: boolean;
}

interface MatchExpression {
  key: string;
  operator: string;
  values?: string[];
}

interface LabelSelector {
  matchLabels?: Record<string, string>;
  matchExpressions?: MatchExpression[];
}

interface SelectorListProps {
  selectors?: LabelSelector[];
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
          {selector.matchLabels && Object.keys(selector.matchLabels).length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                Match Labels
              </Typography>
              <MetadataDictGrid dict={selector.matchLabels} showKeys />
            </Box>
          )}
          {selector.matchExpressions && selector.matchExpressions.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                Match Expressions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {selector.matchExpressions.map((expr, exprIndex) => (
                  <Box key={exprIndex}>
                    <NameValueTable
                      rows={[
                        {
                          name: 'Key',
                          value: expr.key || '-',
                        },
                        {
                          name: 'Operator',
                          value: expr.operator || '-',
                        },
                        {
                          name: 'Values',
                          value: expr.values?.length ? expr.values.join(', ') : '-',
                        },
                      ]}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          )}
          {index < selectors.length - 1 ? <Divider sx={{ my: 2 }} /> : null}
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
