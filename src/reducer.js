export const initialState = {
	basket: [],
};

const reducer = (state, action) => {
	console.log('ACTION: ', action);
	switch (action.type) {
		case 'ADD_TO_BASKET':
			return {
				...state,
				basket: [...state.basket, action.item],
			};
		//don't forget about the default: return state
		default:
			return state;
	}
};
export default reducer;
