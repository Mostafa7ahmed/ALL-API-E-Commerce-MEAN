import { Schema, model } from 'mongoose';
import { Reviews } from '../interfaces/reviews';
import productsModel from './productsModel';

const reviewsSchema: Schema = new Schema<Reviews>(
  {
    comment: { type: String, required: true, trim: true },
    rate: { type: Number, required: true, min: 1, max: 5 },
    product: { type: Schema.Types.ObjectId, ref: 'products' },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  { timestamps: true }
);

reviewsSchema.statics.calcRatingAndQuantity = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: 'product',
        avgRating: { $avg: '$rate' },
        ratingQuantity: { $sum: 1 },
      },
    },
  ]);
  console.log(result);
  if (result.length > 0) {
    await productsModel.findByIdAndUpdate(productId, {
      ratingAverage: result[0].avgRating,
      ratingCount: result[0].ratingQuantity,
    });
  } else {
    await productsModel.findByIdAndUpdate(productId, {
      ratingAverage: 0,
      ratingCount: 0,
    });
  }
};

reviewsSchema.post<Reviews>('save', async function () {
  await (this.constructor as any).calcRatingAndQuantity(this.product);
});

/* reviewsSchema.post<Reviews>('remove', async function ()
{ await (this.constructor as any).calcRatingAndQuantity(this.product) })*/
// TODO: Fix the above line to work with Mongoose 6.0.0
// reviewsSchema.post<Reviews>('remove', async function (doc) {
//   await (doc.constructor as any).calcRatingAndQuantity(doc.product);
// });

reviewsSchema.post<Reviews>('findOneAndDelete', async function (doc) {
  const reviewDoc = doc as unknown as Reviews;
  if (reviewDoc.product) {
    await (reviewDoc.constructor as any).calcRatingAndQuantity(
      reviewDoc.product
    );
  }
});

// reviewsSchema.post<Reviews>('findOneAndDelete', async function (doc) {
//   // Type assertion with guard clause
//   if (doc instanceof Reviews && doc.product) {
//     await doc.constructor.calcRatingAndQuantity(doc.product);
//   } else {
//     console.error(
//       'Unexpected document type in findOneAndDelete post middleware'
//     );
//   }
// });

reviewsSchema.pre<Reviews>(/^find/, function (next) {
  this.populate({ path: 'user', select: 'name image' });
  next();
});

reviewsSchema.pre<Reviews>('find', function (next) {
  this.populate({ path: 'product', select: 'name cover' });
  next();
});

export default model<Reviews>('reviews', reviewsSchema);
