import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (
            <div className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="navbar-brand float-left">Dev Social</li>
                    </ul>
                    <ul className="navbar-nav float-right">
                        <li className="nav-item"><a className="nav-link" data-toggle="modal" data-target="#postModal">New Post</a></li>
                        <li className="nav-item"><a className="nav-link">Signup</a></li>
                        <li className="nav-item"><a className="nav-link">Login</a></li>
                        <li className="nav-item"><a className="nav-link">Logout</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Navbar;