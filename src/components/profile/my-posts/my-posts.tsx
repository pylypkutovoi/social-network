import React from 'react';
import Post from './post/post';
import AddPostForm, { AddPostFormValues } from './add-post-form';
import { PostType } from '../../../types/types';

export type MapStateToPropsType = {
  posts: PostType[];
  
}
export type MapDispatchToPropsType = {
  addPost: (newPostText: string) => void;
}
class MyPosts extends React.PureComponent<MapStateToPropsType & MapDispatchToPropsType> {

  render() {
    const posts = this.props.posts.map(post => (
      <Post key={post.id} message={post.postText} count={post.likesCount}/>
    ))
    const addNewPost = (body: AddPostFormValues) => {
      this.props.addPost(body.newPostText);
    }

    return (
      <div>
        <AddPostForm onSubmit={addNewPost}/>
        <div>
          {posts}
        </div>
      </div>
    );
  }
}





export default MyPosts;