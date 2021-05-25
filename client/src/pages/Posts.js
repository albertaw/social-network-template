import React, { Component } from 'react';
import Navbar from '../layouts/Navbar';
import axios from 'axios';
import PostList from '../components/PostList';

class Posts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],

        }
    }

    componentDidMount() {
        axios.get('/api/posts')
            .then(res => {
                this.setState({posts: res.data})
            })
            .catch(err => {
                this.setState({errors: err.response.data});
            });
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container mt-5">
                    <div className="col-md-6 offset-md-3">
                        <PostList posts={this.state.posts} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Posts;