var express = require('express');
var router = express.Router();

var mongoose = require( 'mongoose' );

var db = 'mongodb://localhost:27017/vydzy';
mongoose.connect(db,{useMongoClient: true});

mongoose.connection.on('connected', function () {
 console.log('Mongoose connected to ' + db);
});
mongoose.connection.on('error',function (err) {
 console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
 console.log('Mongoose disconnected');
});

var gracefulShutdown = function (msg, callback) {
 mongoose.connection.close(function () {
 console.log('Mongoose disconnected through ' + msg);
 callback();
 });
}

process.once('SIGUSR2', function () {
 gracefulShutdown('nodemon restart', function () {
 process.kill(process.pid, 'SIGUSR2');
 });
});

process.on('SIGINT', function () {
 gracefulShutdown('app termination', function () {
 process.exit(0);
 });
});


// var monk = require('monk');
// var db = monk('localhost:27017/vidzy');
//
router.get('/', function(req, res) {
    var collection = db.get('videos');
    console.log(db.getCollection('videos').find({}));
    collection.find({}, function(err, videos){
        if (err) throw err;
      	res.json(videos);
    });

});

router.post('/', function(req, res){
    var collection = db.get('videos');
    collection.insert({
        title: req.body.title,
        description: req.body.description
    }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

router.get('/:id', function(req, res) {
    var collection = db.get('videos');
    collection.findOne({ _id: req.params.id }, function(err, video){
        if (err) throw err;

      	res.json(video);
    });
});

router.put('/:id', function(req, res){
    var collection = db.get('videos');
    collection.update({
        _id: req.params.id
    },
    {
        title: req.body.title,
        description: req.body.description
    }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

router.delete('/:id', function(req, res){
    var collection = db.get('videos');
    collection.remove({ _id: req.params.id }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

module.exports = router;
