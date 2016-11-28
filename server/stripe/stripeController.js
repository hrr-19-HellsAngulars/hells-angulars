var pool = require("../db/db.js");
var request = require("request");
var stripeAPI = require("../config/stripeConfig.js");

var express = require('express');
var app = express();

var stripe = require("stripe")(stripeAPI.API_KEY);

var TOKEN_URI = "https://connect.stripe.com/oauth/token";
var AUTHORIZE_URI = "https://connect.stripe.com/oauth/authorize";

module.exports = {

  // retrive code after user authorize stripe
  getCode: function (req, res) {
    var code = req.query.code;
    var userId = req.query.state;
    // send the code to stripe for accesstoken
    if (code) {
      var postBody = {
        url: TOKEN_URI,
        form: {
          grant_type: 'authorization_code',
          client_id: stripeAPI.CLIENT_ID,
          code: code,
          client_secret: stripeAPI.API_KEY,
        }
      };
      request.post(postBody, function(err, r, body) {
        var stripeUserId = JSON.parse(body).stripe_user_id;
        var queryString = `UPDATE users SET
      stripeaccountid=($1) WHERE authId=($2)`;
        pool.query(queryString , [stripeUserId, userId], function(err, result) {
          if (err) return console.log(err);
          console.log('success', result);
        })
        res.redirect('/#/profile');
      });
    }
  },

  createCharge: function (req, res) {
    var token = req.body.token.id;
    var transaction = req.body.transaction;
    stripe.charges.create({
      amount: transaction.amount * 100,
      currency: 'usd',
      source: token,
    }, function (error, body) {
      if (error) {
        res.send(400, 'Payment rejected');
      } else {
        console.log(req.body.transaction);
        // insert into transaction table
        var queryString = `INSERT INTO transactions
          (totalvalue, buyer_id, seller_id, status_id, product_id, bookedfrom, bookedto)
          VALUES ($1, (SELECT id from users where authid = $2), $3, $4, $5, $6, $7)`;
        pool.query(queryString, [transaction.amount, transaction.buyer_id, transaction.seller_id,  transaction.status_id, transaction.product_id, transaction.bookedfrom, transaction.bookedto], function (err, result) {
          if (err) return console.log(err);
          console.log('add new transaction');
          res.send(200, 'Success');
        })
      }
    });
  }
}
