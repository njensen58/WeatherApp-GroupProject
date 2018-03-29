const express = require("express");
const userRoutes = express.Router();
const Users = require('../models/user');

userRoutes.get("/", (req, res) => {
    Users.find((err, users) => {
        if (err) return res.status(500).send(err);
        return res.send(users);
    });
});

userRoutes.get("/:id", (req, res) => {
    Users.findById(req.params.id, (err, user) => {
        if (err) return res.status(500).send(err);
        return res.send(user);
    });
});

userRoutes.post("/", (req, res) => {
    const newUser = new Users(req.body);
    newUser.save(err => {
        if (err) return res.status(500).send(err);
        return res.status(201).send(newContact);
    });
});

userRoutes.put("/:id", (req, res) => {
    Users.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
        if (err) return res.status(500).send(err);
        return res.send(updatedUser);
    });
});

userRoutes.delete("/:id", (req, res) => {
    Users.findByIdAndDelete(req.params.id, (err, removedUser) => {
        if (err) return res.status(500).send(err);
        return res.send(removedUser);
    });
});

module.exports = userRoutes;
