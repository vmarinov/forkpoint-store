const { CategoryModel } = require('../categories/categoryModel');
const { SubCategoryModel } = require('../categories/categoryModel');

function findById(id) {
  return CategoryModel.findById(id);
}

function findTopCategories() {
  return CategoryModel.find()
    .select({ _id: 1, name: 1 })
    .exec();
}

function findBySubCategoryId(id) {
  return SubCategoryModel.aggregate([
    {
      $unwind: {
        path: '$categories',
      },
    },
    {
      $unwind: {
        path: '$categories.categories',
      },
    },
    {
      $project: {
        _id: 0,
        categories: 1,
      },
    },
    {
      $match: {
        'categories.id': id,
      },
    },
    {
      $group: {
        _id: '$categories.categories',
      },
    },
  ]).cursor().exec();
}

function findSubCategoryChild(subId, childId) {
  return SubCategoryModel.aggregate([
    {
      $unwind: {
        path: '$categories',
      },
    },
    {
      $unwind: {
        path: '$categories.categories',
      },
    },
    {
      $match: {
        'categories.id': subId,
        'categories.categories.id': childId,
      },
    },
    {
      $project: {
        _id: 0,
        'categories.categories': 1,
      },
    },
  ]);
}

module.exports = {
  findById,
  findTopCategories,
  findSubCategoryChild,
  findBySubCategoryId,
};
