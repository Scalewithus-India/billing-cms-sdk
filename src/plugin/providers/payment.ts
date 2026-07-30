import type { Context } from "../context";

export interface PaymentGatewayConfig {
    name: string;
    identifier: string;
    type: "text" | "number" | "password" | "checkbox" | "radio" | "select" | "textarea";
    validator?: string | ((value: string | number | boolean) => boolean);
    description?: string;
    default?: string | number | boolean;
}

/**
 * Implement this interface in `payment-gateway.ts` (default export class).
 * Host constructs with `new YourGateway(context)`.
 */
export interface PaymentGateway {
    name: string;
    icon: string;
    isAvailable(): Promise<boolean> | boolean;
    config(): Promise<PaymentGatewayConfig[]> | PaymentGatewayConfig[];
    callback?(req: any, res: any, next?: any): Promise<void> | void;
    webhook?(req: any, res: any, next?: any): Promise<void> | void;
    initiate(invoiceID: string, amount: number): Promise<string> | string;
}

/** Optional base for authors who prefer `extends` — prefer `implements PaymentGateway`. */
export abstract class AbstractPaymentGateway implements PaymentGateway {
    abstract name: string;
    abstract icon: string;
    constructor(protected readonly context: Context) {}
    abstract isAvailable(): Promise<boolean> | boolean;
    abstract config(): Promise<PaymentGatewayConfig[]> | PaymentGatewayConfig[];
    abstract initiate(invoiceID: string, amount: number): Promise<string> | string;
}
