'use strict';

var express = require('express'),
    app = express(),
    helmet = require('helmet'),
    bodyParser = require('body-parser'),
    cluster = require('cluster'),
    MongoClient = require('mongodb').MongoClient,
    cors = require('cors'),
    config = require('./config');

if (cluster.isMaster) {
  for (var i = 0; i < config.numWorkers; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker, code, signal) => cluster.fork());

} else {
  MongoClient.connect(config.dbUrl)
    .then(db => {

      app.use(cors());
      app.use(helmet());
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(express.static('assets'));
      app.use('/api/filters', require('./routes/filters'));
      app.use('/api/comments', require('./routes/comments'));

      app.listen(config.port, function() {
        console.log(`Server listening on port ${this.address().port}`)
      });
    })
    .catch(err => console.log(err));
}
