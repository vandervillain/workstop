
import * as React from 'react';
import { withRouter } from "react-router-dom";
import auth from '../utils/auth';
import { post } from '../utils/request';

interface P {
    match; 
    location;
    history;
}

interface S {
    email: string;
    password: string;
}

class Login extends React.Component<P, S> {

    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleChange = (target) => {
        this.setState({ ...this.state, [target.name]: target.value });
    }

    handleSubmit = (e) => {  
        e.preventDefault();
        const requestURL = '/api/auth/local';
      
        post(requestURL, this.state).then(r => {
            auth.setToken(r.jwt, true);
            auth.setUserInfo(r.user, true);
            this.redirectUser();
          }).catch((err) => {
            console.log(err);
          });
      }
      
      redirectUser = () => {  
        this.props.history.push('/');
      }

    public render() {
        return (
            <div className="login-page row">
                <a href="/api/auth/facebook">Log in with Facebook</a>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="email" onChange={e => this.handleChange(e.target)} value={this.state.email} />
                    <input type="password" name="password" onChange={e => this.handleChange(e.target)} value={this.state.password} />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default withRouter(Login);
