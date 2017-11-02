const defaultState = {
  posts: []
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_POSTS':
      return {
        ...state,
        posts: action.posts,
      }
    default:
      return state;
  }
}

export default reducer;
