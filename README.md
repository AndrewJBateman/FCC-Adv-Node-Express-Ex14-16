# :zap: Node/Express Exercises

* Node.js, Express & pug app using the Github authorization strategy
* Part of FreeCodeCamp exercises for Front End Certification

*** Note: to open web links in a new window use: _ctrl+click on link_**

## :page_facing_up: Table of contents

* [:zap: Node/Express Exercises](#zap-nodeexpress-exercises)
  * [:page_facing_up: Table of contents](#page_facing_up-table-of-contents)
  * [:books: General info](#books-general-info)
  * [:camera: Screenshots](#camera-screenshots)
  * [:signal_strength: Technologies](#signal_strength-technologies)
  * [:floppy_disk: Setup](#floppy_disk-setup)
  * [:computer: Code Examples](#computer-code-examples)
  * [:cool: Features](#cool-features)
  * [:clipboard: Status & To-Do List](#clipboard-status--to-do-list)
  * [:clap: Inspiration](#clap-inspiration)
  * [:envelope: Contact](#envelope-contact)

## :books: General info

* This project is no longer part of the Free Code Camp Front End Certification. Original instructions from FCC:

1) ADD YOUR MongoDB connection string to .env without quotes as db
    `example: DB=mongodb://admin:pass@1234.mlab.com:1234/fccpersonallib`
2) SET NODE_ENV to `test` without quotes
3) You need to create all routes within `routes/api.js`
4) You will add any security features to `server.js`
5) You will create all of the functional tests in `tests/2_functional-tests.js`

* MongoDB Cloud Atlas database set up to use Google Cloud Storage.
* Authorizes user to access [App Auth Exercise](https://github.com/settings/applications/760818)

## :camera: Screenshots

![Example screenshot](./img/github.png).

## :signal_strength: Technologies

* [Node v12](https://nodejs.org/en/) javaScript runtime built on Chrome's V8 JavaScript engine
* [Express v4](https://expressjs.com/) Fast, unopinionated, minimalist web framework for Node.js
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud-based NoSQL database
* [mongoose v5](https://mongoosejs.com/) object modelling for node.js.
* [Helmet v4](https://helmetjs.github.io/) Express.js security with HTTP headers.
* [Passport v0.4](http://www.passportjs.org/) authentication middleware for Node.js
* [Cors v2](https://www.npmjs.com/package/cors) node.js package for providing Connect/Express middleware that can be used to enable CORS with various options.
* [Pug v3](https://pugjs.org/api/getting-started.html) template engine for Node.js and browser that compiles to HTML.
* [jQuery v3](https://jquery.com/) Javascript library

## :floppy_disk: Setup

* Create MongoDB Atlas Cloud database (or local installed MongoDB database) and add user access/database credentials (USER_NAME, USER_PASSWORD, DB_CLUSTER, PORT, DB_NAME & SESSION_SECRET) to a new `.env` file. These are used in `server.js`.
* Create github application and get access credentials (Client ID & Client Secret) to the `.env` file. These are used in `auth.js`.
* Add your IP address to MongoDB Atlas Network Access whitelist. Or simply whitelist all (IP address 0.0.0.0/0).
* Run `node server.js` for a dev server. Navigate to `http://localhost:4000/`.
* The app will not automatically reload if you change any of the source files.

## :computer: Code Examples

* extract from `server.js` using authentication callback function

```javascript
			app
				.route('/auth/github/callback') //challenge 14: Implementation of Social Authentication
				.get(
					passport.authenticate('github', { failureRedirect: '/' }),
					(req, res) => {
						res.redirect('/profile');
					}
				);
```

## :cool: Features

* Common MongoDB Atlas Cloud connection method used to save a lot of time with multple projects.

## :clipboard: Status & To-Do List

* Status: connects to database but fails to complete Github Client authorization
* To-Do: move authorization to separate file and fault-find

## :clap: Inspiration

* [freeCodeCamp's curriculum](https://www.freecodecamp.org/learn/) - although it has changed in the years since I completed this challlenge.
* [FCC passport.serializeUser() & passport deserializeUser() explanation](https://forum.freecodecamp.org/t/passport-serializeuser-passport-deserializeuser-explanation/205578)

## :envelope: Contact

* Repo created by [ABateman](https://www.andrewbateman.org) - you are welcome to [send me a message](https://andrewbateman.org/contact)
