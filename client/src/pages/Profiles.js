import React, { Component } from 'react';
import Navbar from '../layouts/Navbar';

class Profiles extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                <h2 className="mt-5 mb-5 text-center">Users</h2>
                </div>
            </div>
        )
    }
}

export default Profiles;