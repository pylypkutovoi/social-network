import { TResponse, ResultCodes } from './../services/samurai.service';
import {follow, unfollow, actions} from './users-reducer';
import { usersAPI } from './../services/users-api';

jest.mock('./../services/users-api');
const mockUserAPI = usersAPI as jest.Mocked<typeof usersAPI>;
const mockDispatch = jest.fn();
const mockState = jest.fn()
beforeEach(() => {
  mockDispatch.mockClear();
  mockState.mockClear()
})

it('follow thunk', async () => {
  const thunk = follow(1);
  mockUserAPI.followUser.mockReturnValue(Promise.resolve(result));
  await thunk(mockDispatch, mockState, {})
  expect(mockDispatch).toBeCalledTimes(3);
  expect(mockDispatch).toHaveBeenNthCalledWith(1, actions.userFollowingProgress(true, 1));
  expect(mockDispatch).toHaveBeenNthCalledWith(2, actions.followSucces(1));
  expect(mockDispatch).toHaveBeenNthCalledWith(3, actions.userFollowingProgress(false, 1));
  
})

it('unfollow thunk', async () => {
  const thunk = unfollow(1);
  mockUserAPI.unfollowUser.mockReturnValue(Promise.resolve(result));
  await thunk(mockDispatch, mockState, {})
  expect(mockDispatch).toBeCalledTimes(3);
  expect(mockDispatch).toHaveBeenNthCalledWith(1, actions.userFollowingProgress(true, 1));
  expect(mockDispatch).toHaveBeenNthCalledWith(2, actions.unfollowSucces(1));
  expect(mockDispatch).toHaveBeenNthCalledWith(3, actions.userFollowingProgress(false, 1));
  
})

const result: TResponse = {
  resultCode: ResultCodes.Success,
  messages: [],
  data: {}
}
