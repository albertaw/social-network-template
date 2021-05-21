import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        console.log(newUser);
    }

    render() {
        return (
            <div className="mt-5">
                <h2 className="text-center fw-bold mb-5">Signup</h2>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <form onSubmit={this.onSubmit}>
                                <div className="mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="name" 
                                        placeholder="Name" 
                                        value={this.state.name}
                                        onChange={this.onChange} />
                                </div>
                                <div className="mb-3">
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        name="email" 
                                        placeholder="Email Address" 
                                        value={this.state.email}
                                        onChange={this.onChange} />
                                </div>
                                <div className="mb-3">
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        name="password" 
                                        placeholder="Password" 
                                        value={this.state.password}
                                        onChange={this.onChange} />
                                </div>
                                <div className="mb-3">
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        name="password2" 
                                        placeholder="Confirm Password" 
                                        value={this.state.password2}
                                        onChange={this.onChange} />
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