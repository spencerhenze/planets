let session = require('express-session');  // need to pull in the express-session package
let MongoDBStore = require('connect-mongodb-session')(session); // this too
import env from '../config/env'

console.log(process.env.CONNECTIONSTRING)

let store = new MongoDBStore(  // 'store' is the connection to mongodb
	{
		uri: 'student:student@ds153709.mlab.com:53709/bookmarks',  // this is referencing your mlab connection string
		collection: 'Sessions' // this is where you save all the information about JWTs and stuff
	});

// Catch errors 
store.on('error', function (error) {
	console.error('SESSION ERROR: ', error);
});


//IMPORTANT STUFF
module.exports = session({
    secret: 'It\'s dangerous to go alone',  // Hackers will have access to all of your data if they get this secret
    // don't store this on public repos
	cookie: { // tells how long I want a session to live for
		maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week 
	},
	store: store,
	resave: true,
	saveUninitialized: true
})