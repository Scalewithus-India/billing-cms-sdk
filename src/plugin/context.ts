/**
 * Host-injected context for providers, routes, and lifecycle hooks.
 * Prefer `lib.*` service APIs over raw `models` writes when possible.
 */

export interface Models {
    invoices: any;
    users: any;
    tickets: any;
    currencies: any;
    options: any;
    products: any;
    productGroups: any;
    emailTemplates: any;
    apiKeys: any;
    authenticationMethods: any;
    countries: any;
    backends: any;
    backendGroups: any;
    logs: any;
    transactions: any;
    userServices: any;
    wallets: any;
    walletTransactions: any;
    navigation: any;
}

export interface InvoiceItemData {
    name: string;
    description: string;
    quantity: number;
    price: number;
    type?: string;
}

export interface InvoiceToData {
    name: string;
    email: string;
    address: string;
    company?: string;
    taxId?: string;
}

export interface CreateAdminInvoiceData {
    userId: string;
    number?: string;
    date: string | Date;
    dueDate: string | Date;
    items: InvoiceItemData[];
    invoiceTo?: InvoiceToData;
    tax?: number;
    status?: string;
    notes?: string;
}

export interface InvoiceService {
    createAdminInvoice(data: CreateAdminInvoiceData): Promise<any>;
    addPayment(invoiceId: string, amount: number, gateway?: string, txnID?: string): Promise<any>;
    [key: string]: any;
}

export interface PluginLogger {
    info(message: string, meta?: unknown): void;
    warn(message: string, meta?: unknown): void;
    error(message: string, meta?: unknown): void;
    debug?(message: string, meta?: unknown): void;
}

export interface PluginEmailApi {
    /** Queue a templated email for a user. */
    queueEmail(
        userId: string,
        template: string,
        context?: Record<string, unknown>,
    ): Promise<unknown>;
}

/**
 * Namespaced plugin helpers. Options are stored as `plugin:<pluginId>:<identifier>`.
 */
export interface PluginLib {
    getOption(identifier: string): Promise<string | boolean | null | number>;
    setOption(
        identifier: string,
        value: string | boolean | number | null,
        ops?: { cachable?: boolean },
    ): Promise<string | boolean | null | number>;
    invoiceService: InvoiceService;
    /** Structured logger (host-provided). */
    logger: PluginLogger;
    /** Email queue helpers (host-provided). */
    email: PluginEmailApi;
}

export interface Context {
    models: Models;
    lib: PluginLib;
}

/** Alias used by lifecycle hooks — same as Context. */
export type HookContext = Context;
