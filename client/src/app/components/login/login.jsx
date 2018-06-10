import React from 'react';

export default class LoginForm extends React.Component {

    // Using a class based component here because we're accessing DOM refs
    constructor(props) {
        super(props)
        // the initial application state
        this.state = {
            user: null
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
                if (!response.ok) { 
                    return Promise.reject(response.statusText);
                }
    
                return response.json();
            })
            .then(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('token', user.token);

                    console.log(user);
                }
    
                return user;
            })
            .catch(err=>console.log(err));

        this.setState({
            user: {
                username,
                password,
            }
        })
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
        return (
            <form id="login-form" onSubmit={this.handleSignIn.bind(this)}>
                <h4>Please Sign In</h4>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input type="text" ref="username" placeholder="Email" className="form-control" id="email" />
                <label htmlFor="password" className="sr-only">Password</label>
                <input type="password" ref="password" placeholder="Password" className="form-control" id="password" />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>
        )
    }

}