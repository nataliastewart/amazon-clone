import './App.css';
import Header from './Header.js';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './Checkout';

function App() {
	return (
		//BEM convention for styling - lowercase "app"
		//Important: The Header must be outside of the switch
		<Router>
			<div className="app">
				<Header />
				<Switch>
					<Route path="/checkout">
						<Checkout />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
