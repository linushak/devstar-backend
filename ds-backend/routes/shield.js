var express = require('express');
var router = express.Router();
var requestHelper = require('../requestHelper');
var incomingHandler = require('../incomingHandler');
var missionHandler = require('../missionHandler');

const xCoordinate = 33;
const yCoordinate = 45;

/**
 * Endpoint to hit the shield.
 */
router.get('/' + xCoordinate + '/' + yCoordinate + '/:squadName/:microserviceName', function(req, res, next) {
  console.log('Incoming fire to shield, squadName: ' + req.params.squadName + ', ms name: ' + req.params.microserviceName);

			if (req.params.squadName == 'test') {
				// this is used to test out the endpoint from Postman
				req.params.squadName = 'blue';
				incomingHandler.incomingFire(req.params.squadName, req.params.microserviceName, missionHandler.MISSION.SHIELD);
				res.send('Shield hit!');
			} else {
          if (req.headers['user-agent']) {
            // is coming from a non-server client
            res.send('Caller is not a fighter!');
          } else {
            incomingHandler.incomingFire(req.params.squadName, req.params.microserviceName, missionHandler.MISSION.SHIELD);
            res.send('Shield hit!');
          }
			}
});

module.exports = router;
