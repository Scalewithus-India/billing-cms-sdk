import type { Context } from "../context";

export interface DomainRegistrarProviderConfig {
    type: "text" | "password" | "number" | "boolean" | "select" | "textarea";
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
    status: "active" | "expired" | "pending" | "suspended" | "redemption" | "pendingDelete";
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

export interface TldYearPricing {
    years: number;
    register: number;
    renew: number;
    transfer: number;
}

export interface TldPricingInfo {
    extension: string;
    displayName?: string;
    category?: string;
    pricing: TldYearPricing[];
    currency?: string;
    minYears?: number;
    maxYears?: number;
    supportsPrivacy?: boolean;
    supportsTransfer?: boolean;
}

export interface DomainRegistrarProvider {
    name: string;
    icon?: string;
    config(): DomainRegistrarProviderConfig[] | Promise<DomainRegistrarProviderConfig[]>;
    testConnection?(config: Record<string, any>): Promise<{ success: boolean; message: string; details?: any }>;
    checkAvailability?(config: Record<string, any>, domain: string): Promise<DomainAvailabilityResult>;
    checkBulkAvailability?(config: Record<string, any>, domains: string[]): Promise<DomainAvailabilityResult[]>;
    registerDomain?(config: Record<string, any>, domainInfo: DomainRegistrationInfo): Promise<DomainRegistrationResult>;
    renewDomain?(
        config: Record<string, any>,
        domain: string,
        years: number,
    ): Promise<{ success: boolean; expiryDate?: Date; message?: string }>;
    transferDomain?(
        config: Record<string, any>,
        domain: string,
        authCode: string,
        years?: number,
    ): Promise<{ success: boolean; orderId?: string; message?: string }>;
    getDomainInfo?(config: Record<string, any>, domain: string): Promise<DomainInfo>;
    getNameservers?(config: Record<string, any>, domain: string): Promise<string[]>;
    setNameservers?(
        config: Record<string, any>,
        domain: string,
        nameservers: string[],
    ): Promise<{ success: boolean; message?: string }>;
    getLockStatus?(config: Record<string, any>, domain: string): Promise<boolean>;
    setLockStatus?(
        config: Record<string, any>,
        domain: string,
        locked: boolean,
    ): Promise<{ success: boolean; message?: string }>;
    getAuthCode?(
        config: Record<string, any>,
        domain: string,
    ): Promise<{ success: boolean; authCode?: string; message?: string }>;
    getContacts?(config: Record<string, any>, domain: string): Promise<DomainInfo["contacts"]>;
    updateContacts?(
        config: Record<string, any>,
        domain: string,
        contacts: DomainInfo["contacts"],
    ): Promise<{ success: boolean; message?: string }>;
    getSupportedTlds?(config: Record<string, any>): Promise<TldPricingInfo[]>;
}

export abstract class AbstractDomainRegistrarProvider implements DomainRegistrarProvider {
    abstract name: string;
    icon?: string;
    constructor(protected readonly context: Context) {}
    abstract config(): DomainRegistrarProviderConfig[] | Promise<DomainRegistrarProviderConfig[]>;
}
