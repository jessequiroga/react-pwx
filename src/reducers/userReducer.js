import { USER } from '../actions/actionTypes';


import initialState from './initialState';

export default function userReducer(state = initialState.users, action) {
	switch (action.type) {
		case USER.LOAD.SUCCESS:
			return {
				...state,
				users: action.users
			};
		case USER.GET.SUCCESS:
			return {
				...state,
				user: action.user
			};
		default:
			return state;
	}
};