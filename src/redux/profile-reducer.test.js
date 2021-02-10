import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";

const initialState =  {
  postsData: [
    {id: 1, postText: 'hello, its my first post', likesCount: 1 },
    {id: 2, postText: 'hello, how are you!', likesCount: 5 },
    {id: 3, postText: 'hello, how are you!', likesCount: 5 },
    {id: 4, postText: 'hello, how are you!', likesCount: 5 },
  ]
}
it('new post should be added', () => {
  const action = addPostActionCreator("Elem3nT")
  let newState = profileReducer(initialState, action)
  expect(newState.postsData.length).toBe(5);

})

it('new added post message is correct', () => {
  const action = addPostActionCreator("Elem3nT")
  let newState = profileReducer(initialState, action)
  expect(newState.postsData[4].postText).toBe("Elem3nT");

})

it('postData should decrement', () => {
  const action = deletePost(1)
  let newState = profileReducer(initialState, action)
  expect(newState.postsData.length).toBe(3);

})


it('postData should not be decrement if id is incorrect', () => {
  const action = deletePost(100)
  let newState = profileReducer(initialState, action)
  expect(newState.postsData.length).toBe(4);

})

