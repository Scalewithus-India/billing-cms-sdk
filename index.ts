
import type { NextFunction, Request, Response } from "express"

export interface PaymentGatewayConfig {
    name: string
    identifire: string
    type: "text" | "number" | "password" | "checkbox" | "radio" | "select" | "textarea"
    descripion?: string

}


export interface PaymentGateway {
    name: string
    identifire: string
    icon: string
    isAviable(): Promise<boolean>
    config(): Promise<PaymentGatewayConfig[]>
    callback?(req: Request, res: Response, next?: NextFunction): Promise<void>
    webhook?(req: Request, res: Response, next?: NextFunction): Promise<void>
    initiate(invoiceID: string): Promise<string>
}