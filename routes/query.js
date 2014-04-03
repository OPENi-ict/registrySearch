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

var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var request = require('request');
var singleTerm = require('../lib/singleTerm');
var multiTerms = require('../lib/multiTerms');
var byId = require('../lib/byId');



exports.webQuery = function(req, res){
    var input;
    if(req.body.search_term) {
      input = req.body.search_term;
      var terms = input.split(" and ");
        if (terms.length === 1) {
          singleTerm.query(input, res);
        } else if (terms.length > 1) {
          multiTerms.query(input, res);
        }
    } else if(req.body.search_id) {
        input = req.body.search_id;
        byId.query(input, res);
    }
};


exports.restQuery = function(req, res) {
    var input = req._parsedUrl.query;
    var queries = qs.parse(input);
    console.log(queries);
    if(input.indexOf('term') === 0) {
      var terms = queries.term;
      if(typeof(terms) === 'string') {
        singleTerm.query(terms, res);
      } else if(typeof(terms) === 'object') {
        var dummy = '';
        for(var prop in terms) {
          dummy = terms[prop] + ' and ' + dummy;
        }
        multiTerms.query(dummy, res);
      }
    } else if(input.indexOf('id') === 0) {
      var id = queries.id;
      byId.query(id, res);
    } else {
      console.log('Unsupported search');
    }
};