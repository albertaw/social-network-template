import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import axios from 'axios';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
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
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        axios.post('api/users', userData)
            .then(res => this.props.history.push('/login'))
            .catch(err => {
                this.setState({errors: err.response.data});
            });
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="mt-5">
                <h2 className="text-center fw-bold mb-5">Signup</h2>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="mb-3">
                                    <input 
                                        type="text" 
                                        className={classnames('form-control', {
                                            'is-invalid': errors.name
                                        })} 
                                        name="name" 
                                        placeholder="Name" 
                                        value={this.state.name}
                                        onChange={this.onChange} />
                                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                                </div>
                                <div className="mb-3">
                                    <input 
                                        type="email" 
                                        className={classnames('form-control', {
                                            'is-invalid': errors.email
                                        })}  
                                        name="email" 
                                        placeholder="Email Address" 
                                        value={this.state.email}
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
                                        value={this.state.password}
                                        onChange={this.onChange} />
                                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                </div>
                                <div className="mb-3">
                                    <input 
                                        type="password" 
                                        className={classnames('form-control', {
                                            'is-invalid': errors.password2
                                        })} 
                                        name="password2" 
                                        placeholder="Confirm Password" 
                                        value={this.state.password2}
                                        onChange={this.onChange} />
                                    {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                                </div>
                                <div className="mb-3">
                                    <input 
                                        type="submit" 
                                        className="form-control btn btn-warning btn-lg"  
                                        value="Submit" />
                                </div>
                            </form>
                            <p className="text-center">Already have an account? <Link to="/login">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}


export default Signup;