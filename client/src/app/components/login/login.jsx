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
        this.setState({
            user: {
                username,
                password,
            }
        })
    }    

    handleSignIn(e) {
        e.preventDefault()
        console.log('fuck everything.');
        let username = this.refs.username.value
        let password = this.refs.password.value
        //this.props.onSignIn(username, password)
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