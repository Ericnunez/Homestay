export const initialState = {
  user: null,
};

// Selector

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: state.user,
      };
    default:
      return state;
  }
};

export default reducer;
