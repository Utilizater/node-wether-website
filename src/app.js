const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 1111;

//define for express config
const viewsPath = path.join(__dirname, '../templates/views');
const staticPath = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine andviews location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//setup static dirrectory to serve
app.use(express.static(staticPath));

app.get('', (req, res) => {
  res.render('index', { title: 'Weather app', name: 'Niki' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About', name: 'Niki' });
});

app.get('/help', (req, res) => {
  res.render('help', { title: 'Help', name: 'Niki' });
});

app.get('/weather', (req, res) => {
  const { address } = req.query;
  if (!address) return res.send({ error: 'You have to provide address' });

  geocode(address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    forecast(data.latitude, data.longitude, (error, subData) => {
      if (error) return res.send(error);
      res.send({ forecast: subData, location: data.location });
    });
  });
});

app.get('/products', (req, res) => {
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', { title: '404 help', name: 'Niki' });
});

app.get('*', (req, res) => {
  res.render('404', { title: '404', name: 'Niki' });
});

app.listen(port, () => {
  console.log('started');
});
