var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200'
});

exports.query = function (input, res) {
  var terms = input.split(" and ");
  terms  = terms.filter(Boolean);

  for(var prop in terms) {
    terms[prop] = {
                exists: {
                field: '@context.'+terms[prop]
                }
              };
  }

  var body = {
        filter: {
          bool: {
            must: terms
          }
        }
      };  
  client.search({
      index: 'openi',
      body: body
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