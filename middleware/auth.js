const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		throw new UnauthenticatedError('No Token provided');
	}

	const token = authHeader.split(' ')[1];
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const { id, username } = decoded;

		// defines the user property inside req
		req.user = { id, username };
		// the next function called will receive req.user
		next();
	} catch (error) {
		throw new UnauthenticatedError('Not authorized to access this route');
	}
};

module.exports = authenticationMiddleware;
