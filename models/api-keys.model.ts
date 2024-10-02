import { getModelForClass, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { User } from "./user.model"; // Assuming you have a User model


export enum ApiRouteMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
    ALL = "ALL"
}

export enum ApiRoutePermissionAction {
    ALLOW = "ALLOW",
    DENY = "DENY"
}

export class ApiRoutePermission {
    @prop({ type: String, required: true, enum: ApiRouteMethod })
    method: string;

    @prop({ type: String, required: true })
    path: string;

    @prop({ type: String, required: true, enum: ApiRoutePermissionAction })
    action: string;

    constructor(method: string, path: string, action: string) {
        this.method = method;
        this.path = path;
        this.action = action;
    }
}


export class APIKey {
    @prop({ type: String, required: true })
    name!: string;

    @prop({ type: String, required: true, select: false })
    apiKey!: string;

    @prop({ type: Types.ObjectId, required: true, ref: () => User })
    user!: User;

    @prop({ type: Boolean, default: true })
    isActive!: boolean;

    @prop({ type: Date })
    expirationDate?: Date;

    // access ip network
    @prop({ type: [String], default: ['0.0.0.0/0', '::/0'] })
    accessControl!: string[];

    // permissions
    @prop({
        type: [ApiRoutePermission],
        _id: false,
        default: [
            new ApiRoutePermission(ApiRouteMethod.ALL, "/", ApiRoutePermissionAction.ALLOW)
        ]
    })
    routePermissions!: [ApiRoutePermission];
};

export const APIKeyModel = getModelForClass(APIKey, {
    schemaOptions: { timestamps: true },
});
