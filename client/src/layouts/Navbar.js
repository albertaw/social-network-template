import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import setAuthToken from '../utils//setAuthToken';
import Dropdown from '../components/Dropdown';
import DeleteAccountModal from '../components/DeleteAccountModal';
import '../App.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false
        }

        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.onDeleteAccountClick = this.onDeleteAccountClick.bind(this);
    }

    componentDidMount() {
        if(localStorage.jwtToken) {
            this.setState({isAuthenticated: true});
        }
    }

    onLogoutClick() {
        localStorage.removeItem('jwtToken');
        setAuthToken(false);
        window.location.href = '/';
    }

    async onDeleteAccountClick() {
        try {
            await axios.delete('/api/profile');
            await axios.delete('/api/user/posts');
            await axios.delete('/api/user');
            
            localStorage.removeItem('jwtToken');
            setAuthToken(false);
            window.location.href = '/';
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        const { isAuthenticated } = this.state;
        const authLinks = (
            <ul className="navbar-nav">
                <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
                <Dropdown onLogoutClick={this.onLogoutClick} />
            </ul>
        )
        return (
            <div className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="navbar-brand">Dev Social</li>
                    </ul>
                    <ul className="navbar-nav"> 
                        <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/posts">Posts</Link></li>
                        { isAuthenticated ? authLinks : null }
                    </ul>
                </div>
                <DeleteAccountModal onDeleteAccountClick={this.onDeleteAccountClick} />
            </div>
        )
    }
}

export default Navbar;