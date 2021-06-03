import React, { Component } from 'react';
import Navbar from '../layouts/Navbar';
import ProfileList from '../components/ProfileList';
import axios from 'axios';

class Profiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            errors: {}
        }
    }

    componentDidMount() {
        axios.get('/api/profiles')
            .then(res => {
                this.setState({profiles: res.data});
            })
            .catch(err => {
                this.setState({errors: err.response.data});
            });
    }


    render() {
        let profilesView;
        if (this.state.profiles.length === 0) {
            profilesView = <p className="text-center">There are no profiles</p>
        } else {
            profilesView = <ProfileList profiles={this.state.profiles} />
        }
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="col-md-6 offset-md-3">
                        <div className="row">
                            <h2 className="mt-5 mb-5 fw-bold text-center">Users</h2>
                            {profilesView}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profiles;