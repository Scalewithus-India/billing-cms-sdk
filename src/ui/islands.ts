/** Admin portal vs client portal for full plugin pages. */
export type PluginPageArea = "admin" | "client";

export interface WebComponentConfig {
    identifier: string;
    name: string;
    description?: string;
    type: "text" | "password" | "number" | "boolean" | "select" | "textarea";
    defaultValue?: any;
    required?: boolean;
    options?: Array<{ label: string; value: any }>;
    validation?: string | ((value: any) => boolean);
}

export interface WebComponentDefinition {
    name: string;
    displayName: string;
    description?: string;
    icon?: string;
    type: "service-management" | "dashboard" | "account-info" | "custom";
    /** 'vue' = ESM Vue island; 'legacy' = vanilla JS (default) */
    runtime?: "vue" | "legacy";
    /** host = titled card from host; none = plugin owns outer chrome */
    chrome?: "host" | "none";
    context?: string[];
    position?: "top" | "bottom" | "sidebar" | "main";
    priority?: number;
    entrypoint: string;
    dependencies?: string[];
    permissions?: string[];
    config?: WebComponentConfig[];
}

export interface PluginPageMenu {
    label: string;
    /** Match an existing sidebar section label. Defaults to "Extensions". */
    section?: string;
    icon?: string;
    order?: number;
    /** Nest under another page's `name` from the same plugin. */
    parent?: string;
}

/** Full navigable page contributed by a plugin (admin/client addon routes). */
export interface PluginPageDefinition {
    name: string;
    displayName: string;
    description?: string;
    icon?: string;
    area: PluginPageArea;
    /** URL slug under /adminarea|clientarea/addon/<plugin>/… */
    path: string;
    runtime?: "vue" | "legacy";
    chrome?: "host" | "none";
    entrypoint: string;
    permissions?: string[];
    menu?: PluginPageMenu;
}

/** Injected into Vue islands as `pluginApi` (`inject('pluginApi')`). Runtime kit: `@billing-cms/plugin-ui`. */
export interface PluginUiApi {
    service: {
        getId(): string;
        getData(): any;
        refresh(): Promise<void>;
        performAction(action: string, params?: any): Promise<any>;
    };
    page?: {
        getName(): string;
        getPath(): string;
        getParams(): Record<string, string>;
        getQuery(): Record<string, string>;
        getArea(): PluginPageArea;
    };
    ui: {
        showToast(message: string, type?: "success" | "error" | "warning" | "info"): void;
        showModal(content: string | HTMLElement, options?: any): Promise<any>;
        showConfirm(message: string, title?: string): Promise<boolean>;
        navigate(path: string): void;
    };
    http: {
        get(url: string, options?: any): Promise<any>;
        post(url: string, data?: any, options?: any): Promise<any>;
        put(url: string, data?: any, options?: any): Promise<any>;
        delete(url: string, options?: any): Promise<any>;
    };
    plugin: {
        getId(): string;
        getConfig(key?: string): Promise<any>;
        setConfig(key: string, value: any): Promise<void>;
        callBackend(method: string, params?: any, timeoutMs?: number): Promise<any>;
    };
    utils: {
        formatCurrency(amount: number, currency?: string): string;
        formatDate(date: string | Date, format?: string): string;
        validateEmail(email: string): boolean;
        generateId(): string;
    };
}
