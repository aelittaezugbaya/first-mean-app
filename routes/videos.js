var express = require('express');
var router = express.Router();

// var monk = require('monk');
const mongoose = require('mongoose');

const db='mongodb://localhost:27017/vidzy';

mongoose.connect(db, {
  useMongoClient: true,
});

let videoSchema = mongoose.Schema({
  title: String,
  description: String
});

const Video = mongoose.model('videos', videoSchema);
// var db = monk('localhost:27017/vidzy');

router.get('/', function(req, res) {
    // var collection = db.get('videos');
    //
    // collection.find({}, function(err, videos){
    //     if (err) throw err;
    //   	res.json(videos);
    // });

    Video.find({})
      .then(data => res.json(data))
      .catch(err => {
        throw new Error(err)
      });

    // Video.find({}, function(err, videos) {
    //   if(err) throw err;
    //   res.json(videos);
    // })

});

router.post('/', function(req, res){
    // var collection = db.get('videos');
    // collection.insert({
    //     title: req.body.title,
    //     description: req.body.description
    // }, function(err, video){
    //     if (err) throw err;
    //
    //     res.json(video);
    // });
    Video.create({
      title:req.body.title,
      description: req.body.description
    }).then(video => res.json(video))
    .catch(err => {
      throw new Error(err)
    });

});

router.get('/:id', function(req, res) {
    // var collection = db.get('videos');
    // collection.findOne({ _id: req.params.id }, function(err, video){
    //     if (err) throw err;
    //
    //   	res.json(video);
    // });

    Video.findOne({
      _id: req.params.id
    }).then(video => res.json(video))
    .catch(err => {
      throw new Error(err)
    });

});

router.put('/:id', function(req, res){
    // var collection = db.get('videos');
    // collection.update({
    //     _id: req.params.id
    // },
    // {
    //     title: req.body.title,
    //     description: req.body.description
    // }, function(err, video){
    //     if (err) throw err;
    //
    //     res.json(video);
    // });

    Video.update({_id: req.params.id},{
      title:req.body.title,
      description: req.body.description
    }).then(video=> res.json(video))
    .catch(err => {
      throw new Error(err)
    });
});

router.delete('/:id', function(req, res){
    // var collection = db.get('videos');
    // collection.remove({ _id: req.params.id }, function(err, video){
    //     if (err) throw err;
    //
    //     res.json(video);
    // });

    Video.findOne({
      _id: req.params.id
    }).remove(
      video=>res.json(video)
    ).catch(err => {
      throw new Error(err)
    });
});

module.exports = router;
