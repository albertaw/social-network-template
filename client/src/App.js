import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Posts from './pages/Posts';
import NotFound from './pages/NotFound';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import checkTokenExpired from './utils/checkTokenExpired';

if(localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken)
	checkTokenExpired();
}

function App() {
  	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Landing} />
				<Route exact path='/signup' component={Signup} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/dashboard' component={Dashboard} />
				<Route exact path='/posts' component={Posts} />
				<Route component={NotFound} />
			</Switch>
		</Router>
  );
}

export default App;
