// CAUTION: This first query will delete all tables.
// USAGE: Uncomment the query here, and uncomment "deleteTables + " from the module.exports at the bottom of this file.
// var deleteTables = `DROP TABLE IF EXISTS
//  reviews,
//  transactions,
//  products,
//  images,
//  users,
//  categories,
//  statuses,
//  types
//  ;`

// statuses might include: pending, in progress, completed, cancelled
var statuses = `CREATE TABLE IF NOT EXISTS statuses (
  id              SERIAL        PRIMARY KEY,
  status          VARCHAR(30)   NOT NULL
);`;

var categories = `CREATE TABLE IF NOT EXISTS categories (
  id              SERIAL        PRIMARY KEY,
  category        VARCHAR(30)   NOT NULL
);`;

var users = `CREATE TABLE IF NOT EXISTS users (
  id              SERIAL        PRIMARY KEY,
  authid          VARCHAR(100)  ,
  username        VARCHAR(50)   NOT NULL,
  firstname       VARCHAR(50)   NOT NULL,
  lastname        VARCHAR(50)   NOT NULL,
  email           VARCHAR(255)  NOT NULL,
  stripeaccountid VARCHAR(255)  ,
  location        VARCHAR(255)  ,
  profilepic      VARCHAR(2000)
);`;

//this table stores info about each product available to rent
//I've left the deposit field off of this. I think it might be easier to calculate a deposit based on a % of total transaction value
var products = `CREATE TABLE IF NOT EXISTS products (
  id              SERIAL        PRIMARY KEY,
  category_id     INT           references categories(id),
  owner_id        INT           references users(id),
  productname     VARCHAR(50)   NOT NULL,
  description     TEXT          NOT NULL,
  avgrating       INT           ,
  priceperday     INT           NOT NULL,
  location        VARCHAR(100)  ,
  lat             DECIMAL       NOT NULL,
  lng             DECIMAL       NOT NULL,
  city            VARCHAR(255)  ,
  state           VARCHAR(50)   ,
  zip             INT
);`

var transactions = `CREATE TABLE IF NOT EXISTS transactions (
  id              SERIAL        PRIMARY KEY,
  totalvalue      INT           ,
  buyer_id        INT           references users(id),
  seller_id       INT           references users(id),
  status_id       INT           references statuses(id),
  product_id      INT           references products(id),
  bookedfrom      DATE          NOT NULL,
  bookedto        DATE          NOT NULL
);`;

var reviews = `CREATE TABLE IF NOT EXISTS reviews (
  id              SERIAL        PRIMARY KEY,
  transaction_id  INT           references transactions(id),
  product_id      INT           references products(id),
  buyer_id        INT           references users(id),
  seller_id       INT           references users(id),
  author_id       INT           references users(id),
  text            TEXT          NOT NULL,
  rating          INT
);`;

var images = `CREATE TABLE IF NOT EXISTS images (
  id              SERIAL        PRIMARY KEY,
  product_id      INT           references products(id),
  url             VARCHAR(2000) NOT NULL
);`;

module.exports =   /*deleteTables +*/ types + statuses + categories + users + products + transactions + reviews + images;