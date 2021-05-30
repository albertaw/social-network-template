import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import axios from 'axios';
import setAuthToken from '../utils//setAuthToken';

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

    componentDidMount() {
        if(localStorage.jwtToken) {
            this.props.history.push('/dashboard');
        }
    }
    
    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
        }
        
        axios.post('/api/users/login', userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token)
            setAuthToken(token); 
            this.props.history.push('/dashboard');
        })
        .catch(err => {
            this.setState({errors: err.response.data});
        });
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="mt-5">
                <h2 className="text-center fw-bold mb-5">Login</h2>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <form onSubmit={this.onSubmit}>
                                <div className="mb-3">
                                    <input 
                                        type="email" 
                                        className={classnames('form-control', {
                                            'is-invalid': errors.email
                                        })}  
                                        name="email" 
                                        placeholder="Email Address"
                                        onChange={this.onChange} />
                                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                                </div>
                                <div className="mb-3">
                                    <input 
                                        type="password" 
                                        className={classnames('form-control', {
                                            'is-invalid': errors.password
                                        })} 
                                        name="password" 
                                        placeholder="Password"
                                        onChange={this.onChange} />
                                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
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