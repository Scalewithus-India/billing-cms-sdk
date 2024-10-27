import type { NextFunction, Request, Response } from "express"
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
    abstract initiate(invoiceID: string): Promise<string> | string
}