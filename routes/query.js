
var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var request = require('request');
var singleTerm = require('../lib/singleTerm');
var multiTerms = require('../lib/multiTerms');



exports.webQuery = function(req, res){
   var input = req.body.search_term;
   var terms = input.split(" and ");

   if (terms.length === 1) {
      singleTerm.query(input, res);
   } else if (terms.length > 1) {
      multiTerms.query(input, res);
   }

};