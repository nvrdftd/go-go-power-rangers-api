'use strict';

var router = require('express').Router(),
    MongoClient = require('mongodb').MongoClient,
    config = require('../config');

MongoClient.connect(config.dbUrl)
  .then(db => {

    router.get('/:managerId', (req, res) => {
      if (req.params) {
        db.collection('comments').find({ manager_id: req.params.mangagerId })
          .then(doc => res.json(doc))
          .catch(err => res.sendStatus(500));
      } else {
        res.sendStatus(400);
      }
    });

    router.post('/add', (req, res) => {
      if (req.body) {
        const query = {
          manager_id: req.body.mangagerId,
          'comments.hotel_id': req.body.hotelId
        };
        const update = {
          $addToSet: { 'comments.hotel_id': req.body.comment }
        }
        db.collection('comments').insertOne(filter, update, { upsert: true })
          .then(r => console.log(r))
          .catch(err => console.log(err));
      } else {
        res.sendStatus(400);
      }
    });
  })
  .catch(err => console.log(err));
module.exports = router;
