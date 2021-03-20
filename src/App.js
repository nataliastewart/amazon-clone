import './App.css';
import Header from './Header.js';
import Home from './Home';

function App() {
	return (
		//BEM convention for styling - lowercase "app"
		<div className="app">
			<Header />
			<Home/>
		</div>
	);
}

export default App;
