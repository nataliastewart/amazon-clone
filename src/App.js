import './App.css';
import Header from './Header.js';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
	return (
		//BEM convention for styling - lowercase "app"
		<Router>
			<div className="app">
				<Switch>
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
