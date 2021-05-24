import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import setAuthToken from '../utils//setAuthToken';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false
        }
    }

    componentDidMount() {
        if(localStorage.jwtToken) {
            this.setState({isAuthenticated: true});
        }
    }

    onLogoutClick(e) {
        e.preventDefault();
        localStorage.removeItem('jwtToken');
        setAuthToken(false);
        window.location.href = '/';
    }

    render() {
        const { isAuthenticated } = this.state;
        const authLinks = (
            <ul className="navbar-nav">
                <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
                <li className="nav-item"><button className="btn btn-warning" onClick={this.onLogoutClick.bind(this)}>Logout</button></li>
            </ul>
        )

        const guestLinks = (
            <ul className="navbar-nav"> 
                <li className="nav-item"><Link className="nav-link" to="/signup">Signup</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            </ul>
        )
        return (
            <div className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="navbar-brand">Dev Social</li>
                    </ul>
                    <ul className="navbar-nav"> 
                        <li className="nav-item"><Link className="nav-link" to="/posts">Posts</Link></li>
                        { isAuthenticated ? authLinks : null }
                    </ul>
                </div>
            </div>
        )
    }
}

export default Navbar;