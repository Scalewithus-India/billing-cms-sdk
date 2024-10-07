import { getModelForClass, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';

export class Timezone {
  @prop()
  public zoneName?: string;

  @prop()
  public gmtOffset?: number;

  @prop()
  public gmtOffsetName?: string;

  @prop()
  public abbreviation?: string;

  @prop()
  public tzName?: string;
}

export class Translations {
  @prop()
  public kr?: string;

  @prop()
  public 'pt-BR'?: string;

  @prop()
  public pt?: string;

  @prop()
  public nl?: string;

  @prop()
  public hr?: string;

  @prop()
  public fa?: string;

  @prop()
  public de?: string;

  @prop()
  public es?: string;

  @prop()
  public fr?: string;

  @prop()
  public ja?: string;

  @prop()
  public it?: string;

  @prop()
  public cn?: string;

  @prop()
  public tr?: string;
}

export class State {
  @prop()
  public id?: number;

  @prop()
  public name?: string;

  @prop()
  public state_code?: string;

  @prop()
  public latitude?: string;

  @prop()
  public longitude?: string;
}

export class Country {
  @prop({ index: true })
  public name?: string;

  @prop({ index: true })
  public iso3?: string;

  @prop({ index: true })
  public iso2?: string;

  @prop()
  public numeric_code?: string;

  @prop()
  public phone_code?: string;

  @prop()
  public capital?: string;

  @prop()
  public currency?: string;

  @prop()
  public currency_name?: string;

  @prop()
  public currency_symbol?: string;

  @prop()
  public tld?: string;

  @prop()
  public native?: string;

  @prop()
  public region?: string;

  @prop()
  public subregion?: string;

  @prop({ type: () => Timezone })
  public timezones?: Timezone;

  @prop({ type: () => Translations })
  public translations?: Translations;

  @prop()
  public latitude?: string;

  @prop()
  public longitude?: string;

  @prop()
  public emoji?: string;

  @prop()
  public emojiU?: string;

  @prop({ type: () => [State] })
  public states?: State[];
}

const CountryModel = mongoose.models.Country || getModelForClass(Country, {
  schemaOptions: { timestamps: true },
});

export default CountryModel;
