$(document).ready(() => {
  const currenciesSelector = $('select[name="currencies"]');
  const productPrice = $('input[name="unconvertedPrice"]').val();
  currenciesSelector.on('change', () => {
    $.ajax({
      type: 'POST',
      url: '/product/:name/:id',
      data: { currencyCode: currenciesSelector.val(), price: productPrice },
      success(data) {
        $('span[name="price"]').next('p').remove();
        if (isNaN(JSON.parse(data))) {
          $('span[name="price"]').text(`Price: ${productPrice}`);
          $('<p style="color:red;"> Unable to convert price </p>').insertAfter($('span[name="price"]'));
        } else {
          $('span[name="price"]').text(`Price: ${JSON.parse(data)}`);
        }
      },
      dataType: 'text',
    });
  });
});
