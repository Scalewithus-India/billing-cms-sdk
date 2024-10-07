import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose from 'mongoose';


export enum EmailTemplates {
    HEADER = "header",
    FOOTER = "footer",
    VERIFY_EMAIL = "verify_email",
    RESET_PASSWORD = "reset_password",
    WELCOME = "welcome",
    CONTACT_US = "contact_us"

} 

export class EmailTemplate {
    @prop({ type: String, enum: EmailTemplates, required: true, unique: true })
    name!: EmailTemplates;

    @prop({ type: String, required: true, default: "" })
    subject!: string;

    @prop({ type: String, required: true, default: "" })
    text!: string;

    @prop({ type: String, required: true, default: "" })
    html!: string;

    @prop({ type: String, default: "" })
    css!: string;
}

export const EmailTemplateModel = mongoose.models.EmailTemplate || getModelForClass(EmailTemplate, {
    schemaOptions: {
        timestamps: true
    }
});