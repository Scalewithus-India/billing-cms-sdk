import type { NextFunction, Request, Response } from "express"
import InvoiceModel from "./models/invoice.model"
import UserModel from "./models/user.model"
import { TicketModel } from "./models/tickets.model"
import CurrencyModel from "./models/currency.model"
import OptionModel from "./models/option.model"
import ProductModel from "./models/product.model"
import { EmailTemplateModel } from "./models/email-template.nodel"
import ProductGroupModel from "./models/product-group.model"
import { APIKeyModel } from "./models/api-keys.model"
import AuthenticationMethodModel from "./models/authentication-method.model"
import CountryModel from "./models/country-state.model"

export interface PaymentGatewayConfig {
    name: string
    identifier: string
    type: "text" | "number" | "password" | "checkbox" | "radio" | "select" | "textarea"
    validator?: "string" | ((value: string | number | boolean) => boolean)
    description?: string
}

export interface Models {
    invoices: typeof InvoiceModel,
    users: typeof UserModel,
    tickets: typeof TicketModel,
    currencies: typeof CurrencyModel,
    options: typeof OptionModel,
    products: typeof ProductModel,
    productGroups: typeof ProductGroupModel,
    emailTemplates: typeof EmailTemplateModel,
    apiKeys: typeof APIKeyModel,
    authenticationMethods: typeof AuthenticationMethodModel,
    countries: typeof CountryModel,
}


export interface Lib {
    models: Models
}

export declare class PaymentGateway {
    name: string
    icon: string
    constructor(lib: Lib);
    isAviable(): Promise<boolean>
    config(): Promise<PaymentGatewayConfig[]>
    callback?(req: Request, res: Response, next?: NextFunction): Promise<void>
    webhook?(req: Request, res: Response, next?: NextFunction): Promise<void>
    initiate(invoiceID: string): Promise<string>
}