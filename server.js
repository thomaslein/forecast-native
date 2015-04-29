require('dotenv').load();
var Forecast = require('forecast.io');
var util = require('util');
var express = require('express');
var geocoder = require('geocoder');
var bodyParser = require('body-parser');
var app = express();
var host = 'localhost';
var port = '8082';
var jsonParser = app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: true })
var googleGeocodeURL = "http://maps.google.com/maps/api/geocode/json"
var path = app.use(express.static(__dirname + '/public'));
var lat = 0;
var lng = 0;
var formatted_address = '';
var forecastOpstions = {
  APIKey: process.env.FORECAST_API_KEY,
  timeout: 2000
}
forecast = new Forecast(forecastOpstions);
var settings = {
  units: 'si',
  exclude: 'minutely,daily,flags'
}

app.post('/weather', function(req, res){
  var location = req.body.location;
  //var isGeolocation = /^[0-9,.]*$/.test(location);
  console.log('I got request for location: ' + location);
  var passResponse = function(data){
    data.formatted_address = formatted_address
    console.log('Found this location: ' + data.formatted_address);
    res.json(data);
    res.end();
  }
  geocoder.geocode(location, function ( err, data ) {
    lat = data.results[0].geometry.location.lat
    lng = data.results[0].geometry.location.lng
    formatted_address = data.results[0].formatted_address
    forecast.get(lat, lng, settings, function (err, res, data) {
      if (err) throw err;
      passResponse(data)
    });
  });
});

app.listen(port, host, function(){
  console.log('app running: ' + host + ':' + port);
});




