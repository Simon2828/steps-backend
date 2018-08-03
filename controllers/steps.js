const express = require('express');

module.exports = (dataLoader) => {
    const stepsController = express.Router();
    stepsController.get('/', (req, res) => {
        dataLoader.getAllLos()
            .then(data => res.json(data))
            .catch(err => res.status(400).json(err));
    });

    stepsController.post('/edit-lo', (req, res) => {
        dataLoader.editLo({
            originalLO: req.body.originalLO,
            lO: req.body.lO,
            id: req.body.id,
            databaseId : req.body.databaseId
        })
            .then(data => res.status(201).json(data))
            .catch(err => res.status(400).json(err));
    });

    stepsController.post('/edit-step', (req, res) => {
        dataLoader.editStep({
            originalStep: req.body.originalStep,
            step: req.body.step,
            stepIndex: req.body.stepIndex,
            databaseId: req.body.databaseId
        })
            .then(data => res.status(201).json(data))
            .catch(err => res.status(400).json(err));
    })

    return stepsController;
}

// res.send('POST request sent')