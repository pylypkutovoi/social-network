import {actions} from '../../../redux/profile-reducer';
import MyPosts from './my-posts';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.postsData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (newPostText) => dispatch(actions.addPost(newPostText)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);
