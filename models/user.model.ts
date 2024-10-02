import { getModelForClass, index, pre, prop, DocumentType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import CurrencyModel from './currency.model';




export enum AccountType {
  personal = 'personal',
  business = 'business',
}


class EmailScehdule {
  // Recharge Reminder Email
  @prop({ required: false, type: Date })
  lastRechargeReminderMailSent?: Date;

  // No Balance Email
  @prop({ required: false, type: Date })
  lastNoBalanceEmailSent?: Date;

}


@index({ name: 'text', username: 'text', email: 'text', phone: 'text', company: 'text' })
@pre<User>("save", async function () {
  if (!this.currency) {
    let currency = await CurrencyModel.findOne({ isDefault: true })
    if (!currency) {
      currency = await CurrencyModel.create({
        "code": "USD",
        "name": "US Dollar",
        "exchangeRate": 1,
        "isDefault": true,
        "symbol": "$",
        "decimalPlaces": 2,
        "prefix": "$",
        "suffix": "",
        "decimalSeparator": ".",
        "thousandSeparator": ",",
      })
    }
    this.currency = currency.code
  }
})
export class User {
  public _id!: Types.ObjectId;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true, unique: true })
  public username!: string;

  @prop({ required: true, unique: true, lowercase: true })
  public email!: string;

  // secure 
  @prop({ required: true, default: "secure-key", type: String, select: false })
  secure!: string

  @prop({ required: true, default: false })
  public isAdmin!: boolean;

  @prop({ type: () => [String], enum: ['admin', 'super-admin', 'sales-operator', 'banned', 'client'], default: 'client' })
  public roles!: string[];

  @prop({ default: "USD" })
  public currency?: string;


  @prop({ required: true, minlength: 6, select: false })
  public password!: string;

  @prop()
  public passwordChangedAt?: Date;

  @prop({ default: true, select: false })
  public active!: boolean;

  // Billing Related 
  @prop({ type: String })
  contactPerson?: string;

  @prop({ type: String })
  streetAddress?: string;

  @prop({ type: String })
  companyName?: string;

  @prop({ type: String }) // Add other country codes as needed
  country?: string;

  @prop({ type: String })
  state?: string;

  @prop({ type: String })
  city?: string;

  @prop({ type: String })
  zipCode?: string;

  @prop({ type: String })
  phoneCode?: string;

  @prop({ type: String })
  phoneNumber?: string;

  // TAX DETAILS
  @prop({ type: String, enum: AccountType, default: AccountType.personal })
  accountType?: string

  // TAX DETAILS
  @prop({ type: String, default: '' })
  taxId?: string

  // Email Scehdule Related
  @prop({ required: false, type: EmailScehdule, select: false })
  emailScehdule?: EmailScehdule


  public get safeData() {
    return {
      id: this._id,
      name: this.name,
      username: this.username,
      email: this.email,
      isAdmin: this.isAdmin,
      roles: this.roles,
    };
  }
}



const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
// Define the UserType
// export type tUser = DocumentType<User>;
export default UserModel;