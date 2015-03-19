

var elasticsearch = require('elasticsearch');
var http = require('http');
var fs = require('fs');
var request = require('request');

var client = new elasticsearch.Client({
    host: "dev.openi-ict.eu:9200"
});

exports.index = function(req, res){
    
    client.cluster.health(function (err, resp) {
        if (err && err.message === 'No Living connections') {
            console.error(err.message);
            console.log('Please start elasticsearch');
            res.render('503', { title: 'Express' });
        } else {
            res.render('index', { title: 'Express' });
        }
    });
};