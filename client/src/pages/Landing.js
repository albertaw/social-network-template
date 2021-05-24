import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
    componentDidMount() {
        if(localStorage.jwtToken) {
            this.props.history.push('/dashboard');
        }
    }
    
    render() {
        return (
            <div className="hero content text-center">
                <div className="container">
                    <div className="center">
                        <h1 className="text-center fw-bold">Dev Social</h1>
                        <p className="lead text-center">
                            Chat with other developers. 
                        </p>
                        <p className="text-center">
                            <Link className="btn btn-dark btn-lg me-2" to="/signup" role="button">Signup</Link>
                            <Link className="btn btn-dark btn-lg" to="/login" role="button">Login</Link>
                        </p>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Landing;