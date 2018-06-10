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

        console.log('edrftgyhu');
    
        fetch('/api/v1/authenticate', requestOptions)
            .then(response => {
                if (!response.ok) { 
                    return Promise.reject(response.statusText);
                }
    
                return response.json();
            })
            .then(user => {
                console.log(user);
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
            <form onSubmit={this.handleSignIn.bind(this)}>
                <h3>Sign in</h3>
                <input type="text" ref="username" placeholder="enter you username" />
                <input type="password" ref="password" placeholder="enter password" />
                <input type="submit" value="Login" />
            </form>
        )
    }

}