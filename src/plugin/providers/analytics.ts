import type { Context } from "../context";

export interface AnalyticsEvent {
    name: string;
    data?: Record<string, any>;
    timestamp?: string;
}

export interface AnalyticsProviderConfig {
    type: "text" | "number" | "password" | "checkbox" | "radio" | "select" | "textarea";
    identifier: string;
    name: string;
    description?: string;
    default?: string | number | boolean;
    required?: boolean;
    validation?: string | ((value: any) => boolean);
}

export interface AnalyticsProvider {
    name: string;
    icon?: string;
    config(): AnalyticsProviderConfig[] | Promise<AnalyticsProviderConfig[]>;
    track(event: AnalyticsEvent): Promise<void> | void;
    pageView?(url: string, userData?: Record<string, any>): Promise<void> | void;
    isAvailable?(): Promise<boolean> | boolean;
}

export abstract class AbstractAnalyticsProvider implements AnalyticsProvider {
    abstract name: string;
    icon?: string;
    constructor(protected readonly context: Context) {}
    abstract config(): AnalyticsProviderConfig[] | Promise<AnalyticsProviderConfig[]>;
    abstract track(event: AnalyticsEvent): Promise<void> | void;
}
