import setAuthToken from './setAuthToken';
import jwt_decode from 'jwt-decode';

const checkTokenExpired = token => {
    const decoded = jwt_decode(token);
	const currentTime = Date.now() / 1000;
	if(decoded.exp < currentTime) {
		localStorage.removeItem('jwtToken');
    	setAuthToken(false);
		window.location.href = '/login';
	}
}

export default checkTokenExpired;