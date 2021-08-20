const initialState = {
  friendsData: [
    {id: 1, name: 'Name1'},
    {id: 2, name: 'Name2'},
    {id: 3, name: 'Name3'},
    {id: 4, name: 'Name4'},
  ]
}

type InitialState = typeof initialState;
const sidebarReducer = (state = initialState, action: any): InitialState => {
  switch(action.type) {
    case "ADD_FRIEND":
      return {
        ...state,
        friendsData: [...state.friendsData, {id: 5, name: 'name5'}]
      }
    default:
      return state;
  }
}

export default sidebarReducer;