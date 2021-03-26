import React, { useState, useEffect } from 'react';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { useStateValue } from './StateProvider';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from './firebase';

function Payment() {
	const [{ basket, user }, dispatch] = useStateValue();
	const history = useHistory();
	const stripe = useStripe();
	const elements = useElements();

	const [succeeded, setSucceeded] = useState(false);
	const [processing, setProcessing] = useState('');
	const [error, setError] = useState(null);
	const [clientSecret, setClientSecret] = useState(true);
	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		//generate the special stripe secret wich allow us to charge the customer
		//whenvever the basket changes, we need to generate a new secret - if the total value of the purchase changes
		const getClientSecret = async () => {
			const response = await axios({
				method: 'post',
				//Stripe expects the total in a currencies subunits. if you use $ dollars => need to be => (subunits=> cents (* 100))
				url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
			});
			setClientSecret(response.data.clientSecret);
		};

		getClientSecret();
	}, [basket]);

	console.log('THE SECRET IS: ', clientSecret);

	const handleSubmit = async event => {
		//do all the facy stripe stuff...
		event.preventDefault();
		setProcessing(true);
		const payload = await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(({ paymentIntent }) => {
				//paymentIntent = payment confirmation
				db.collection('users')
					.doc(user?.uid)
					.collection('orders')
					.doc(paymentIntent.id)
					.set({
						basket: basket,
						amount: paymentIntent.amount,
						created: paymentIntent.created,
					});

				setSucceeded(true);
				setError(null);
				setProcessing(false);
				dispatch({
					type: 'EMPTY_BASKET',
				});

				history.replace('/orders');
			});
	};

	const handleChange = event => {
		// Listen for changes in the CardElement
		//and display any erros as the customer types card details
		setDisabled(event.empty);
		setError(event.error ? event.error.message : '');
	};

	return (
		<div className="payment">
			<div className="payment__container">
				<div className="payment__container">
					<h1>
						Checkout (<Link to="checkout">{basket?.length} items)</Link>
					</h1>
				</div>

				{/*Payment section - delivery address*/}
				<div className="payment__section">
					<div className="payment__title">
						<h3>Delivery Address</h3>
					</div>
					<div className="payment__address">
						<p>{user?.email}</p>
						<p>123 React Lane</p>
						<p>Los Angeles, Ca</p>
					</div>
				</div>
				{/*Payment section - review items*/}
				<div className="payment__section">
					<div className="payment_title">
						<h3>Review items and delivery</h3>
					</div>

					<div className="payment__items">
						{basket.map(item => (
							<CheckoutProduct
								id={item.id}
								title={item.title}
								image={item.image}
								price={item.price}
								rating={item.rating}
							/>
						))}
					</div>
				</div>

				{/*Payment section - Payment method*/}
				<div className="payment__section">
					<div className="payment__title">
						<h3>Payment Method</h3>
					</div>
					<div className="payment__details">
						{/*Stripe magic will go*/}
						<form onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />
							<div className="payment__priceContainer">
								<CurrencyFormat
									renderText={value => <h3>Order Total: {value}</h3>}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={'text'}
									thousandSeparator={true}
									prefix={'$'}
								/>
								<button disabled={processing || disabled || succeeded}>
									<span>{processing ? <p>Processing...</p> : 'Buy Now'} </span>
								</button>
							</div>

							{/*Errors - if there is an error, only then you show the error div*/}
							{error && <div>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Payment;
