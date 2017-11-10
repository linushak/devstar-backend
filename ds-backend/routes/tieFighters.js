var express = require('express');
var router = express.Router();
var requestHelper = require('../requestHelper');
var incomingHandler = require('../incomingHandler');
var missionHandler = require('../missionHandler');

const xCoordinate = 45;

/**
 * Endpoint to hit one of theMinifighters.
 */
router.get('/' + xCoordinate + '/:y/:squadName/:microserviceName', function(req, res, next) {
  console.log('Incoming TIE fire to shield, squadName: ' + req.params.squadName + ", ms name: " + req.params.microserviceName);

  incomingHandler.incomingMinigun(req.params);
	if (req.params.squadName == 'test') {
		// this is used to test out the endpoint from Postman
		req.params.squadName = 'blue';
		incomingHandler.incomingMinigun(req.params);
		res.send('Something got hit!');
	} else {
		requestHelper.isFromOracle(req)
			.then( isOracle => {
				if (isOracle) {
					incomingHandler.incomingMinigun(req.params);
					res.send('Something got hit!');
				} else {
					res.send('Caller is not a fighter!');
				}
			});
	}
});

module.exports = router;
