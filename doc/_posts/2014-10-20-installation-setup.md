---
title: "Installation & Setup"
category: doc
date: 2014-10-20 20:19:00
tags: []
---

## Installation

Choose one of these two methods to get an quickstart:

* Fork the [Github repository][1] and clone it.
* Download the [master][2] and unzip it.
 
[1]: https://github.com/aprueller/jekyll-software-documentation
[2]: https://github.com/aprueller/jekyll-software-documentation/archive/master.zip 

## Setup
### Without Solr index
There is none! It's just a Jekyll template. For general information on Jekyll, refer to the [Jekyll docs](http://jekyllrb.com/docs/home/).

### With Solr index
1. Create a Solr collection with the "schema.xml" file you find in the solr folder.
1. Enable Solr indexing with the property `solr_indexing_enabled` in the config file (`_config.yml`).
1. Configure the url to be used for indexing in the propery `solr_indexing_baseurl`. This url must containing the collection you want to use 
(e.g. `http://localhost:8983/solr/collection1`).
1. Configure the url to be used for queries from the generate web page in the property `solr_query_baseurl`. Considering 
security this url should not point directly at a solr collection but make sure only queries but no other types of
requests (e.g. update or deletes) are possible. This can for example be achieved by using [Apache Httpd][1] proxy rewrites.

[1]: http://httpd.apache.org/ "Apache Httpd Homepage"