const express = require('express');
const _ = require('underscore');

const router = express.Router();

const { ProductModel } = require('../components/products/productModel');

router.get('/:id/:name/products', async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const categoryName = req.params.name;
    const products = await ProductModel.find({ primary_category_id: categoryId });
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
    res.render('productsList', {
      title: categoryId, _, products, breadcrumbs,
    });
  } catch (e) {
    next(e);
  }
});

router.get('/product/:name/:id', async (req, res, next) => {
  try {
    const productId = req.params.id;
    const productName = req.params.name;
    const product = await ProductModel.findById(productId);
    const breadcrumbs = [
      {
        link: '/',
        name: 'Home',
      },
      {
        link: req.originalUrl,
        name: productName[0].toUpperCase() + productName.slice(1),
      },
    ];
    res.render('productDetail', {
      title: product.name, _, product, breadcrumbs,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
