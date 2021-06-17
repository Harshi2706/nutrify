const dbClient = require('monk')('localhost/nodedb')

module.exports = dbClient;