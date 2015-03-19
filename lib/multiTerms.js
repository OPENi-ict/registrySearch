

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: "dev.openi-ict.eu:9200"
});

exports.query = function (input, res) {
  var terms = input.split(" and ");
  terms  = terms.filter(Boolean);

  for(var prop in terms) {
     if(terms.hasOwnProperty(prop)) {
        terms[prop] = {
           exists: {
              field: terms[prop]
           }
        };
     }
  }

  var body = {
     filter: {
        bool: {
           must: terms
        }
     }
  };

   client.search({
         index: 'objects',
         body: body
      }, function (error, response) {
         if (error) {
            console.log(error);
         } else if (response.hits.total > 0) {
            res.render('query', { term: input, other: response});
         } else {
            res.render('query', { result: 'No matches', term: input });
         }
      }
   );
};