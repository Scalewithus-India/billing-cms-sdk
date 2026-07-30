import type { Context } from "./context";

export type PluginHttpMethod = "get" | "post" | "put" | "patch" | "delete" | "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface PluginRoute {
    path: string;
    method: PluginHttpMethod;
    /** Access roles, e.g. ['admin'], ['user'], ['*'] */
    access: string[];
    handler: (req: any, res: any, next?: any) => Promise<void> | void;
}

export interface PluginRouteProvider {
    routes(): PluginRoute[];
    onPluginInit?(): Promise<void> | void;
    onPluginActivate?(): Promise<void> | void;
    onPluginDeactivate?(): Promise<void> | void;
    /** @deprecated Prefer onPluginInit */
    onInit?(): Promise<void> | void;
    /** @deprecated Prefer onPluginActivate */
    onActive?(): Promise<void> | void;
    /** @deprecated Prefer onPluginDeactivate */
    onDeactivate?(): Promise<void> | void;
}

/**
 * Base class for `routes.ts` default exports.
 * Import from `billing-cms-sdk` (not host paths).
 */
export abstract class BasePluginRouteProvider implements PluginRouteProvider {
    protected context: Context;
    protected pluginId: string;

    constructor(context: Context, pluginId: string) {
        this.context = context;
        this.pluginId = pluginId;
    }

    abstract routes(): PluginRoute[];

    async onPluginInit(): Promise<void> {}
    async onPluginActivate(): Promise<void> {}
    async onPluginDeactivate(): Promise<void> {}

    /** @deprecated Prefer onPluginInit */
    async onInit(): Promise<void> {
        return this.onPluginInit();
    }

    /** @deprecated Prefer onPluginActivate */
    async onActive(): Promise<void> {
        return this.onPluginActivate();
    }

    /** @deprecated Prefer onPluginDeactivate */
    async onDeactivate(): Promise<void> {
        return this.onPluginDeactivate();
    }

    protected async validateUserServiceAccess(
        serviceId: string,
        userId: string,
    ): Promise<{ service: any; hasAccess: boolean; error?: string }> {
        try {
            if (!serviceId) {
                return { service: null, hasAccess: false, error: "Service ID is required" };
            }

            const service = await this.context.models.userServices
                .findById(serviceId)
                .populate("backendProvider");
            if (!service) {
                return { service: null, hasAccess: false, error: "Service not found" };
            }

            const hasAccess = service.user.toString() === userId.toString();
            if (!hasAccess) {
                return { service, hasAccess: false, error: "Access denied" };
            }

            if (service.status === "terminated") {
                return { service, hasAccess: false, error: "Service is terminated" };
            }

            return { service, hasAccess: true };
        } catch (error) {
            return {
                service: null,
                hasAccess: false,
                error: error instanceof Error ? error.message : "Failed to validate service access",
            };
        }
    }

    protected isAdminUser(user: any): boolean {
        if (!user) return false;
        if (user.isAdmin === true) return true;
        const roles: string[] = user.roles || [];
        return roles.includes("admin") || roles.includes("super-admin");
    }

    protected async validateAdminServiceAccess(
        serviceId: string,
        user: any,
    ): Promise<{ service: any; hasAccess: boolean; error?: string }> {
        try {
            if (!this.isAdminUser(user)) {
                return { service: null, hasAccess: false, error: "Admin access required" };
            }
            if (!serviceId) {
                return { service: null, hasAccess: false, error: "Service ID is required" };
            }

            const service = await this.context.models.userServices
                .findById(serviceId)
                .populate("backendProvider")
                .populate("product");

            if (!service) {
                return { service: null, hasAccess: false, error: "Service not found" };
            }

            return { service, hasAccess: true };
        } catch (error) {
            return {
                service: null,
                hasAccess: false,
                error: error instanceof Error ? error.message : "Failed to validate admin service access",
            };
        }
    }

    protected successResponse(data: any, message: string = "Request successful") {
        return { success: true, message, data };
    }

    protected errorResponse(error: string, statusCode: number = 400) {
        return { success: false, error, statusCode };
    }

    protected extractHostname(url: string): string {
        try {
            return new URL(url).hostname;
        } catch {
            return "Unknown";
        }
    }

    protected extractPort(url: string): string | null {
        try {
            return new URL(url).port || null;
        } catch {
            return null;
        }
    }
}
