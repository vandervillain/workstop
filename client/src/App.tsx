import * as React from 'react';
import { BrowserRouter, Link, Route } from "react-router-dom";
import SearchPage from "./pages/search/SearchPage";
import PrivateRoute from './PrivateRoute';
import AccountLink from './pages/account/AccountLink';
import Profile from './pages/account/Profile';
import Login from './pages/account/Login';
import LoginCallback from './pages/account/LoginCallback';
import LogoutCallback from './pages/account/LogoutCallback';
import auth from './utils/auth';
import PostPage from './pages/post/PostPage';

// import logo from './logo.svg';
interface P { }
interface S { user }

class App extends React.Component<P, S> {

  constructor(props) {
    super(props);
    this.state = {
      user: auth.getUserInfo()
    }
  }

  accountChange(user) {
    this.setState({
      user: user
    });
  }

  public render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="clear">
            <div className="container-fluid lg">
              { /* <img src={logo} className="App-logo" alt="logo" /> */ }
              <div className="logo">
              <Link to="/"><h1>workstop</h1></Link>
              </div>
              <AccountLink user={this.state.user} />
            </div>
          </header>
            <div className="container-fluid lg">
              <div className="content">
                <Route exact={true} path="/" component={SearchPage}/>
                <Route exact={true} path="/post" component={PostPage}/>
                <Route exact={true} path="/post/:id" component={PostPage}/>
                <Route exact={true} path="/login" component={Login}/>
                <Route exact={true} path="/login/callback" component={() => <LoginCallback onLogin={(u) => this.accountChange(u)} />} />
                <Route exact={true} path="/logout" component={() => <LogoutCallback onLogout={(u) => this.accountChange(u)} />} />
                <PrivateRoute path="/profile" component={Profile} />
              </div>
            </div>
            <script src="main.js"></script>
        </div>
        </BrowserRouter>
    );
  }
}

export default App;
