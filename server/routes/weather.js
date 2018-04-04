const express = require('express');
const axios = require('axios');
const TOKEN = process.env.PIC_TOKEN;
const WTOKEN = process.env.WEATHER_TOKEN;
const weatherRoute = express.Router();

weatherRoute.get('/', (req, res) => {
    let city = req.query.address.length > 1 ? req.query.address.split(' ').join('+') : req.query.address;
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${TOKEN}`).then(response => {
        let lat = response.data.results[0].geometry.location.lat;
        let lng = response.data.results[0].geometry.location.lng;
        return {lat, lng}
    }).then(coordinates => {
        axios.get(`https://api.darksky.net/forecast/${WTOKEN}/${coordinates.lat},${coordinates.lng}`).then(response => {
            res.send(response.data)
        })
    })
})



module.exports = weatherRoute;
