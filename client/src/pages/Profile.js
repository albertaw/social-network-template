import React, { Component } from 'react';
import Navbar from '../layouts/Navbar';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            bio: '',
            location: '',
            skills: '',
            website: '',
            githubUsername: '',
            errors: {}
        }

    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <h2 className="mt-5 mb-5 text-center">Profile page</h2>
                </div>
            </div>
        )
    }
}

export default Profile;