# billing-cms-sdk

Shared TypeScript contracts for Billing CMS **plugins** and **theme schema** (`0.1.0`).

The host discovers plugins/themes from the filesystem and injects a real `Context` into providers, routes, and lifecycle hooks. This package does **not** run plugins — it defines what authors implement.

## Install

```bash
# From a plugin directory (workspace)
bun add billing-cms-sdk@file:../../billing-cms-sdk
```

```ts
import {
  type PaymentGateway,
  type Context,
  BasePluginRouteProvider,
  LIFECYCLE_HOOKS,
  type PluginUiApi,
  type ThemeMeta,
} from "billing-cms-sdk";

// Subpaths
import type { ThemeMeta } from "billing-cms-sdk/theme";
import type { PluginUiApi } from "billing-cms-sdk/ui";
```

## Capability map

| Capability | How the host discovers it | SDK export / file |
|------------|---------------------------|-------------------|
| Payment gateway | `payment-gateway.ts` | `implements PaymentGateway` |
| Backend provider | `backend-provider.ts` | `implements BackendProvider` |
| Domain registrar | `domain-registrar-provider.ts` | `implements DomainRegistrarProvider` |
| Analytics | `analytics-provider.ts` | `implements AnalyticsProvider` |
| Email templates | `email-templates.ts` | `implements EmailTemplateProvider` |
| API routes | `routes.ts` | `extends BasePluginRouteProvider` or route array |
| Hooks | `hooks.ts` | `onPluginActivate` / `Init` / `Migrate` / `Deactivate` / `Uninstall` |
| Embedded UI | `plugin.json` → `webComponents[]` | `WebComponentDefinition` (+ runtime `@billing-cms/plugin-ui`) |
| Full pages | `plugin.json` → `pages[]` | `PluginPageDefinition` |
| Theme schema | `theme.json` | `ThemeMeta`, `themeConfigOptionKey()` |

`provides` in `plugin.json` is documentation-only. The host infers capabilities from files and arrays on disk.

## Context (lifecycle + providers + routes)

Lifecycle hooks and providers receive a full `Context`:

```ts
import type { Context } from "billing-cms-sdk";

export async function onPluginInit(context: Context) {
  const configured = await context.lib.getOption("api_key");
  context.lib.logger.info(`configured=${!!configured}`);
  // Prefer services over raw model dumps:
  // context.lib.invoiceService.addPayment(...)
  // context.lib.email.queueEmail(userId, "template", { ... })
}
```

| Surface | Purpose |
|---------|---------|
| `lib.getOption` / `setOption` | Namespaced as `plugin:<id>:<identifier>` |
| `lib.invoiceService` | Invoice create / addPayment |
| `lib.logger` | Host logger |
| `lib.email.queueEmail` | Queue templated email |
| `models.*` | Escape hatch (Mongoose models) — prefer `lib.*` for new code |

There is **no** `paymentGatewayRegistry` — gateways load via `payment-gateway.ts`.

## Routes

```ts
import { BasePluginRouteProvider, type PluginRoute } from "billing-cms-sdk";

export default class MyRoutes extends BasePluginRouteProvider {
  routes(): PluginRoute[] {
    return [
      {
        path: "/status",
        method: "get",
        access: ["admin"],
        handler: async (_req, res) => {
          res.json(this.successResponse({ ok: true }));
        },
      },
    ];
  }
}
```

Mounted at `/api/v1/plugins/<plugin-id>/<path>`.

## Engines

```json
{
  "engines": {
    "billing-cms-sdk": ">=0.1.0",
    "billing-cms": ">=1.0.0"
  }
}
```

Host **warns** on mismatch at discovery; it does not hard-fail.

## Themes

Themes are Nuxt SSR packages (`layouts/`, `partials/`, `pages/`). Type `theme.json` with:

```ts
import type { ThemeMeta } from "billing-cms-sdk/theme";
import { themeConfigOptionKey } from "billing-cms-sdk/theme";

const meta = { /* ... */ } satisfies ThemeMeta;
// Host stores config under themeConfigOptionKey(themeId)
```

Theme resolution, nav IA, and SSR stay in the host — not this package.

## UI islands

Types live here (`PluginUiApi`, `WebComponentDefinition`). The Vue runtime helpers are **`@billing-cms/plugin-ui`** (host import map → `/_plugin_runtime/ui.mjs`). Build islands with `plugins/_tooling/build-ui.mjs`.

## Package layout

```
src/
  index.ts          # barrel
  plugin/           # context, providers, routes, hooks, engines, meta
  theme/            # ThemeMeta + option key helper
  ui/               # islands + custom fields
```

## Version

Current: **0.1.0** (modular package; Context on hooks; `BasePluginRouteProvider` in SDK).
