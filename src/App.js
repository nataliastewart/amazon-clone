import React, { useEffect } from 'react';
import './App.css';
import Header from './Header.js';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe(
	//Publishable key - Stripe.com - developers
	'pk_test_51IYqv1F0N1jAoLPkTJGfGSztcvWXS1dAyuODCZfprCv35JmWk1Y2StWKPBuERYhfNSuJcLVtsxd8sQ2r3JFRdPqQ00FNy1MLrf'
);

function App() {
	const [{}, dispatch] = useStateValue();
	//creates a listener to always keep track of who is Logged in
	useEffect(() => {
		//will only run once when the app component loads...
		//this line of code is always listening who logs In or Logs out, will re-do this code (update)
		//whenever the authentication changes, it will give the authentication User.
		auth.onAuthStateChanged(authUser => {
			console.log('THE USER IS: ', authUser);
			if (authUser) {
				//the user just logged in/was logged in
				dispatch({
					//everytime they log in, it will dispatch the user to the dataLayer.
					type: 'SET_USER',
					user: authUser,
				});
			} else {
				//the user is logged out
				dispatch({
					//When they log out, the user will be erased(null) from dataLayer
					type: 'SET_USER',
					user: null,
				});
			}
		});
	}, []);

	return (
		//BEM convention for styling - lowercase "app"
		//Important: The Header must be outside of the switch
		<Router>
			<div className="app">
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/checkout">
						<Header />
						<Checkout />
					</Route>
					<Route path="/payment">
						<Header />
						<Elements stripe={promise}>
							<Payment />
						</Elements>
					</Route>
					<Route path="/">
						<Header />
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
