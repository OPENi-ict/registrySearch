var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: "dev.openi-ict.eu:9200"
});

exports.query = function (searchTerm, res) {

    client.search({
      index: 'objects',
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
         if (error) {
            console.log(error);
         } else if (response.hits.total > 0) {
            console.log(response);
            res.render('query', { term: searchTerm, result: response, numResults: response.hits.total});
         } else {
            res.render('query', { result: 'No matches', term: searchTerm });
        }
    });
};