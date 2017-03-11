'use strict';

var router = require('express').Router(),
    MongoClient = require('mongodb').MongoClient,
    config = require('../config');

MongoClient.connect(config.dbUrl)
  .then(db => {
    router.get('/:managerId', (req, res) => {
      if (req.params.managerId) {
        const query = {
          manager_id: +req.params.managerId
        }
        db.collection('filters')
          .findOne(query)
          .then(doc => res.json(doc))
          .catch(err => res.sendStatus(500));
      } else {
        res.sendStatus(400);
      }
    });

    router.post('/update', (req, res) => {
      const query = { manager_id: +req.body.manager_id }
      const update = {
        $set: {
          price_range: req.body.price_range,
          review_scores: req.body.review_scores
        }
      }
      db.collection('filters').findOneAndUpdate(query, update)
        .then(r => res.sendStatus(200))
        .catch(err => res.sendStatus(500));
    });
  })
  .catch(err => console.log(err));
module.exports = router;
