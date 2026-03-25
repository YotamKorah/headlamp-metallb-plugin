# headlamp-metallb-plugin

This repository contains a [Headlamp](https://github.com/kubernetes-sigs/headlamp) plugin for managing [MetalLB](https://github.com/metallb/metallb) resources.

The plugin currently focuses on **MetalLB IPAddressPool** resources and adds dedicated list and details pages inside Headlamp.

## What the plugin provides

- A dedicated **MetalLB** sidebar section.
- A table view for `IPAddressPool` resources with custom columns:
  - addresses
  - auto-assign status
- A details page for each `IPAddressPool` showing key spec and status fields.
- YAML-based create flow (`Create IPAddressPool`).
- YAML patch editing for existing pools, with validation that prevents changing `metadata.name` and `metadata.namespace` during edits.

## Supported MetalLB resources

At the moment, this plugin supports:

- `IPAddressPool` (`metallb.io/v1beta1`, namespaced)

Other MetalLB resources can be added later following the same pattern used in `src/resources/` and `src/components/`.

## Routes and navigation

- List route: `/metallb/ipaddresspools`
- Details route: `/metallb/ipaddresspools/:namespace/:name`

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
- `src/components/ipAddressPools/List.tsx` - list view
- `src/components/ipAddressPools/Detail.tsx` - details view
- `src/components/ipAddressPools/YamlEditor.tsx` - create/edit YAML dialog
- `src/utils/ipAddressPool.ts` - YAML template and patch building helpers
- `src/utils/ipAddressPool.test.ts` - tests for utility logic

## Contributing

Contributions are welcome. For changes:

1. Keep scope focused and follow existing TypeScript patterns.
2. Add or update tests where logic changes.
3. Run `npm run tsc`, `npm run lint`, and `npm run test` before opening a PR.
