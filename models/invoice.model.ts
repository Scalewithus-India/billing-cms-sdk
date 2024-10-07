import { getModelForClass, prop } from "@typegoose/typegoose";
import { User } from "./user.model";
import mongoose from 'mongoose';


export enum InvoiceStatus {
    PENDING = 'unpaid',
    PAID = 'paid',
    CANCELLED = 'cancelled',
    OVERDUE = 'overdue',
    DRAFT = 'draft',
    REFUNDED = 'refunded',
    COLLECTIONS = 'collections',
}

export enum InvoiceItemType {
    ITEM = 'item',
    SERVICE = 'service',
    PRODUCT = 'product',
    DISCOUNT = 'coupon',
    USER_SERVICE = 'user_service',
}

export enum InvoiceItemAction {
    CREATE = 'create',
    RENEW = 'renew',
    UPGRADE = 'upgrade',
}

export class InvoiceItem {
    @prop({ enum: InvoiceItemType })
    type!: string

    @prop({ required: true })
    name!: string

    @prop({ required: true })
    quantity!: number

    @prop({ required: true })
    price!: number

    @prop({ required: true })
    description!: string

    @prop({})
    source?: string

    @prop({})
    target?: string

    @prop({ enum: InvoiceItemAction })
    action!: string
}

class Invoice {
    @prop({ required: true })
    number!: string // invoice number

    @prop({ required: true })
    date!: Date // invoice date

    @prop({ required: true })
    dueDate!: Date // invoice due date

    @prop({ ref: User, required: true })
    user!: User

    @prop({ required: true })
    subtotal!: number

    @prop({ required: true })
    total!: number

    @prop({ required: true })
    tax!: number

    @prop({ enum: InvoiceStatus, default: InvoiceStatus.DRAFT, required: true })
    status!: string

    // items
    @prop({ type: () => [InvoiceItem], required: true })
    items!: InvoiceItem[]
}

const InvoiceModel = mongoose.models.Invoice ||getModelForClass(Invoice, {
    schemaOptions: { timestamps: true },
});

export default InvoiceModel;