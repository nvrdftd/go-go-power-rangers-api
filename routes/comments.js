'use strict';

var router = require('express').Router(),
    MongoClient = require('mongodb').MongoClient,
    config = require('../config');

MongoClient.connect(config.dbUrl)
  .then(db => {

    router.get('/:managerId', (req, res) => {
      if (req.params) {
        db.collection('comments').findOne({ manager_id: +req.params.managerId })
          .then(doc => res.json(doc))
          .catch(err => res.sendStatus(500));
      } else {
        res.sendStatus(400);
      }
    });

    router.post('/add', (req, res) => {
      if (req.body) {
        const query = {
          'manager_id': req.body.managerId,
          'hotel_entities.hotel_id': req.body.hotel_id
        };

        const comment = {
          user_id: req.body.user_id,
          text: req.body.text
        }
        const update = {
          $addToSet: { 'hotel_entities.comments': comment }
        }
        db.collection('comments').findOneAndUpdate(query, update, { upsert: true })
          .then(r => res.sendStatus(200))
          .catch(err => res.sendStatus(500));
      } else {
        res.sendStatus(400);
      }
    });
  })
  .catch(err => console.log(err));
module.exports = router;
