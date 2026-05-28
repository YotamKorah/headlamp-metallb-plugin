# headlamp-metallb-plugin

[![Artifact Hub](https://img.shields.io/endpoint?url=https://artifacthub.io/badge/repository/headlamp-metallb-plugin)](https://artifacthub.io/packages/search?repo=headlamp-metallb-plugin)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/YotamKorah/headlamp-metallb-plugin?style=flat)](https://github.com/YotamKorah/headlamp-metallb-plugin)
[![Lint, Type Check, Test, and Build](https://github.com/YotamKorah/headlamp-metallb-plugin/actions/workflows/ci.yaml/badge.svg)](https://github.com/YotamKorah/headlamp-metallb-plugin/actions/workflows/ci.yaml)

This repository contains a [Headlamp](https://github.com/kubernetes-sigs/headlamp) plugin for managing [MetalLB](https://github.com/metallb/metallb) resources.

The plugin currently supports key MetalLB resources and adds dedicated list and details pages inside Headlamp.

## What the plugin provides

- A dedicated **MetalLB** sidebar section.
- A table view for `IPAddressPool`, `L2Advertisement`, and `BGPAdvertisement` resources with resource-specific columns.
- A table view for `BGPPeer` resources with resource-specific columns.
- A details page for each supported resource showing key spec fields (and status fields where available).
- YAML helpers and patch builders for supported resources, with validation that prevents changing `metadata.name` and `metadata.namespace` during edits.

## Supported MetalLB resources

This plugin supports:

- `IPAddressPool` (`metallb.io/v1beta1`, namespaced)
- `L2Advertisement` (`metallb.io/v1beta1`, namespaced)
- `BGPAdvertisement` (`metallb.io/v1beta1`, namespaced)
- `BGPPeer` (`metallb.io/v1beta1`, namespaced)

Other MetalLB resources can be added later following the same pattern used in `src/resources/` and `src/components/`.

## Routes and navigation

- `IPAddressPool` list route: `/metallb/ipaddresspools`
- `IPAddressPool` details route: `/metallb/ipaddresspools/:namespace/:name`
- `L2Advertisement` list route: `/metallb/l2advertisements`
- `L2Advertisement` details route: `/metallb/l2advertisements/:namespace/:name`
- `BGPAdvertisement` list route: `/metallb/bgpadvertisements`
- `BGPAdvertisement` details route: `/metallb/bgpadvertisements/:namespace/:name`
- `BGPPeer` list route: `/metallb/bgppeers`
- `BGPPeer` details route: `/metallb/bgppeers/:namespace/:name`

## Development

Please refer to the [Headlamp plugin development guide](https://headlamp.dev/docs/latest/development/plugins/getting-started/) for general plugin development instructions.

Install dependencies:

```bash
npm install
```

Useful scripts:

- `npm start` - start plugin dev mode (watch)
- `npm run build` - production build
- `npm run tsc` - type-check TypeScript
- `npm run lint` - lint checks
- `npm run lint-fix` - auto-fix lint issues
- `npm run format` - format code
- `npm run test` - run tests
- `npm run storybook` - run Storybook
- `npm run storybook-build` - build Storybook
- `npm run i18n` - extract i18n strings
- `npm run package` - create plugin tarball

Typical local workflow:

1. Run `npm start`.
2. Make changes in `src/`.
3. Run `npm run tsc` and `npm run lint`.
4. Run `npm run test`.
5. Run `npm run build` before packaging/release.

## Project structure

- `src/index.tsx` - plugin registration (sidebar entries and routes)
- `src/resources/ipAddressPool.ts` - `IPAddressPool` resource class and types
- `src/resources/l2Advertisement.ts` - `L2Advertisement` resource class and types
- `src/resources/bgpAdvertisement.ts` - `BGPAdvertisement` resource class and types
- `src/resources/bgpPeer.ts` - `BGPPeer` resource class and types
- `src/components/ipAddressPools/List.tsx` - list view
- `src/components/ipAddressPools/Detail.tsx` - details view
- `src/components/l2Advertisements/List.tsx` - list view
- `src/components/l2Advertisements/Detail.tsx` - details view
- `src/components/bgpAdvertisements/List.tsx` - list view
- `src/components/bgpAdvertisements/Detail.tsx` - details view
- `src/components/bgpPeers/List.tsx` - list view
- `src/components/bgpPeers/Detail.tsx` - details view
- `src/utils/ipAddressPool.ts` - YAML template and patch building helpers
- `src/utils/ipAddressPool.test.ts` - tests for utility logic
- `src/utils/l2Advertisement.ts` - YAML template and patch building helpers
- `src/utils/l2Advertisement.test.ts` - tests for utility logic
- `src/utils/bgpAdvertisement.ts` - YAML template and patch building helpers
- `src/utils/bgpAdvertisement.test.ts` - tests for utility logic
- `src/utils/bgpPeer.ts` - YAML template and patch building helpers
- `src/utils/bgpPeer.test.ts` - tests for utility logic

## Contributing

Contributions are welcome. For changes:

1. Keep scope focused and follow existing TypeScript patterns.
2. Add or update tests where logic changes.
3. Run `npm run tsc`, `npm run lint`, and `npm run test` before opening a PR.
