const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./routes');
const helpers = require('./utils');

const hbs = exphbs.create({
  helpers
});

const sequelize = require('./config/connection');

const app = express();

const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//process the cookie
const sessionConfig = {
  secret: 'Super secret secret', // normally this should be an environmental variable
  resave: false,
  saveUninitialized: false,
  // maxAge: 1000 * 60 * 60 * 24
};

// Express middleware
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session(sessionConfig));

app.use(routes);


// sequelize.sync({force: false}).then(() => {
//   app.listen(PORT, () => {
//     console.log(`App listening on port ${PORT}!`);
//   });
// });

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });

