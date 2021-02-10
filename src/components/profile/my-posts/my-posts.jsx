import React from 'react';
import Post from './post/post';
import {Field, reduxForm} from 'redux-form';
import {maxLength, required} from '../../../utils/validators';
import {Textarea} from '../../common/forms-controls/forms-controls';

const max10 = maxLength(10);

class MyPosts extends React.PureComponent {

  render() {
    const posts = this.props.posts.map(post => (
      <Post key={post.id} message={post.postText} count={post.likesCount}/>
    ))
    const addNewPost = (body) => {
      this.props.addPost(body.newPostText);
    }

    return (
      <div>
        <MyPostsReduxForm onSubmit={addNewPost}/>
        <div>
          {posts}
        </div>
      </div>
    );
  }
}


const MyPostsForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          name="newPostText"
          cols="50" rows="3"
          validate={[required, max10]}
          placeholder={"post message"}
        />
      </div>
      <button>Add post</button>

    </form>
  )
}

const MyPostsReduxForm = reduxForm({
  form: "myPostsForm"
})(MyPostsForm);


export default MyPosts;