import type { Context } from "../context";
import type { BackendProviderConfig } from "./backend-config";

export type { BackendProviderConfig } from "./backend-config";

export interface BackendProvider {
    name: string;
    icon?: string;
    config(): BackendProviderConfig[] | Promise<BackendProviderConfig[]>;
    testConnection?(config: Record<string, any>): Promise<{ success: boolean; message: string; details?: any }>;
    createAccount?(config: Record<string, any>, backendConfig: Record<string, any>, userService: any, product: any): Promise<any>;
    suspendAccount?(config: Record<string, any>, backendConfig: Record<string, any>, userService: any, product: any): Promise<any>;
    unsuspendAccount?(config: Record<string, any>, backendConfig: Record<string, any>, userService: any, product: any): Promise<any>;
    terminateAccount?(config: Record<string, any>, backendConfig: Record<string, any>, userService: any, product: any): Promise<any>;
    getAccountInfo?(config: Record<string, any>, backendId: string, accountId: string): Promise<any>;
    customFields?(config: Record<string, any>, backendGroupId?: string): Promise<any[]> | any[];
    validateUserInput?(
        config: Record<string, any>,
        userInputs: Record<string, any>,
    ): Promise<{ isValid: boolean; errors?: Record<string, string> }> | { isValid: boolean; errors?: Record<string, string> };
    productConfig?(config: Record<string, any>): Promise<BackendProviderConfig[]> | BackendProviderConfig[];
    serverSingleSignOn?(
        config: Record<string, any>,
    ): Promise<{ success: boolean; url?: string; message?: string }> | { success: boolean; url?: string; message?: string };
    clientSingleSignOn?(
        config: Record<string, any>,
        backendConfig: Record<string, any>,
        userService: any,
        product: any,
    ): Promise<{ success: boolean; url?: string; message?: string }> | { success: boolean; url?: string; message?: string };
}

export abstract class AbstractBackendProvider implements BackendProvider {
    abstract name: string;
    icon?: string;
    constructor(protected readonly context: Context) {}
    abstract config(): BackendProviderConfig[] | Promise<BackendProviderConfig[]>;
}
