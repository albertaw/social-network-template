import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
    render() {
        return (
            <div className="center">
                <h1>Page not found</h1>
                <p className="text-center">Return <Link to="/">home</Link></p>
            </div>
        )
    }
}

export default NotFound;