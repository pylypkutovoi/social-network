import usersReducer, { actions, InitialState } from "./users-reducer"
let state: InitialState;
beforeEach(() => {
  state =  {
    users: [
      {
        id: 0, name: 'Name 0', followed: false,
        photos: {small: null, large: null}, status: 'status 0'
      },
      {
        id: 1, name: 'Name 1', followed: false,
        photos: {small: null, large: null}, status: 'status 1'
      },
      {
        id: 2, name: 'Name 2', followed: true,
        photos: {small: null, large: null}, status: 'status 2'
      },
      {
        id: 3, name: 'Name 3', followed: true,
        photos: {small: null, large: null}, status: 'status 3'
      }
    ],
    pageSize: 10,
    totalUsersCount: 100,
    currentPage: 1,
    isLoading: false,
    isFollowing: []
  }
})

it('follow succes', () => {
  const newState = usersReducer(state, actions.followSucces(1)) 
  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();

})

it('unfollow succes', () => {
  const newState = usersReducer(state, actions.unfollowSucces(2)) 
  expect(newState.users[2].followed).toBeFalsy();
  expect(newState.users[3].followed).toBeTruthy();

})