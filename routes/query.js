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