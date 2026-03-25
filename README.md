# headlamp-metallb-plugin

This project implements a plugin for the [Headlamp Project](https://github.com/kubernetes-sigs/headlamp) for managing [MetalLB](https://github.com/metallb/metallb) Resources.

- Allows users to view and manage MetalLB resources in the Headlamp UI.
- Provides a user-friendly interface for interacting with MetalLB in Kubernetes clusters.

## Phase 1 scope

Phase 1 focuses only on the `IPAddressPool` CRD:

- List `IPAddressPool` objects across namespaces.
- View `IPAddressPool` details.
- Create `IPAddressPool` resources from YAML.
- Edit `IPAddressPool` resources with YAML-only editing.
- Delete `IPAddressPool` resources.

### Phase 1 behavior choices

- Works with `IPAddressPool` resources in any namespace.
- Create template defaults to namespace `metallb-system`.
- Edit flow is patch-preferred.
- Advanced features are deferred.

## Phase 2 roadmap

Planned order for next additions:

1. `L2Advertisement`
2. `BGPAdvertisement`
3. Form-based UX for `IPAddressPool`
