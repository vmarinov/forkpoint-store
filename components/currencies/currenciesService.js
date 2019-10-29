const soap = require('soap');

const currenciesClient = () => new Promise(
  (resolve, reject) => soap.createClient(
    process.env.WSDL_URL, {}, (err, client) => {
      if (err) {
        reject(err);
      } else {
        resolve(client);
      }
    },
  ),
);

function getRateByCurrencyCode(currencyCode) {
  return currenciesClient().then(
    (client) => new Promise(
      (reject, resolve) => client.getlatestvalue(
        { Moneda: currencyCode }, (result, err) => (err ? reject(err) : resolve(result)),
      ),
    ),
  );
}

function getAllCurrencyCodesAndRates(date) {
  return currenciesClient().then(
    (client) => new Promise(
      (reject, resolve) => client.getall(
        { dt: date }, (result, err) => (err ? reject(err) : resolve(result)),
      ),
    ),
  );
}

function getLastDateInserted() {
  return currenciesClient().then(
    (client) => new Promise(
      (reject, resolve) => client.lastdateinserted(
        {}, (result, err) => (err ? reject(err) : resolve(result)),
      ),
    ),
  );
}

module.exports = { getRateByCurrencyCode, getAllCurrencyCodesAndRates, getLastDateInserted };
