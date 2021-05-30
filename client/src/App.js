import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProfileEdit from './pages/ProfileEdit';
import Posts from './pages/Posts';
import Profiles from './pages/Profiles';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import setAuthToken from './utils/setAuthToken';
import checkTokenExpired from './utils/checkTokenExpired';

if(localStorage.jwtToken) {
	const token = localStorage.jwtToken;
	setAuthToken(token)
	checkTokenExpired(token);
}

function App() {
  	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Landing} />
				<Route exact path='/signup' component={Signup} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/dashboard' component={Dashboard} />
				<Route exact path='/dashboard/profile' component={ProfileEdit} />
				<Route exact path='/posts' component={Posts} />
				<Route exact path='/users' component={Profiles} />
				<Route exact path='/users/:username' component={Profile} />
				<Route component={NotFound} />
			</Switch>
		</Router>
  );
}

export default App;
