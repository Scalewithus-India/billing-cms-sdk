import type { NextFunction, Request, Response } from "express"

export interface PaymentGatewayConfig {
    name: string
    type: "text" | "number" | "password" | "checkbox" | "radio" | "select" | "textarea"
    validator?: "string" | ((value: string | number | boolean) => boolean)
    description?: string
}

export interface PaymentGateway {
    name: string
    identifier: string
    icon: string
    isAviable(): Promise<boolean>
    config(): Promise<PaymentGatewayConfig[]>
    callback?(req: Request, res: Response, next?: NextFunction): Promise<void>
    webhook?(req: Request, res: Response, next?: NextFunction): Promise<void>
    initiate(invoiceID: string): Promise<string>
}