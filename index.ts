// Express types - made optional to avoid dependency issues
type Request = any;
type Response = any;
type NextFunction = any;
// import type InvoiceModel from "./models/invoice.model"
// import type UserModel from "./models/user.model"
// import type { TicketModel } from "./models/tickets.model"
// import type CurrencyModel from "./models/currency.model"
// import type OptionModel from "./models/option.model"
// import type ProductModel from "./models/product.model"
// import type { EmailTemplateModel } from "./models/email-template.model" // Fixed typo in file name
// import type ProductGroupModel from "./models/product-group.model"
// import type { APIKeyModel } from "./models/api-keys.model"
// import type AuthenticationMethodModel from "./models/authentication-method.model"
// import type CountryModel from "./models/country-state.model"

export interface PaymentGatewayConfig {
    name: string
    identifier: string
    type: "text" | "number" | "password" | "checkbox" | "radio" | "select" | "textarea"
    validator?: string | ((value: string | number | boolean) => boolean)
    description?: string
    default?: string | number | boolean
}

export interface BackendProviderConfig {
    type: string
    identifier: string
    name: string
    description: string
    defaultValue?: any
    required?: boolean
    validation?: string
}

export interface Models {
    invoices: any,
    users: any,
    tickets: any,
    currencies: any,
    options: any,
    products: any,
    productGroups: any,
    emailTemplates: any,
    apiKeys: any,
    authenticationMethods: any,
    countries: any,
    backends: any,
    backendGroups: any,
    logs: any,
    transactions: any,
    userServices: any,
    wallets: any,
    walletTransactions: any,
    navigation: any,
}

export declare abstract class PluginLib {
    abstract getOption(identifier: string): Promise<string | boolean | null | number>
    abstract setOption(identifier: string, value: string | boolean | number | null, ops: any): Promise<string | boolean | null | number>
    invoiceService: any
}

export interface Context {
    models: Models
    lib: PluginLib
}

export declare abstract class PaymentGateway {
    name: string
    icon: string
    constructor(lib: Context);
    abstract isAvailable(): Promise<boolean> | boolean
    abstract config(): Promise<PaymentGatewayConfig[]> | PaymentGatewayConfig[]
    callback?(req: Request, res: Response, next?: NextFunction): Promise<void> | void
    webhook?(req: Request, res: Response, next?: NextFunction): Promise<void> | void
    abstract initiate(invoiceID: string, amount: number): Promise<string> | string
}

export declare abstract class BackendProvider {
    name: string
    icon?: string
    constructor(lib: Context);
    abstract config(): BackendProviderConfig[] | Promise<BackendProviderConfig[]>
    testConnection?(config: Record<string, any>): Promise<{ success: boolean; message: string; details?: any }>
    createAccount?(config: Record<string, any>, backendConfig: Record<string, any>, userService: any, product: any): Promise<any>
    suspendAccount?(config: Record<string, any>, backendConfig: Record<string, any>, userService: any, product: any): Promise<any>
    unsuspendAccount?(config: Record<string, any>, backendConfig: Record<string, any>, userService: any, product: any): Promise<any>
    terminateAccount?(config: Record<string, any>, backendConfig: Record<string, any>, userService: any, product: any): Promise<any>
    getAccountInfo?(config: Record<string, any>, backendId: string, accountId: string): Promise<any>
    customFields?(config: Record<string, any>, backendGroupId?: string): Promise<any[]> | any[]
    validateUserInput?(config: Record<string, any>, userInputs: Record<string, any>): Promise<{ isValid: boolean; errors?: Record<string, string> }> | { isValid: boolean; errors?: Record<string, string> }
    productConfig?(config: Record<string, any>): Promise<BackendProviderConfig[]> | BackendProviderConfig[]
    serverSingleSignOn?(config: Record<string, any>): Promise<{ success: boolean; url?: string; message?: string }> | { success: boolean; url?: string; message?: string }
    clientSingleSignOn?(config: Record<string, any>, backendConfig: Record<string, any>, userService: any, product: any): Promise<{ success: boolean; url?: string; message?: string }> | { success: boolean; url?: string; message?: string }
}

// Domain Registrar Provider Types
export interface DomainRegistrarProviderConfig {
    type: 'text' | 'password' | 'number' | 'boolean' | 'select' | 'textarea';
    identifier: string;
    name: string;
    description?: string;
    defaultValue?: any;
    required?: boolean;
    options?: Array<{ label: string; value: any }>;
}

export interface DomainAvailabilityResult {
    domain: string;
    available: boolean;
    premium?: boolean;
    price?: number;
    currency?: string;
    message?: string;
}

export interface DomainContactInfo {
    firstName: string;
    lastName: string;
    organization?: string;
    email: string;
    phone: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface DomainRegistrationInfo {
    domain: string;
    years: number;
    nameservers?: string[];
    privacyProtection?: boolean;
    autoRenew?: boolean;
    registrant: DomainContactInfo;
    admin?: DomainContactInfo;
    tech?: DomainContactInfo;
    billing?: DomainContactInfo;
}

export interface DomainRegistrationResult {
    success: boolean;
    domain: string;
    orderId?: string;
    expiryDate?: Date;
    message?: string;
    details?: any;
}

export interface DomainInfo {
    domain: string;
    status: 'active' | 'expired' | 'pending' | 'suspended' | 'redemption' | 'pendingDelete';
    registrationDate?: Date;
    expiryDate?: Date;
    nameservers?: string[];
    locked?: boolean;
    autoRenew?: boolean;
    privacyProtection?: boolean;
    contacts?: {
        registrant?: DomainContactInfo;
        admin?: DomainContactInfo;
        tech?: DomainContactInfo;
        billing?: DomainContactInfo;
    };
}

// TLD pricing info for plugin to advertise supported TLDs
export interface TldYearPricing {
    years: number;      // 1-10
    register: number;   // Registration price
    renew: number;      // Renewal price
    transfer: number;   // Transfer price (-1 = not supported)
}

export interface TldPricingInfo {
    extension: string;           // e.g., ".com"
    displayName?: string;        // e.g., "Commercial"
    category?: string;           // e.g., "Popular", "Tech"
    pricing: TldYearPricing[];   // Multi-year pricing
    currency?: string;           // Currency code (e.g., "USD"). If not specified, assumes system base currency
    minYears?: number;           // Default: 1
    maxYears?: number;           // Default: 10
    supportsPrivacy?: boolean;   // WHOIS privacy support
    supportsTransfer?: boolean;  // Transfer support
}

export enum ECustomFieldType {
    text = 'text',
    link = 'link',
    password = 'password',
    dropdown = 'dropdown',
    tickbox = 'tickbox',
    textarea = 'textarea',
    domain = 'domain'
}

export interface SelectOption {
    key?: string;
    value?: string;
}

export interface ICustomField {
    name: string;
    type: ECustomFieldType;
    description: string;
    validation: string;
    displayOrder: number;
    adminOnly: boolean;
    requiredField: boolean;
    showOnOrderForm: boolean;
    showOnInvoice: boolean;
    _id?: string;
    value?: string;
    selectOptions: SelectOption[];
    identifier: string;
}

export declare abstract class DomainRegistrarProvider {
    name: string;
    icon?: string;
    constructor(lib: Context);
    abstract config(): DomainRegistrarProviderConfig[] | Promise<DomainRegistrarProviderConfig[]>;
    testConnection?(config: Record<string, any>): Promise<{ success: boolean; message: string; details?: any }>;
    checkAvailability?(config: Record<string, any>, domain: string): Promise<DomainAvailabilityResult>;
    checkBulkAvailability?(config: Record<string, any>, domains: string[]): Promise<DomainAvailabilityResult[]>;
    registerDomain?(config: Record<string, any>, domainInfo: DomainRegistrationInfo): Promise<DomainRegistrationResult>;
    renewDomain?(config: Record<string, any>, domain: string, years: number): Promise<{ success: boolean; expiryDate?: Date; message?: string }>;
    transferDomain?(config: Record<string, any>, domain: string, authCode: string, years?: number): Promise<{ success: boolean; orderId?: string; message?: string }>;
    getDomainInfo?(config: Record<string, any>, domain: string): Promise<DomainInfo>;
    getNameservers?(config: Record<string, any>, domain: string): Promise<string[]>;
    setNameservers?(config: Record<string, any>, domain: string, nameservers: string[]): Promise<{ success: boolean; message?: string }>;
    getLockStatus?(config: Record<string, any>, domain: string): Promise<boolean>;
    setLockStatus?(config: Record<string, any>, domain: string, locked: boolean): Promise<{ success: boolean; message?: string }>;
    getAuthCode?(config: Record<string, any>, domain: string): Promise<{ success: boolean; authCode?: string; message?: string }>;
    getContacts?(config: Record<string, any>, domain: string): Promise<DomainInfo['contacts']>;
    updateContacts?(config: Record<string, any>, domain: string, contacts: DomainInfo['contacts']): Promise<{ success: boolean; message?: string }>;
    getSupportedTlds?(config: Record<string, any>): Promise<TldPricingInfo[]>;
}