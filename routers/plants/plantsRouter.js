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

router.delete('/', restricted, (req, res) => {
    const deletedPlant = req.body.id
    db.remove(deletedPlant)
        .then(plants => {
            res.status(204).json(plants)
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "plant could not be deleted"
            })
        })
})




// delete plant (needs plant id)


//get plants by user


//edit plant (needs id)


module.exports = router