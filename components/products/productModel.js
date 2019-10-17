const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;
const { Mixed } = mongoose.Schema.Types;

const productSchema = new Schema({
  _id: ObjectId,
  priceMax: Number,
  page_description: String,
  page_title: String,
  name: String,
  price: Mixed,
  variation_attributes: [
    {
      values: [
        {
          orderable: Boolean,
          name: String,
          value: String,
        },
      ],
      id: String,
      name: String,
    },
  ],
  id: String,
  currency: String,
  master: {
    orderable: Boolean,
    price: Mixed,
    master_id: String,
  },
  primary_category_id: String,
  image_groups: [
    {
      images: [{ alt: String, link: String, title: String }],
      view_type: String,
    },
  ],
  short_description: String,
  orderable: Boolean,
  variants: [
    {
      variation_values: { color: String, size: String },
      price: Mixed,
      product_id: String,
      orderable: Boolean,
    },
  ],
  type: {
    master: Boolean,
  },
  long_description: String,
  c_isSale: Boolean,
  c_isNewTest: Boolean,
  c_isNew: Boolean,
  c_tabDescription: String,
  page_keywords: String,
  c_styleNumber: String,
  c_tabDetails: String,
});

productSchema.set('collection', 'products');
const ProductModel = mongoose.model('Product', productSchema);
module.exports = { ProductModel };
