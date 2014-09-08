/**
 * Module Dependencies
 */

var redis = require('redis');
var redisUrl = require('redis-url');
var queryString = require('query-string');

/**
 * Connection.js
 *
 * Handles connecting and disconnecting from a redis server.
 */

var Connection = module.exports = function(config) {

  // Hold Config parameters
  this.config = config;

  return this;

};


///////////////////////////////////////////////////////////////////////////////////////////
/// PUBLIC METHODS
///////////////////////////////////////////////////////////////////////////////////////////


/**
 * Connect to the redis instance
 *
 * @param {Function} callback
 * @api public
 */

Connection.prototype.connect = function(cb) {
  var client,
      config = this.config;

  if (config.url !== null) {

    var urlOptions = queryString.stringify(config.options),
        url = config.url + urlOptions;

    client = redisUrl.connect(url);

  } else {

    client = config.password !== null ?
      redis.createClient(config.port, config.host, config.options).auth(config.password) :
      redis.createClient(config.port, config.host, config.options);

  }

  client.once('ready', function() {
    cb(null, client);
  });
};
