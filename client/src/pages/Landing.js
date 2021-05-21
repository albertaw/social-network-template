import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
    render() {
        return (
            <div className="hero text-center">
                <div className="container">
                    <div class="center">
                        <h1 class="text-center fw-bold">Dev Social</h1>
                        <p class="lead text-center">
                            Chat with other developers. 
                        </p>
                        <p class="text-center">
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