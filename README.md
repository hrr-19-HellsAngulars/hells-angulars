# Gear Box

>  A crowd sourced gear rental service. Users can put up gear for rent and rent other users' gear. Sellers can set up payment through Stripe and earn cash for unused outdoor gear they have at home.

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    2. [Other Dependencies](#other-dependencies)
4. [Database](#database)
5. [Style Guide](#style-guide)
    1. [General](#general)
    2. [File Structure](#file-structure)
    3. [Modules](#modules)
6. [Team](#team)

## Usage

Users of Gear Box are able to both post items for rent and rent items for others. An account with Stripe is required to receive payments from completed transactions. Gear Box accounts can be linked via social profiles or created originally via the sign up form. Default search location for products is picked up through location on the browser and can be changed anytime with the top navigation bar. Contribute to the Gear Box community by leaving feedback for other users and products so others know what to expect when renting a product!

## Requirements

Angular2 2.1.1
Auth0 Lock 10.6.1
Express 4.14.0
Node 6.8.0
PostgreSQL 6.1.0
UI Router-ng2 1.0.0-beta.3
TypeScript 2.0.10

## Development

Development for this application is currently streamlined using Grunt task runner. The default `grunt` command is set up to lint, build, and concurrently run tests and deploy a development server. More details are available within Gruntfile.js. The `grunt` task will take care of everything you need to develop in the current environment, and `grunt deploy` will allow the deployment of a finished version.

#### Installing Dependencies

```sh
npm install
```

### Start

```sh
grunt
```

#### Other Dependencies

Amazon S3 Server for storing user uploaded product photos
Auth0 API for Authentication and storing user login information
Google Maps API for location services
PostgreSQL for Products/Profiles/Non-Sensitive information, currently powered by ElephantSQL
Stripe API for processing payments

## Database

Instructions exist for deleting tables and creating tables in the database as necessary inside of the server/db/schema.js file  using ElephantSQL. Uncomment provided code to wipe the specified tables.

ElephantSQL is a cloud based PosgreSQL database hosting service. Using ElephantSQL will allow the program to interact wth one, centralized database containing all non-authentication information.

Amazon S3 is a cloud bucket file storage currently being used to store user uploaded photos from within a local file browser.

## Style Guide

We are using tslint and following the recommended style guide, borrowing many styling choices from their preferred format.
Our most up to date linting settings can be found in our `tslint.json` file for any rules that fall outside of this format. Certain rules are overridden in certain files based on the needs of the code and using in-line comments to disable the linter is to be used as a final option.

#### General

Add whitespace to pad either side of all curly and angle brackets - { Foo } [ "bar" ]
Use type `any` rather than leaving off a type where type of `any` is expected

#### File Structure

Separate files by concern on both front and back end, placing components/modules into their own folders. Any new front end components should have their own folder with corresponding TypeScript file(s). Use exterior HTML template files and CSS files over in-line style for Angular components. For small components, (3 lines or fewer as a rule of thumb) in-line HTML and CSS is acceptable. See existing file structure for examples.

#### Modules

Alphabetize import statements, within the necessary grouping
Empty constructor functions should contain one whitespace - `{ }`
Line up `from` in import statements whenever possible
Separate import statements by concern when importing more than 8-10

## Team

  - __Product Owner__: Alexander Leo
  - __Scrum Master__: Daisy Good
  - __Development Team Members__: Luke Wilson, Michael Oliver
