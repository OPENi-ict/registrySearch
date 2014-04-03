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
var config = require('../config.json');
var client = new elasticsearch.Client({
    host: config.elasticsearchIP
});

exports.query = function (input, res) {
  var searchTerm = '@context.'+input+'.@type';

    client.search({
      index: 'openi',
      body: {
        filter: {
          bool: {
            must: [
            {
              exists: {
              field: searchTerm
              }
            }
            ]
          }
        }
      }
    }, function (error, response) {
        if (response.hits.total > 0) {
              if(res.req._parsedUrl.pathname === '/types') {
                res.send(response);
              } else if(res.req._parsedUrl.pathname === '/') {
                res.render('query', { term: input, other: response});
              }
        } else if (error) {
            console.log(error);
        } else {
            if(res.req._parsedUrl.pathname === '/types') {
                res.send(response);
              } else if(res.req._parsedUrl.pathname === '/') {
                res.render('query', { result: 'No matches', term: input });
              }
        }
    });
};