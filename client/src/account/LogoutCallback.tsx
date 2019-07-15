import * as React from 'react';
import auth from '../utils/auth';
import { withRouter } from 'react-router-dom';

interface P {
    onLogout: (u) => void;
    match; 
    location;
    history;
}

interface S {}

class LogoutCallback extends React.Component<P,S> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        auth.clearToken();
        auth.clearUserInfo();
        this.props.onLogout(null);
        this.props.history.push('/');
    }

    public render() {
        return (
            <div></div>
        )
    }
}

export default withRouter(LogoutCallback);