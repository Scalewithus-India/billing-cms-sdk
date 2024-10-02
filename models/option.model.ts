import { getModelForClass, prop } from '@typegoose/typegoose';

export class Option {
    @prop({ required: true })
    public name!: string;

    @prop()
    public value?: string;

    @prop({ required: true, default: true })
    public cachable!: boolean;
}

const OptionModel = getModelForClass(Option, {
    schemaOptions: { timestamps: true },
});

export default OptionModel;