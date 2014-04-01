var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200'
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