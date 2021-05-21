import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        console.log(user);
    }

    render() {
        return (
            <div className="mt-5">
                <h2 className="text-center fw-bold mb-5">Login</h2>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <form onSubmit={this.onSubmit}>
                                <div className="mb-3">
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        name="email" 
                                        placeholder="Email Address"
                                        onChange={this.onChange} />
                                </div>
                                <div className="mb-3">
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        name="password" 
                                        placeholder="Password"
                                        onChange={this.onChange} />
                                </div>
                                <div className="mb-3">
                                    <input type="submit" className="form-control btn btn-warning btn-lg"  value="Submit" />
                                </div>
                            </form>
                            <p className="text-center">Don't have an account? <Link to="/signup">Signup</Link></p>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Login;