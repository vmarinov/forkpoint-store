const express = require('express');
const _ = require('underscore');

const router = express.Router();

const { ProductModel } = require('../components/products/productModel');

const currenciesService = require('../components/currencies/currenciesService');

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
        name: (categoryName[0].toUpperCase() + categoryName.slice(1)).replace(/-/g, ' '),
      },
    ];
    res.render('productsList', {
      title: categoryId,
      _,
      products,
      breadcrumbs,
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
        name: (productName[0].toUpperCase() + productName.slice(1)).replace(/-/g, ' '),
      },
    ];
    currenciesService
      .getLastDateInserted()
      .then(
        (date) => {
          const lastDateInserted = new Date(date.lastdateinsertedResult);
          const formattedDate = `${lastDateInserted.getFullYear()}-${lastDateInserted.getMonth()
            + 1}-${lastDateInserted.getDate()}`;
          currenciesService
            .getAllCurrencyCodesAndRates(formattedDate)
            .then(
              (result) => {
                const currenciesAndRates = result.getallResult.diffgram.DocumentElement.Currency;
                res.render('productDetail', {
                  title: product.name,
                  _,
                  product,
                  breadcrumbs,
                  currenciesAndRates,
                });
              },
              (error) => { throw new Error(error); },
            )
            .catch((e) => {
              throw new Error(e);
            });
        },
        (error) => {
          throw new Error(error);
        },
      )
      .catch((e) => {
        throw new Error(e);
      });
  } catch (e) {
    next(e);
  }
});

router.post('/product/:name/:id', async (req, res) => {
  const { currencyCode } = req.body;
  const { price } = req.body;
  let rate = 0;
  let convertedPrice = 0;
  const regEx = /\b[a-zA-Z0-9]{3}\b|\b[a-zA-Z0-9]{3}\b/;
  if (!regEx.test(currencyCode) || Number.isNaN(price)) {
    res.json('invalid currency code');
  } else {
    currenciesService
      .getRateByCurrencyCode(currencyCode)
      .then(
        (result) => {
          rate = result.getlatestvalueResult;
          convertedPrice = price * rate;
          res.json(convertedPrice.toFixed(2));
        },
        (err) => {
          throw new Error(err);
        },
      )
      .catch((err) => {
        throw new Error(err);
      });
  }
});

module.exports = router;
