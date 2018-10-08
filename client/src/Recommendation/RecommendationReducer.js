export default function (state = {
	recommendation: [],
}, action) {
	switch (action.type) {
	case 'SET_BOOKLIST_DATA':
		return {
			recommendation: action.recommendation,
		};
	default:
		return state;
	}
}
