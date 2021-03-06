import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import News from './components/news/news';
import Music from './components/music/music';
import Settings from './components/settings/settings';
import Login from './components/Login/login';
import UsersContainer from './components/users/users-container';
import HeaderContainer from './components/header/header-container';
//import FriendsList from "./components/sidebar/friends-list/friends-list";
import {connect, Provider} from "react-redux";
import {withRouter} from 'react-router-dom';
import {withSuspense} from "./components/hoc/with-suspense";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Spinner from "./components/common/spinner/spinner";
import store from "./redux/redux-store";

const DialogsContainer = React.lazy(() => import('./components/dialogs/dialogs-container'));
const ProfileContainer = React.lazy(() => import('./components/profile/profile-container'));

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Spinner/>
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer/>
        <div className="sidebar-wrapper">
          <Navbar/>
          {/*<FriendsList />*/}
        </div>

        <div className="content-wrapper">
          <Route
            path="/profile/:userId?"
            render={withSuspense(ProfileContainer)}
          />
          <Route
            path="/dialogs"
            render={withSuspense(DialogsContainer)}
          />
          <Route
            path="/users"
            render={() => <UsersContainer/>}
          />

          <Route path="/news" component={News}/>
          <Route path="/music" component={Music}/>
          <Route path="/settings" component={Settings}/>
          <Route path="/login" component={Login}/>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
});

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {initializeApp})
)(App);

const MainApp = (props) => {
  return <Router>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </Router>
}

export default MainApp;

