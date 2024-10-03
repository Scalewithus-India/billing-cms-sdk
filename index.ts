import type { NextFunction, Request, Response } from "express"
import InvoiceModel from "./models/invoice.model"
import UserModel from "./models/user.model"
import { TicketModel } from "./models/tickets.model"
import CurrencyModel from "./models/currency.model"
import OptionModel from "./models/option.model"
import ProductModel from "./models/product.model"
import { EmailTemplateModel } from "./models/email-template.model" // Fixed typo in file name
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

export declare abstract class PaymentGateway { 
    name: string
    icon: string
    constructor(lib: Lib);
    abstract isAvailable(): Promise<boolean> | boolean
    abstract config(): Promise<PaymentGatewayConfig[]> | PaymentGatewayConfig[]
    callback?(req: Request, res: Response, next?: NextFunction): Promise<void> | void
    webhook?(req: Request, res: Response, next?: NextFunction): Promise<void> | void
    abstract initiate(invoiceID: string): Promise<string> | string
}