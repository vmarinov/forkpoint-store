$(document).ready(() => {
  const currenciesSelector = $('select[name="currencies"]');
  const priceElem = $('span[name="price"]');
  const productPrice = $('input[name="unconvertedPrice"]').val();

  currenciesSelector.on('change', () => {
    priceElem.next('p').remove();
    const rate = currenciesSelector.val();
    if (rate == 0) {
      priceElem.text(`Price: ${productPrice}`);
      $('<p style="color:red;"> Unable to convert price </p>').insertAfter(priceElem);
    } else {
      priceElem.text(`Price: ${(productPrice / rate).toFixed(2)}`);
    }
  });
});
