const initState = {
  allPosts: null,
  currentSinglePost: null,
  currentComments: null
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "ALL_POSTS":
      return {
        ...state,
        allPosts: action.data
      };
    case "CREATE_POST":
      return {
        ...state,
        allPosts: action.data
      };
    case "SINGLE_POST":
      return {
        ...state,
        currentSinglePost: action.data
      };
    case "ALL_CURRENT_COMMENTS":
      return { ...state, currentComments: action.data };
    default:
      return state;
  }
};

export default reducer;
