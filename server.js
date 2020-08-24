'use strict';
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const session = require('express-session');
const mongo = require('mongodb').MongoClient;
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
app.use(cors());

/*global io*/
//var socket = io();

fccTesting(app); //For FCC testing purposes

app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');

// MongoDB Atlas Database Access Credentials
const dbUserName = process.env.USER_NAME;
const dbUserPass = process.env.USER_PASSWORD;
const dbName = process.env.DB_NAME;
const dbCluster = process.env.DB_CLUSTER;
const dbUrl = `mongodb+srv://${dbUserName}:${dbUserPass}@${dbCluster}/${dbName}?retryWrites=true&w=majority`;

mongo.connect(
	dbUrl,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err, client) => {
		if (err) {
			console.log('Database error: ' + err);
		} else {
			const db = client.db();
			console.log(
				'Successful database connection to Mongoose Atlas database named: ',
				dbName
			);

			app.use(
				session({
					secret: process.env.SESSION_SECRET,
					resave: true,
					saveUninitialized: true,
				})
			);
			passport.use(
				new GitHubStrategy(
					{
						clientID: process.env.GITHUB_CLIENT_ID,
						clientSecret: process.env.GITHUB_CLIENT_SECRET,
						callbackURL:
							'https://fcc-adv-node-and-express14-16.glitch.me/auth/github/callback',
					},
					function (accessToken, refreshToken, profile, cb) {
						console.log('profile: ', profile);
						//Database logic here with callback containing our user object (challenges 14-16)
						db.collection('socialusers').findAndModify(
							{ id: profile.id },
							{},
							{
								$setOnInsert: {
									id: profile.id,
									name: profile.displayName || 'John Doe',
									photo: profile.photos[0].value || '',
									email: profile.emails[0].value || 'No public email',
									created_on: new Date(),
									provider: profile.provider || '',
								},
								$set: {
									last_login: new Date(),
								},
								$inc: {
									login_count: 1,
								},
							},
							{ upsert: true, new: true },
							(err, doc) => {
								return cb(err, doc.value);
							}
						);
						//end of dbcollection find and modify
					}
				)
			);

			app.use(passport.initialize());
			app.use(passport.session());

			function ensureAuthenticated(req, res, next) {
				if (req.isAuthenticated()) {
					return next();
				}
				res.redirect('/');
			}

			passport.serializeUser((user, done) => {
				done(null, user.id);
			});

			passport.deserializeUser((id, done) => {
				db.collection('socialusers').findOne({ id: id }, (err, doc) => {
					done(null, doc);
				});
			});

			app
				.route('/auth/github') //challenge 14: Implementation of Social Authentication
				.get(passport.authenticate('github'));

			app
				.route('/auth/github/callback') //challenge 14: Implementation of Social Authentication
				.get(
					passport.authenticate('github', { failureRedirect: '/' }),
					(req, res) => {
						res.redirect('/profile');
					}
				);

			app.route('/').get((req, res) => {
				res.render(process.cwd() + '/views/pug/index');
			});

			app.route('/profile').get(ensureAuthenticated, (req, res) => {
				res.render(process.cwd() + '/views/pug/profile', { user: req.user });
			});

			app.route('/logout').get((req, res) => {
				req.logout();
				res.redirect('/');
			});

			app.use((req, res, next) => {
				res.status(404).type('text').send('Not Found');
			});

			app.listen(process.env.PORT || 3000, () => {
				console.log('Listening on port ' + process.env.PORT);
			});
		}
	}
);
