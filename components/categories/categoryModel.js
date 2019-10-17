const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const subCategorySchema = new Schema({
  categories: [
    {
      id: String,
      image: String,
      name: String,
      page_description: String,
      page_title: String,
      parent_category_id: String,
      c_showInMenu: Boolean,
    },
  ],
  id: String,
  image: String,
  name: String,
  page_description: String,
  page_title: String,
  parent_category_id: String,
  c_showInMenu: Boolean,
});

const categorySchema = new Schema({
  _id: ObjectId,
  categories: [subCategorySchema],
  id: String,
  name: String,
  page_description: String,
  page_title: String,
  parent_category_id: String,
  c_showInMenu: Boolean,
});


categorySchema.set('collection', 'categories');
subCategorySchema.set('collection', 'categories');
const CategoryModel = mongoose.model('Category', categorySchema);
const SubCategoryModel = mongoose.model('SubCategory', subCategorySchema);
module.exports = { CategoryModel, SubCategoryModel };
