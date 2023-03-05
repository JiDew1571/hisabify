import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	SETUP_USER_BEGIN,
	SETUP_USER_SUCCESS,
	SETUP_USER_ERROR,
	TOGGLE_SIDEBAR,
	LOGOUT_USER,
	UPDATE_USER_BEGIN,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_ERROR,
	HANDLE_CHANGE,
	CLEAR_VALUES,
	CREATE_HISAB_BEGIN,
	CREATE_HISAB_SUCCESS,
	CREATE_HISAB_ERROR,
	GET_HISABS_BEGIN,
	GET_HISABS_SUCCESS,
	SET_EDIT_HISAB,
	DELETE_HISAB_BEGIN,
	DELETE_HISAB_ERROR,
	EDIT_HISAB_BEGIN,
	EDIT_HISAB_SUCCESS,
	EDIT_HISAB_ERROR,
	SHOW_STATS_BEGIN,
	SHOW_STATS_SUCCESS,
	CLEAR_FILTERS,
	CHANGE_PAGE,
	GET_CURRENT_USER_BEGIN,
	GET_CURRENT_USER_SUCCESS,
} from './actions';

import { initialState } from './appContext';

const reducer = (state, action) => {
	if (action.type === DISPLAY_ALERT) {
		return {
			...state,
			showAlert: true,
			alertType: 'danger',
			alertText: 'Please provide all values',
		};
	}
	if (action.type === CLEAR_ALERT) {
		return {
			...state,
			showAlert: false,
			alertType: '',
			alertText: '',
		};
	}

	if (action.type === SETUP_USER_BEGIN) {
		return { ...state, isLoading: true };
	}
	if (action.type === SETUP_USER_SUCCESS) {
		return {
			...state,
			isLoading: false,
			user: action.payload.user,
			showAlert: true,
			alertType: 'success',
			alertText: action.payload.alertText,
		};
	}
	if (action.type === SETUP_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg,
		};
	}
	if (action.type === TOGGLE_SIDEBAR) {
		return {
			...state,
			showSidebar: !state.showSidebar,
		};
	}
	if (action.type === LOGOUT_USER) {
		return {
			...initialState,
			userLoading: false,
		};
	}
	if (action.type === UPDATE_USER_BEGIN) {
		return { ...state, isLoading: true };
	}
	if (action.type === UPDATE_USER_SUCCESS) {
		return {
			...state,
			isLoading: false,
			user: action.payload.user,
			showAlert: true,
			alertType: 'success',
			alertText: 'User Profile Updated!',
		};
	}
	if (action.type === UPDATE_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg,
		};
	}
	if (action.type === HANDLE_CHANGE) {
		return {
			...state,
			page: 1,
			[action.payload.name]: action.payload.value,
		};
	}
	if (action.type === CLEAR_VALUES) {
		const initialState = {
			isEditing: false,
			editHisabId: '',
			task: '',
			person: '',
			got: '10',
			sent: '10',
			taskType: 'povai',
			status: 'pending',
		};

		return {
			...state,
			...initialState,
		};
	}
	if (action.type === CREATE_HISAB_BEGIN) {
		return { ...state, isLoading: true };
	}

	if (action.type === CREATE_HISAB_SUCCESS) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: 'New Hisab Created!',
		};
	}
	if (action.type === CREATE_HISAB_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg,
		};
	}
	if (action.type === GET_HISABS_BEGIN) {
		return { ...state, isLoading: true, showAlert: false };
	}
	if (action.type === GET_HISABS_SUCCESS) {
		return {
			...state,
			isLoading: false,
			hisabs: action.payload.hisabs,
			totalHisabs: action.payload.totalHisabs,
			numOfPages: action.payload.numOfPages,
		};
	}
	if (action.type === SET_EDIT_HISAB) {
		const hisab = state.hisabs.find((hisab) => hisab._id === action.payload.id);
		const { _id, task, person, taskType, got, sent, status } = hisab;
		return {
			...state,
			isEditing: true,
			editHisabId: _id,
			task,
			person,
			got,
			sent,
			taskType,
			status,
		};
	}
	if (action.type === DELETE_HISAB_BEGIN) {
		return { ...state, isLoading: true };
	}
	if (action.type === DELETE_HISAB_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg,
		};
	}
	if (action.type === EDIT_HISAB_BEGIN) {
		return {
			...state,
			isLoading: true,
		};
	}
	if (action.type === EDIT_HISAB_SUCCESS) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: 'Hisab Updated!',
		};
	}
	if (action.type === EDIT_HISAB_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg,
		};
	}
	if (action.type === SHOW_STATS_BEGIN) {
		return {
			...state,
			isLoading: true,
			showAlert: false,
		};
	}
	if (action.type === SHOW_STATS_SUCCESS) {
		return {
			...state,
			isLoading: false,
			stats: action.payload.stats,
			monthlyApplications: action.payload.monthlyApplications,
		};
	}
	if (action.type === CLEAR_FILTERS) {
		return {
			...state,
			search: '',
			searchStatus: 'all',
			searchType: 'all',
			sort: 'latest',
		};
	}
	if (action.type === CHANGE_PAGE) {
		return { ...state, page: action.payload.page };
	}
	if (action.type === GET_CURRENT_USER_BEGIN) {
		return { ...state, userLoading: true, showAlert: false };
	}
	if (action.type === GET_CURRENT_USER_SUCCESS) {
		return {
			...state,
			userLoading: false,
			user: action.payload.user,
		};
	}
	throw new Error(`no such action : ${action.type}`);
};

export default reducer;
