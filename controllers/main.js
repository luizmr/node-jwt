// check username, password in post - login request
// ix exist, create new JWT
// send back to front-end

// setup auth so only the request with JWT can access the dashboard

const jwt = require('jsonwebtoken');
const { BadRequest } = require('../errors');

const login = async (req, res) => {
	const { username, password } = req.body;

	// can be done using mongoose validation, Joi or manually

	if (!username || !password) {
		throw new BadRequest('Please provide email and password');
	}

	// normally provided by DB
	const id = new Date().getDate();

	const token = jwt.sign(
		{
			username,
			id,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '30d',
		},
	);

	res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
	const luckyNumber = Math.floor(Math.random() * 100);
	res.status(200).json({
		msg: `Hello, ${req.user.username}`,
		secret: `Here is  your authorized data, your lucky number is ${luckyNumber}`,
	});
};

module.exports = {
	login,
	dashboard,
};

// without authmiddleware

// const dashboard = async (req, res) => {
// 	// console.log(req.headers);
// 	const authHeader = req.headers.authorization;

// 	if (!authHeader || !authHeader.startsWith('Bearer ')) {
// 		throw new CustomAPIError('No Token provided', 401);
// 	}

// 	const token = authHeader.split(' ')[1];

// 	try {
// 		const decoded = jwt.verify(token, process.env.JWT_SECRET);

// 		const luckyNumber = Math.floor(Math.random() * 100);
// 		res.status(200).json({
// 			msg: `Hello, ${decoded.username}`,
// 			secret: `Here is  your authorized data, your lucky number is ${luckyNumber}`,
// 		});
// 	} catch (error) {
// 		throw new CustomAPIError('Not authorized to access this route', 401);
// 	}
// };
