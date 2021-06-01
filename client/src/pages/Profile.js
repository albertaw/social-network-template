import React, { Component } from 'react';
import Navbar from '../layouts/Navbar';
import axios from 'axios';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            bio: '',
            location: '',
            skills: '',
            website: '',
            githubUsername: '',
            errors: {}
        }

    }

    componentDidMount() {
        const { username } = this.props.match.params
        axios.get('/api/profiles/username/'+ username)
            .then(res => {
                this.setState({name: res.data.user.name});
                this.setState({username: res.data.username});
                const skills = res.data.skills.join(', ');
                this.setState({skills: skills});
                if(res.data.bio) {
                    this.setState({bio: res.data.bio});
                }
                if(res.data.location) {
                    this.setState({location: res.data.location});
                }
                if(res.data.website) {
                    this.setState({website: res.data.website});
                }
                if(res.data.githubUsername) {
                    this.setState({githubUsername: res.data.githubUsername});
                }
            })
            .catch(err => {
                this.setState({errors: err.response.data});
            });
    }

    render() {
        const { errors } = this.state; 
        let emptyView;
        if(errors) {
            emptyView = <p className="center">{errors.noprofile}</p>
        }
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            {emptyView}
                            {this.state.name && (<h2 className="mt-5 text-center">{this.state.name}</h2>)}
                            {this.state.username && (<p className="lead text-center">@{this.state.username}</p>)}
                            {this.state.bio && (<div className="row">
                                <p className="col-md-2 fw-bold">Bio:</p>
                                <p className="col-md-10">{this.state.bio}</p>
                            </div>)}
                            {this.state.skills && (<div className="row">
                                <p className="col-md-2 fw-bold">Skills:</p>
                                <p className="col-md-10">{this.state.skills}</p>
                            </div>)}
                            {this.state.location && (<div className="row">
                                <p className="col-md-2 fw-bold">Location:</p>
                                <p className="col-md-10">{this.state.location}</p>
                            </div>)}
                            {this.state.website && (<div className="row">
                                <p className="col-md-2 fw-bold">Website:</p>
                                <p className="col-md-10">{this.state.website}</p>
                            </div>)}
                            {this.state.githubUsername && (<div className="row">
                                <p className="col-md-2 fw-bold">Github:</p>
                                <p className="col-md-10">{this.state.githubUsername}</p>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;