import type { NextFunction, Request, Response } from "express"
import InvoiceModel from "./models/invoice.model"
import UserModel from "./models/user.model"
import { TicketModel } from "./models/tickets.model"

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
    tickets: typeof TicketModel
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