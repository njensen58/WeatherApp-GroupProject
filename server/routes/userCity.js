const express = require('express');
const axios = require('axios');
const userCityRoutes = express.Router();
const User = require('../models/user');


userCityRoutes.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
        if (err) return res.status(500).send(err);
        return res.send(updatedUser);
    })
})

module.exports = userCityRoutes;
