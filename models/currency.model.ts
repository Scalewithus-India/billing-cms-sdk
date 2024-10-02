import { prop, getModelForClass, pre } from '@typegoose/typegoose';
import { Types } from 'mongoose';

// @pre<Currency>('save', async function () {
//     if (this.isDefault) {
//         await CurrencyModel.updateMany({ isDefault: true }, { isDefault: false });
//     }
// })

export class Currency {
    _id!: Types.ObjectId;

    @prop({ required: true, unique: true })
    code!: string;

    @prop({ required: true })
    name!: string;

    @prop({ required: true, default: 1 })
    exchangeRate!: number;

    @prop({ default: false })
    isDefault!: boolean;

    @prop({ required: true })
    symbol!: string;

    @prop({ required: true, default: 2 })
    decimalPlaces!: number;

    @prop({ default: '' })
    prefix!: string;

    @prop({ default: '' })
    suffix!: string;

    @prop({ required: true, default: '.' })
    decimalSeparator!: string;

    @prop({ required: true, default: ',' })
    thousandSeparator!: string;
}

const CurrencyModel = getModelForClass(Currency);

export default CurrencyModel;
