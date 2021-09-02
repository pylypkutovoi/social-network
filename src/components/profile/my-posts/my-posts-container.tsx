import {actions} from '../../../redux/profile-reducer';
import MyPosts, { MapDispatchToPropsType, MapStateToPropsType } from './my-posts';
import {connect} from 'react-redux';
import { AppState } from '../../../redux/redux-store';

const mapStateToProps = (state: AppState) => {
  return {
    posts: state.profilePage.postsData
  }
}

const mapDispatchToProps = {
    addPost: actions.addPost
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppState>(mapStateToProps, mapDispatchToProps)(MyPosts);
