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
          .then(doc => {
            doc = {
              manager_id: doc.manager_id,
              price_range: doc.price_range,
              review_score: doc.review_score,
              facility: doc.facility,
              current_filter: doc.current_filter,
              score: doc.score,
              facility: doc.facility
            };
            res.json(doc);
          })
          .catch(err => res.sendStatus(500));
      } else {
        res.sendStatus(400);
      }
    });

    router.post('/update', (req, res) => {
      const query = { manager_id: +req.body.manager_id }
      doc = {
        price_range: req.body.price_range,
        review_score: req.body.review_score,
        facility: req.body.facility,
        current_filter: req.body.current_filter,
        score: req.body.score,
        facility: req.body.facility
      };
      const update = {
        $set: doc
      }
      db.collection('filters').findOneAndUpdate(query, update)
        .then(r => res.sendStatus(200))
        .catch(err => res.sendStatus(500));
    });
  })
  .catch(err => console.log(err));
module.exports = router;
