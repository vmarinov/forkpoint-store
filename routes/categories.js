const express = require('express');
const _ = require('underscore');

const router = express.Router();
const categoryService = require('../components/categories/categoriesService');

/* Get top category page */
router.get('/categories/:id/:name', async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await categoryService.findById(categoryId);
    const breadcrumbs = [
      {
        link: '/',
        name: 'Home',
      },
      {
        link: req.originalUrl,
        name: category.page_title,
      },
    ];

    res.render('categoriesList', {
      title: category.page_title,
      _,
      category,
      breadcrumbs,
    });
  } catch (e) {
    next(e);
  }
});

// Get sub category page
router.get('/categories/:topCatId/:topCatName/:id/:name', async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const categoryName = req.params.name;
    const cursor = await categoryService.findBySubCategoryId(categoryId);
    const category = [];
    try {
      await cursor.eachAsync((doc) => {
        category.push({
          id: doc._id.id,
          image: doc._id.image,
          name: doc._id.name,
          page_description: doc._id.page_description,
          page_title: doc._id.page_title,
          parent_category_id: doc._id.parent_category_id,
          c_showInMenu: doc._id.parent_category_id,
        });
      });

      const breadcrumbs = [
        {
          link: '/',
          name: 'Home',
        },
        {
          link: req.originalUrl,
          name: categoryName[0].toUpperCase() + categoryName.slice(1),
        },
      ];

      res.render('categoryDetail', {
        title: category.page_title, _, category, breadcrumbs,
      });
    } catch (e) {
      next(e);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
