# billing-cms-sdk

Shared TypeScript contracts for Billing CMS plugins: payment gateways, backend providers, domain registrars, analytics, and UI contributions (`webComponents` + `pages`).

## Install

From a plugin directory (local workspace or git dependency):

```bash
bun add billing-cms-sdk
# or
npm install billing-cms-sdk
```

```ts
import {
  PaymentGateway,
  BackendProvider,
  type PluginPageDefinition,
  type WebComponentDefinition,
  type PluginUiApi,
  type Context,
} from "billing-cms-sdk";
```

## Capability map

| Capability | How the host discovers it | Primary export / file |
|------------|---------------------------|------------------------|
| Payment gateway | `payment-gateway.ts` | `PaymentGateway` |
| Backend provider | `backend-provider.ts` | `BackendProvider` |
| Domain registrar | `domain-registrar-provider.ts` | `DomainRegistrarProvider` |
| Analytics | `analytics-provider.ts` | `AnalyticsProvider` |
| API routes | `routes.ts` | `BasePluginRouteProvider` / route array |
| Hooks | `hooks.ts` | named exports (`onInit`, `onActive`, `onDeactivate`, `before_*`, `after_*`) |
| Email templates | `email-templates.ts` | template provider |
| Embedded UI | `plugin.json` → `webComponents[]` | `WebComponentDefinition` |
| Full pages | `plugin.json` → `pages[]` | `PluginPageDefinition` |

`provides` in `plugin.json` is documentation-only. The host infers capabilities from files and arrays on disk.

## UI: widgets vs pages

**Widgets (`webComponents`)** — embedded on host screens (usually service detail) by `context` + `position`.

```json
{
  "webComponents": [
    {
      "name": "vps-management",
      "displayName": "VPS Server Management",
      "type": "service-management",
      "runtime": "vue",
      "chrome": "host",
      "context": ["scalewithus-vps"],
      "position": "main",
      "entrypoint": "vps-management.mjs"
    }
  ]
}
```

**Pages (`pages`)** — full navigable admin/client screens with optional sidebar menu items.

```json
{
  "pages": [
    {
      "name": "plugin-info",
      "displayName": "VPS Plugin Info",
      "area": "admin",
      "path": "info",
      "runtime": "vue",
      "chrome": "none",
      "entrypoint": "plugin-info.mjs",
      "menu": {
        "label": "VPS plugin info",
        "section": "Extensions",
        "order": 10
      }
    }
  ]
}
```

URLs:

- Admin: `/adminarea/addon/<plugin-id>/<path>`
- Client: `/clientarea/addon/<plugin-id>/<path>`

Reference example: [`plugins/scalewithus-vps`](../plugins/scalewithus-vps) → `/adminarea/addon/scalewithus-vps/info`.

## `PluginUiApi` (island runtime)

Injected as `pluginApi` into Vue islands (and exposed on `window.billingCMS.plugins[id]`).

| Namespace | Service widgets | Addon pages |
|-----------|-----------------|-------------|
| `service.*` | Bound to the current service | Usually empty / no-op |
| `page.*` | Absent | `getName`, `getPath`, `getParams`, `getQuery`, `getArea` |
| `ui.*` | Toast, confirm, navigate | Same |
| `http.*` | Calls `/api/v1/plugins/<id>/…` (relative) or absolute `/…` | Same |
| `plugin.*` | Config + `callBackend` | Same |
| `utils.*` | Formatting helpers | Same |

```vue
<script setup>
import { inject } from 'vue'
import { UButton } from '@billing-cms/plugin-ui'

/** @type {import('billing-cms-sdk').PluginUiApi} */
const api = inject('pluginApi')
</script>
```

Host UI kit: import from `@billing-cms/plugin-ui` (resolved at runtime via the host import map). Build SFCs with `plugins/_tooling/build-ui.mjs`.

## Further reading

- [Plugin developer docs](../plugins/docs/README.md)
- [UI pages](../plugins/docs/ui-pages.md)
- [UI components](../plugins/docs/ui-components.md)
- [Routes & hooks](../plugins/docs/routes-and-hooks.md)
- [SDK usage in plugins](../plugins/docs/sdk.md)
