const productPrice = $('input[name="unconvertedPrice"]').val();
const priceElem = $('span[name="price"]');
function convertPrice(rate) {
  if (rate == 0) {
    priceElem.text(`Price: ${productPrice}`);
    $('<p style="color:red;"> Unable to convert price </p>').insertAfter(priceElem);
  } else {
    priceElem.text(`Price: ${(productPrice / rate).toFixed(2)}`);
  }
}
