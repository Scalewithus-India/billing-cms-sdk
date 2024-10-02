import { getModelForClass, prop } from '@typegoose/typegoose';
import type { Ref } from '@typegoose/typegoose';
import { User } from './user.model';
import type { NamedAlgo } from '@passwordless-id/webauthn/dist/esm/types';

export class Authenticator {
    @prop({ required: true })
    public aaguid!: string;

    @prop({ required: true, default: 0 })
    public counter!: number;

    @prop()
    public iconLight?: string;

    @prop()
    public iconDark?: string;

    @prop({ required: true })
    public name!: string;
}

export class Credential {
    @prop({ required: true })
    public id!: string;

    @prop({ required: true })
    public publicKey!: string;

    @prop({ required: true })
    public algorithm!: NamedAlgo;
}

// export class User {
//     @prop({ required: true })
//     public name!: string;

//     @prop({ required: true })
//     public id!: string;
// }

export class Passkey {
    @prop({ required: true })
    public authenticator!: Authenticator;

    @prop({ required: true, select: false })
    public credential!: Credential;

    @prop({ required: true, default: false })
    public synced!: boolean;

    @prop({ required: true, default: false })
    public name!: string;

    @prop({ required: true, default: false })
    public userVerified!: boolean;
}

export class Password {
    @prop({ required: true, select: false })
    public bassword?: string;

    @prop({ required: true, select: false })
    public secret?: string;
}


export enum AuthenticationMethodType {
    PASSKEY = 'passkey',
    PASSWORD = 'password',
}

export class AuthenticationMethod {
    @prop({ required: true, type: String, enum: AuthenticationMethodType, })
    public type!: AuthenticationMethodType;

    @prop({ required: true })
    public user!: Ref<User>;

    @prop({ required: true, default: false })
    public enabled!: boolean;

    @prop({ type: Passkey })
    public passkey?: Passkey;

    @prop({ type: Password })
    public password?: Password;

    @prop({ type: Date })
    public lastUsed?: Date;
}

const AuthenticationMethodModel = getModelForClass(AuthenticationMethod, {
    schemaOptions: { timestamps: true },
});

export default AuthenticationMethodModel;
