import { getModelForClass, pre, prop } from '@typegoose/typegoose';
import type { Ref } from '@typegoose/typegoose';
import slugify from 'slugify';
import { User } from './user.model';
import { ProductGroup } from './product-group.model';

class ProductPrice {
  @prop({ required: true })
  public price!: number;

  @prop({ required: true })
  public duration!: number;

  @prop({ required: true })
  public label!: string;

  @prop({ required: true })
  public identifier!: string;

}


class SelectOption {
  @prop({ required: true })
  public key!: string;

  @prop({ required: true })
  public value!: string;
}

class ProductModuleSettings {
  @prop()
  public name?: string;

  @prop()
  public serverGroup?: string;

  @prop()
  public setupType?: string;
}

export enum ProductCustomFieldType {
   TEXT = 'text',
   LINK = 'link',
   PASSWORD = 'password',
   DROPDOWN = 'dropdown',
   TICKBOX = 'tickbox',
   TEXTAREA = 'textarea'
}

class ProductCustomField {
  @prop()
  public name?: string;

  @prop({ required: true })
  public identifier?: string;

  @prop({ enum: ProductCustomFieldType })
  public type?: string;

  @prop()
  public description?: string;

  @prop()
  public validation?: string;

  @prop()
  public displayOrder?: number;

  @prop({ type: () => [SelectOption] })
  public selectOptions?: SelectOption[];

  @prop({ default: false })
  public adminOnly?: boolean;

  @prop({ default: false })
  public requiredField?: boolean;

  @prop({ default: false })
  public showOnOrderForm?: boolean;

  @prop({ default: false })
  public showOnInvoice?: boolean;
}


export enum ProductStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  DISABLED = 'disabled',
  DELETED = 'deleted',
  ARCHIVED = 'archived',
}

@pre<Product>('save', function (next) {
  if (!this.isModified('name')) return next();
  this.slug = slugify(this.name, { lower: true, replacement: '-' });
  next();
})
export class Product {
  @prop({ required: true })
  public name!: string;

  @prop({ unique: true, index: true })
  public slug!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ type: () => [ProductPrice], required: true, })
  public prices!: ProductPrice[];

  @prop({ default: false, select: false })
  public hidden!: boolean;

  @prop({ required: true, enum: ['product', 'subscription'] })
  public type!: string;

  @prop({})
  public moduleSettings?: ProductModuleSettings;

  @prop({ type: () => [ProductCustomField], })
  public customFields?: ProductCustomField[];

  // ststus
  @prop({ enum: ProductStatus, default: ProductStatus.DRAFT })
  public status?: string;

  @prop({ ref: () => ProductGroup, required: true })
  public group!: Ref<ProductGroup>;

  @prop({ ref: () => User, required: true })
  public createdBy!: Ref<User>;

}

const ProductModel = getModelForClass(Product, {
  schemaOptions: { timestamps: true },
});

export default ProductModel;
