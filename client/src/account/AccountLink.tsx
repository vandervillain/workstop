import * as React from 'react';

interface P {
  user?: any;
}

interface S {}

class AccountLink extends React.Component<P, S> {

  public render() {
    return this.props.user ? (
      <div className="account-link">
        <a href="/api/auth/logout">{this.props.user}</a>
      </div>
    ) : (
      <div className="login">
        <a href="/login">Log in</a>
      </div>
    )
  }
}

export default AccountLink;