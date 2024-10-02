import type { NextFunction, Request, Response } from "express"
import type { DocumentType, ReturnModelType } from "@typegoose/typegoose"

export interface PaymentGatewayConfig {
    name: string
    identifier: string
    type: "text" | "number" | "password" | "checkbox" | "radio" | "select" | "textarea"
    validator?: "string" | ((value: string | number | boolean) => boolean)
    description?: string
}

export interface Models {
    [key: string]: ReturnModelType<any>
}

export interface Lib {
    models: Models
}

export interface PaymentGateway {
    name: string
    icon: string
    constructor(lib: Lib): void;
    isAviable(): Promise<boolean>
    config(): Promise<PaymentGatewayConfig[]>
    callback?(req: Request, res: Response, next?: NextFunction): Promise<void>
    webhook?(req: Request, res: Response, next?: NextFunction): Promise<void>
    initiate(invoiceID: string): Promise<string>
}