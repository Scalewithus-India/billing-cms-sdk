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
    createAccount?(config: Record<string, any>, backendId: string, serviceData: any): Promise<any>
    suspendAccount?(config: Record<string, any>, backendId: string, accountId: string): Promise<any>
    unsuspendAccount?(config: Record<string, any>, backendId: string, accountId: string): Promise<any>
    terminateAccount?(config: Record<string, any>, backendId: string, accountId: string): Promise<any>
    getAccountInfo?(config: Record<string, any>, backendId: string, accountId: string): Promise<any>
    customFields?(config: Record<string, any>, backendGroupId?: string): Promise<any[]> | any[]
    validateUserInput?(config: Record<string, any>, userInputs: Record<string, any>): Promise<{ isValid: boolean; errors?: Record<string, string> }> | { isValid: boolean; errors?: Record<string, string> }
    productConfig?(config: Record<string, any>): Promise<BackendProviderConfig[]> | BackendProviderConfig[]
}