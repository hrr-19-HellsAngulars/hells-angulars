# Hell's Angulars

>

## Team

  - __Product Owner__: Alexander Leo
  - __Scrum Master__: Daisy Good
  - __Development Team Members__: Luke Wilson, Michael Oliver

## Development

### Task Runner

Development for this application is currently streamlined using Grunt task runner. The default `grunt` command is set up to lint, build, and concurrently run tests and deploy a development server. More details are available within Gruntfile.js.


### Installing Dependencies

```sh
npm install
```

### Start

```sh
grunt
```

## Style Guide

We are using tslint and following the recommended style guide, borrowing many styling choices from their preferred format.
Our most up to date linting settings can be found in our `tslint.json` file for any rules that fall outside of this format.

#### General

Add whitespace to pad either side of all curly and angle brackets - { Foo } [ "bar" ]
Use type `any` rather than leaving off a type where type of `any` is expected

#### Modules

Alphabetize import statements, within the necessary grouping
Empty constructor functions should contain one whitespace - `{ }`
Line up `from` in import statements whenever possible
Separate import statements by concern when importing more than 8-10
