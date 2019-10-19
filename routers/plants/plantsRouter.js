const express = require('express')
const db = require('./plants-model')
const restricted = require('../users/restricted-middleware')


// resricted allows to pull user from request headers to use against tbl
router = express.Router()

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


// delete plant (needs plant id)


//get plants by user


//edit plant (needs id)


module.exports = router