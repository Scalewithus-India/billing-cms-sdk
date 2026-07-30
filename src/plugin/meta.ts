import type { PluginEngines } from "./engines";
import type { WebComponentDefinition, PluginPageDefinition } from "../ui/islands";

export interface PluginMeta {
    name: string;
    version: string;
    author: string;
    description: string;
    components?: Record<string, unknown>;
    webComponents?: WebComponentDefinition[];
    pages?: PluginPageDefinition[];
    /** SDK / host version ranges — warn-only on mismatch */
    engines?: PluginEngines;
    /**
     * Documentation-only. Host infers capabilities from filesystem
     * (`payment-gateway.ts`, `hooks.ts`, etc.).
     */
    provides?: string[];
}
