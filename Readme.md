# OPENi Registry Search

## Setup

`npm install` & `npm start`

## Current Functionality

## Using the Sense plugin for Chrome

<a href="https://chrome.google.com/webstore/detail/sense-beta/lhjgkmllcaadmopgmanpapmpjgmfcfig/related?hl=en" target="_blank">This plugin</a> is highly recommended
as a way of experimenting with queries.

Set the server as `http://dev.openi-ict.eu:9200/objects`, replacing `objects` with whatever index you want to query against.

Then simply run a query such as

```
POST /_search
{
    "filter": {
        "bool": {
            "must":
                {"exists": {"field" : "name"}},
            "must":
                {"exists": {"field" : "@cloudlet"}}
        }
    }
}
```