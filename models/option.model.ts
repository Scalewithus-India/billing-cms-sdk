import { getModelForClass, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';

export class Option {
    @prop({ required: true })
    public name!: string;

    @prop()
    public value?: string;

    @prop({ required: true, default: true })
    public cachable!: boolean;
}

const OptionModel = mongoose.models.Option || getModelForClass(Option, {
    schemaOptions: { timestamps: true },
});

export default OptionModel;