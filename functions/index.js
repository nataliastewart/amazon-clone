const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(
	'sk_test_51IYqv1F0N1jAoLPkmKqkXd2ZfhqRffiTpFPfhKjHi3SfVPXsxiTVo6ILbyH6i7GfO7kYsjwF5qP3kJYVNv7hs6oC008m4WIXGt'
);
//Setting up the API

//-App config
const app = express();
//-Middlewares
app.use(cors({ origin: true }));
app.use(express.json());
//-API routes
app.get('/', (request, response) => response.status(200).send('Hello World'));

app.post('/payments/create', async (request, response) => {
	//the amount in subunits
	const total = request.query.total;
	console.log('Payment Request Recieved BOOM!! >> for this amount:', total);
	const paymentIntent = await stripe.paymentIntents.create({
		amount: total, //subunits of the currency (usd $)
		currency: 'usd',
	});
	//All good - Created - status 201
	response.status(201).send({
		clientSecret: paymentIntent.client_secret,
	});
});
//-Listen command
exports.api = functions.https.onRequest(app);

//example endpoint
//http://localhost:5001/clone-d3b78/us-central1/api
