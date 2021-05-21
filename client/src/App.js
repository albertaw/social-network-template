import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <Router>
			<Switch>
				<Route exact path='/' component={Landing} />
				<Route exact path='/signup' component={Signup} />
				<Route exact path='/login' component={Login} />
				{/* <Route exact path='/dashboard' component={Dashboard} />
				<Route component={NotFound} /> */}
			</Switch>
		</Router>
  );
}

export default App;
