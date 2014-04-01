var elasticsearch = require('elasticsearch');
var http = require('http');
var fs = require('fs');
var request = require('request');

var client = new elasticsearch.Client({
    host: 'localhost:9200'
});

exports.index = function(req, res){
    
    client.cluster.health(function (err, resp) {
        if (err && err.message === 'No Living connections') {
            console.error(err.message);
            console.log('Please start elasticsearch');
            res.render('503', { title: 'Express' });
        } else {
            console.dir('The ES Cluster ' + resp.cluster_name + ' is running');
            res.render('index', { title: 'Express' });
        }
    });
};