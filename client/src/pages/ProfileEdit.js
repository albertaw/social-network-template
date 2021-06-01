import React, { Component } from 'react';
import Navbar from '../layouts/Navbar';
import checkTokenExpired from '../utils/checkTokenExpired';
import TextFieldGroup from '../components/TextFieldGroup';
import axios from 'axios';

class ProfileEdit extends Component {
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

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const token = localStorage.jwtToken;
        if(!token) {
            this.props.history.push('/');
        } else {
            checkTokenExpired(token);
            axios.get('/api/profile')
                .then(res => {
                    if(res.data.username) {
                        this.setState({username: res.data.username});
                    }
                    if(res.data.bio) {
                        this.setState({bio: res.data.bio});
                    }
                    if(res.data.location) {
                        this.setState({location: res.data.location});
                    }
                    if(res.data.skills) {
                        const skills = res.data.skills.join(',');
                        this.setState({skills: skills});
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
    }

    onSubmit(e) {
        e.preventDefault();
        let skills;
        if(this.state.skills.trim()) {
            skills = this.state.skills.split(',').map(x => x.trim());
        } else {
            skills = this.state.skills.trim();
        }
       
        const profileData = {
            username: this.state.username,
            bio: this.state.bio,
            location: this.state.location,
            skills: skills,
            website: this.state.website,
            githubUsername: this.state.githubUsername
        }
        
        axios.post('/api/profiles', profileData)
            .then(res => {
                this.setState({errors: {}});
                alert("Profile updated");
            })
            .catch(err => {
                this.setState({errors: err.response.data});
            });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                        <h2 className="mt-5 mb-5 fw-bold text-center">Edit profile</h2>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={this.state.username}
                                    onChange={this.onChange}
                                    error={this.state.errors.username} />
                                <TextFieldGroup
                                    type="text"
                                    name="bio"
                                    placeholder="Bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={this.state.errors.bio} />
                                <TextFieldGroup
                                    type="text"
                                    name="location"
                                    placeholder="Location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={this.state.errors.location} />
                                <TextFieldGroup
                                    type="text"
                                    name="skills"
                                    placeholder="Skills"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={this.state.errors.skills}
                                    info="Write as a comma separated list (i.e. HTML, CSS, JavaScript)" />
                                <TextFieldGroup
                                    type="text"
                                    name="website"
                                    placeholder="Website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={this.state.errors.website} />
                                <TextFieldGroup
                                    type="text"
                                    name="githubUsername"
                                    placeholder="Github Username"
                                    value={this.state.githubUsername}
                                    onChange={this.onChange}
                                    error={this.state.errors.githubUsername} />
                                <div className="mb-3">
                                    <input type="submit" className="form-control btn btn-warning btn-lg"  value="Save" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileEdit;