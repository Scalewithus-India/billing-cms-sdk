import type { Context } from "./context";

/**
 * Canonical lifecycle hook names (export these from hooks.ts).
 * Legacy aliases (`onActive` / `onInit` / `onDeactivate`) still resolve with a warning.
 */
export const LIFECYCLE_HOOKS = {
    activate: "onPluginActivate",
    init: "onPluginInit",
    deactivate: "onPluginDeactivate",
    uninstall: "onPluginUninstall",
    migrate: "onPluginMigrate",
} as const;

export type LifecycleHookName = (typeof LIFECYCLE_HOOKS)[keyof typeof LIFECYCLE_HOOKS];

export type LifecycleHookFn = (context: Context) => Promise<unknown> | unknown;

/** Global-event hooks: before_<event> / after_<event> */
export type GlobalEventHookFn = (
    payload: Record<string, unknown>,
    context?: Context,
) => Promise<unknown> | unknown;

export interface LifecycleHookExports {
    onPluginActivate?: LifecycleHookFn;
    onPluginInit?: LifecycleHookFn;
    onPluginDeactivate?: LifecycleHookFn;
    onPluginUninstall?: LifecycleHookFn;
    onPluginMigrate?: LifecycleHookFn;
    /** @deprecated Prefer onPluginActivate */
    onActive?: LifecycleHookFn;
    /** @deprecated Prefer onPluginInit */
    onInit?: LifecycleHookFn;
    /** @deprecated Prefer onPluginDeactivate */
    onDeactivate?: LifecycleHookFn;
}
