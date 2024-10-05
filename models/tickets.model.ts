import { getModelForClass, index, pre, prop, type Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { User } from './user.model';

export class TicketReply {
    @prop({ required: true })
    public body!: string;

    @prop({ ref: () => User, required: true })
    public repliedBy!: Ref<User>;

    @prop({ type: () => [String] })
    public attachedFiles?: string[];

    @prop({ default: false })
    public isDeleted!: boolean;
}

export class Ticket {
    _id!: Types.ObjectId;

    @prop({ required: true, minlength: 5 })
    public subject!: string;

    @prop({ required: true, minlength: 10 })
    public body!: string;

    @prop({ enum: ['open', 'closed', 'in-progress', 'answered'], default: 'open' })
    public status!: string;

    @prop({ enum: ['low', 'medium', 'high'], default: 'low' })
    public priority!: string;

    @prop({ required: true, enum: ['question', 'problem', 'suggestion'] })
    public type!: string;

    @prop({ type: () => [String] })
    public attachedFiles?: string[];

    @prop({ type: () => [TicketReply] })
    public replies?: TicketReply[];

    @prop({ ref: () => User, required: true })
    public assignedTo!: Ref<User>;

    @prop({ ref: () => User, required: true })
    public createdBy!: Ref<User>;

    @prop({ ref: () => User, required: true })
    public lastEditedBy!: Ref<User>;

    @prop({ default: false, select: false })
    public isDeleted!: boolean;
}

// const ReplyModel = getModelForClass(Reply, {
//     schemaOptions: { timestamps: true },
// });

const TicketModel = getModelForClass(Ticket, {
    schemaOptions: { timestamps: true },
});

export { TicketModel };
