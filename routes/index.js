// Copyright 2014 Betapond Ltd

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var elasticsearch = require('elasticsearch');
var http = require('http');
var fs = require('fs');
var request = require('request');
var config = require('../config.json');

var client = new elasticsearch.Client({
    host: config.elasticsearchIP
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