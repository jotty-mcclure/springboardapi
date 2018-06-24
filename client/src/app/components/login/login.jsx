import React from 'react';
import { UncontrolledAlert } from 'reactstrap';
import labels from '../../_utilities/labels';
import auth from '../../_utilities/auth';
import request from '../../_utilities/request';

export default class LoginForm extends React.Component {

    // Using a class based component here because we're accessing DOM refs
    constructor(props) {
        super(props)
        // the initial application state
        this.state = {
            user: null,
            login: {
                success: null
            }
        }
    }

    // App "actions" (functions that modify state)
    signIn(username, password) {
        // This is where you would call Firebase, an API etc...
        // calling setState will re-render the entire app (efficiently!)
        const email = username;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        };
    
        fetch('/api/v1/authenticate', requestOptions)
            .then(response => {
                if ( !response.ok ) return Promise.reject(response.statusText);
                return response.json();
            })
            .then(user => {
                if ( user.success && user.token ) {
                    auth.setToken(user.token, true);
                    this.setState({
                        user: {username,password}
                    });
                } else {
                    this.setState({
                        login: {success: user.success}
                    });
                }
            })
            .catch(err=>console.log(err));
    }    

    handleSignIn(e) {
        e.preventDefault()
        let username = this.refs.username.value
        let password = this.refs.password.value
        this.signIn(username, password);
    }
    
    signOut() {
        // clear out user from state
        this.setState({ user: null })
    }

    render() {
        const loginSuccess = this.state.login.success;
        let loginFailureAlert = '';
        if ( loginSuccess == false && loginSuccess !== null) {
            loginFailureAlert = <UncontrolledAlert className="mt-3 mb-0" color="danger"> {labels.login.authenticationFailure} </UncontrolledAlert>
        }

        if ( localStorage.getItem('access-token') ) {
            return (
                <a onClick={() => {
                        auth.clearAppStorage();
                        this.signOut();
                    }} href="javascript:void(0)">Logout</a>
            );
        } else {
            return (
                <form id="login-form" onSubmit={this.handleSignIn.bind(this)}>
                    <h4>Please Sign In</h4>
                    <label htmlFor="email" className="sr-only">{labels.login.fieldNames.email}</label>
                    <input type="text" ref="username" placeholder={labels.login.fieldNames.email} className="form-control" id="email" />
                    <label htmlFor="password" className="sr-only">{labels.login.fieldNames.password}</label>
                    <input type="password" ref="password" placeholder={labels.login.fieldNames.password} className="form-control" id="password" />
                    <button className="btn btn-lg btn-primary btn-block" type="submit">{labels.login.fieldNames.submitButton}</button>

                    {/* <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button> */}
                    {loginFailureAlert}
                </form>
            )
        }
    }

}