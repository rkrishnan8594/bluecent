import plaid from 'plaid';
import envvar from 'envvar';
import moment from 'moment';
import User from '../models/user';

const PLAID_CLIENT_ID = envvar.string('PLAID_CLIENT_ID');
const PLAID_SECRET = envvar.string('PLAID_SECRET');
const PLAID_PUBLIC_KEY = envvar.string('PLAID_PUBLIC_KEY');
const PLAID_ENV = 'development';

let ACCESS_TOKEN = null;
let PUBLIC_TOKEN = null;
let ITEM_ID = null;

let client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV]
);

export const getAccessToken = (req, res, next) => {
  PUBLIC_TOKEN = req.body.public_token;
  let u = req.body.user;
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    if (error != null) {
      console.log(`Could not exchange public_token: ${error}.`);
      return res.json({error: error});
    }

    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;

    User.findOneAndUpdate({ email: u.email }, { access_token: ACCESS_TOKEN }, (err) => {
      if (err) { return next(err); }
      res.json({ access_token: ACCESS_TOKEN });
    });
  });
}

export const getTransactions = (req, res, next) => {
  let access_token = req.query.access_token;
  let today = moment().format('YYYY-MM-DD');
  let lastWeek = moment().subtract(1, 'months').format('YYYY-MM-DD');

  client.getTransactions(access_token, lastWeek, today,
    { count: 250, offset: 0 }, (err, result) => {
      console.log(err);
      const transactions = result.transactions;

      if (err != null) {
        console.log(err);
        console.log('Error in fetching transactions.');
        return res.json({ error: err });
      }

      res.json({ transactions });
  });
}
