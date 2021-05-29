import React, { Component } from 'react';
import Navbar from '../layouts/Navbar';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import classnames from 'classnames';
import PostList from '../components/PostList';
import checkTokenExpired from '../utils/checkTokenExpired';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {},
            posts: [],
            text: '',
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
            const decoded = jwt_decode(token)
            this.setState({currentUser: decoded});
            axios.get('/api/users/' + decoded.id + '/posts')
                .then(res => {
                    this.setState({posts: res.data})
                })
                .catch(err => {
                    console.log(err.response.data);
                });
        }
        
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        checkTokenExpired(localStorage.jwtToken);
        const postData = {
            name: this.state.currentUser.name,
            text: this.state.text
        }
        axios.post('/api/posts', postData)
            .then(res => {
                this.setState({text: ''})
                this.setState({errors: {}});
                this.setState({posts: [res.data, ...this.state.posts]});
            })
            .catch(err => {
                this.setState({errors: err.response.data});
            });
        
    }

    render() {
        const errors = this.state.errors;
        let postsView;
        if (this.state.posts.length === 0) {
            postsView = <p className="text-center">You have not created any posts.</p>
        } else {
            postsView = <PostList posts={this.state.posts} />
        }
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="col-md-6 offset-md-3">
                        <div class="row mt-5">
                            <form onSubmit={this.onSubmit}>
                                <div className="mb-3">
                                    <textarea 
                                        name="text" 
                                        className={classnames('form-control', {
                                            'is-invalid': errors.text
                                        })} 
                                        rows="2" 
                                        placeholder="Say something..." 
                                        value={this.state.text}
                                        onChange={this.onChange}>
                                    </textarea>
                                    {errors.text && (<div className="invalid-feedback">{errors.text}</div>)}
                                </div>

                                <div className="mb-3">
                                        <input type="submit" className="form-control btn btn-warning btn-lg"  value="Create Post" />
                                    </div>
                            </form>
                        </div>
                        <div className="row mt-5">
                            <h2 className="text-center">Posts</h2>
                            {postsView}
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;