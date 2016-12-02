var pool = require('../db/db.js');

module.exports = {

  getTransactionsBySellerId: function (req, res) {
    var queryStr = `SELECT transactions.id
      , transactions.bookedfrom
      , transactions.bookedto
      , transactions.totalValue
      , transactions.status_id
      , transactions.product_id
      , products.productname
      , users.firstname
      , users.profilepic
      , transactions.buyer_id
      , transactions.seller_id
      FROM transactions
      INNER JOIN products
          on products.id = transactions.product_id
      INNER JOIN users
          on users.id = transactions.buyer_id
      WHERE seller_id = ($1)`;

    pool.query(queryStr,[req.params.id],function(err, result) {
      if (err) {
        console.log(err);
        res.send(err);
      }
      res.json(result.rows);
    });
  },

  getRentalsByBuyerId: function (req, res) {
    var queryStr = `SELECT transactions.id
      , transactions.bookedfrom
      , transactions.bookedto
      , transactions.totalValue
      , transactions.status_id
      , transactions.product_id
      , products.productname
      , users.firstname
      , users.profilepic
      , transactions.buyer_id
      , transactions.seller_id
      FROM transactions
      INNER JOIN products
          on products.id = transactions.product_id
      INNER JOIN users
          on users.id = transactions.seller_id
      WHERE buyer_id = ($1)`;
    pool.query(queryStr,[req.params.id],function(err, result) {
      if (err) {
        console.log(err);
        res.send(err);
      }
      res.json(result.rows);
    });
  },

  getInvalidDays: function (req, res, next) {
    var id = req.params.id;

    var queryStr = `SELECT bookedfrom, bookedto FROM transactions WHERE product_id=($1)`;

    pool.query(queryStr, [id], function(err, result) {
      if (err) return console.log(err);
      res.json(result.rows);
    });
  },

  getActiveTransactions: function (req, res) {
    var queryStr = `SELECT transactions.id
      , transactions.bookedfrom
      , transactions.bookedto
      , transactions.totalValue
      , transactions.status_id
      , transactions.product_id
      , products.productname
      , users.firstname
      , users.profilepic
      , transactions.buyer_id
      , transactions.seller_id
      FROM transactions
      INNER JOIN products
          on products.id = transactions.product_id
      INNER JOIN users
          on users.id = transactions.seller_id
      WHERE transactions.status_id = 1`;
    pool.query(queryStr, function(err, result) {
      if (err) {
        console.log(err);
        res.send(err);
      }
      res.json(result.rows);
    });
  },

  updateTransaction: function (req, res) {
    var id = req.params.id;
    var body = req.body;
    console.log(body);
    var queryStr = `UPDATE transactions SET
      status_id=($1) WHERE transactions.id = ($2)`;
    pool.query(queryStr, [body.status_id, id], function(err, result) {
      if (err) return console.log(err);
      console.log('success', result);
      res.status(201).send('updated product');
    });
  }
};
