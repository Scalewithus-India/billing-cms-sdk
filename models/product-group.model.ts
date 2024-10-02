import { getModelForClass, prop, } from '@typegoose/typegoose';
import type { Ref } from '@typegoose/typegoose';
import { User } from './user.model';

// @pre<ProductGroup>('save', function (next) {
//   if (!this.isModified('name')) return next();
//   next();
// })

// Feature Tags
export class FeatureTag {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public icon!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ required: false, unique: true })
  public slug!: string;
}

export class ProductGroup {
  @prop({ required: true })
  public name!: string;

  @prop({ unique: true, required: true })
  public slug!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ required: false, type: String }) // Iconify icons
  public icon!: string;

  @prop({ required: false, type: [FeatureTag],  })
  public tags!: FeatureTag[];

  @prop({ default: false, select: false })
  public hidden!: boolean;

  @prop({ ref: () => User, required: true })
  public addedBy!: Ref<User>;

  @prop({ ref: () => User, required: true })
  public lastEditedBy!: Ref<User>;
}

const ProductGroupModel = getModelForClass(ProductGroup, {
  schemaOptions: { timestamps: true },
});

export default ProductGroupModel;
