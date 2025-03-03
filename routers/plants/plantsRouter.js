const express = require('express')
const db = require('./plants-model')
const restricted = require('../users/restricted-middleware')

router = express.Router()

//get plant by user
router.get('/', restricted, (req, res) => {
    db.findPlantsByUser(req.user.id)
        .then(plants => {
            res.status(200).json(plants)
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "could not find plants"
            })
        })
})

//add plant by user
router.post('/', restricted, (req, res) => {
    const plant = req.body
    plant.user_id = req.user.id
    console.log(plant)
    db.add(plant)
        .then(plants => {
            res.status(201).json(plants)
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "could not add plant"
            })
        })
})

//deletes existing plants

router.delete('/', restricted, (req, res) => {
    const deletedPlant = req.body.id
    db.remove(deletedPlant)
        .then(plants => {
            res.json({
                message: "yee plant hath been deleted Tyler"
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "plant could not be deleted"
            })
        })
})

//adds delete route using params for web
router.delete('/:id', restricted, (req, res) => {
    const deletedPlant = req.params.id
    db.remove(deletedPlant)
        .then(plants => {
            res.json({
                message: "yee plant hath been deleted Tyler"
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "plant could not be deleted"
            })
        })
})

//updates an existing plant

router.put('/', restricted, (req, res) => {
    const id = req.body.id
    const updatedPlant = {
        nickname: req.body.nickname,
        species: req.body.species,
        h2oFrequency: req.body.h2oFrequency,
        user_id: req.body.user_id

    }

    db.update(updatedPlant, id)

        .then(plants => {
            res.status(200).json(plants)
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "plant could not be updated"
            })
        })
})
// adds put using params for web
router.put('/:id', restricted, (req, res) => {
    const id = req.params.id
    const updatedPlant = {
        id: req.params.id,
        nickname: req.body.nickname,
        species: req.body.species,
        h2oFrequency: req.body.h2oFrequency,
        user_id: req.body.user_id

    }
    console.log("hello from the other side", updatedPlant)
    db.update(updatedPlant, id)

        .then(plants => {
            res.status(200).json(plants)
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "plant could not be updated"
            })
        })
})

module.exports = router