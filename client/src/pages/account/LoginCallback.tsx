import * as React from 'react';
import auth from '../../utils/auth';
import { withRouter } from 'react-router-dom';

interface P {
    onLogin: (u: any) => void;
    match; 
    location;
    history;
}

interface S {}

class LoginCallback extends React.Component<P,S> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.location) {
            const search = this.props.location.search;
            const params = new URLSearchParams(search);

            const token = params.get('token');
            if (token != null) {
                auth.setToken(token, true);
            }

            const user = params.get('user');
            if (user != null) {
                auth.setUserInfo(user, true)
            }

            this.props.onLogin(user);
        }
        this.props.history.push('/');
    }

    public render() {
        return (
            <div></div>
        )
    }
}

export default withRouter(LoginCallback);