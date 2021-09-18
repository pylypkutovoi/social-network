import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import News from './components/news/news';
import Music from './components/music/music';
import Settings from './components/settings/settings';
import {Login} from './components/Login/login';
import {UsersPage} from './components/users/users-page';
import {AppHeader} from './components/header/header';
import {connect, Provider} from "react-redux"; 
import {withRouter} from 'react-router-dom';
import {withSuspense} from "./components/hoc/with-suspense";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Spinner from "./components/common/spinner/spinner";
import store, { AppState } from "./redux/redux-store";
import 'antd/dist/antd.css';
import {Layout} from 'antd';
const {Content, Sider} = Layout;

const ProfileContainer = React.lazy(() => import('./components/profile/profile-container'));
const DialogsContainer = React.lazy(() => import('./components/dialogs/dialogs-container'));
const ChatPage = React.lazy(() => import('./components/chat/chat'));
const Profile = withSuspense(ProfileContainer);
const Dialogs = withSuspense(DialogsContainer);
const Chat = withSuspense(ChatPage);

type PropsType = {
  initializeApp: () => void;
  initialized: boolean;
}
class App extends React.Component<PropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Spinner/>
    }
    return (
      <Layout>
        <AppHeader/>
        <Layout style={{ padding: '0 50px' }}>
          <Sider width={200} className="site-layout-background" >
            <Navbar/>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Route path="/profile/:userId?" render={() => <Profile/>} />
              <Route path="/dialogs" render={() => <Dialogs/>} />
              <Route path="/users" render={() => <UsersPage/>} />
              <Route path="/news" component={News}/>
              <Route path="/music" component={Music}/>
              <Route path="/settings" component={Settings}/>
              <Route path="/login" component={Login}/>
              <Route path="/chat" render={() => <Chat/>} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  initialized: state.app.initialized
});

let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, {initializeApp})
)(App);

const MainApp: React.FC = () => {
  return <Router>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </Router>
}

export default MainApp;

