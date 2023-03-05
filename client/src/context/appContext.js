import React, { useReducer, useContext, useEffect } from 'react';

import reducer from './reducer';
import axios from 'axios';
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

const initialState = {
	userLoading: true,
	isLoading: false,
	showAlert: false,
	alertText: '',
	alertType: '',
	user: null,
	showSidebar: false,
	isEditing: false,
	editHisabId: '',
	task: '',
	person: '',
	sent: '10',
	got: '10',
	taskTypeOptions: ['bandhiya', 'casting', 'povai'],
	taskType: 'casting',
	statusOptions: ['halfWay', 'done', 'pending'],
	status: 'pending',
	hisabs: [],
	totalHisabs: 0,
	numOfPages: 1,
	page: 1,
	stats: {},
	monthlyApplications: [],
	search: '',
	searchStatus: 'all',
	searchType: 'all',
	sort: 'latest',
	sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	// axios
	const authFetch = axios.create({
		baseURL: '/api/v1',
	});
	// request

	// response

	authFetch.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			// console.log(error.response)
			if (error.response.status === 401) {
				logoutUser();
			}
			return Promise.reject(error);
		}
	);

	const displayAlert = () => {
		dispatch({ type: DISPLAY_ALERT });
		clearAlert();
	};

	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: CLEAR_ALERT });
		}, 3000);
	};

	const setupUser = async ({ currentUser, endPoint, alertText }) => {
		dispatch({ type: SETUP_USER_BEGIN });
		try {
			const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser);

			const { user, location } = data;
			dispatch({
				type: SETUP_USER_SUCCESS,
				payload: { user, location, alertText },
			});
		} catch (error) {
			dispatch({
				type: SETUP_USER_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};
	const toggleSidebar = () => {
		dispatch({ type: TOGGLE_SIDEBAR });
	};

	const logoutUser = async () => {
		await authFetch.get('/auth/logout');
		dispatch({ type: LOGOUT_USER });
	};
	const updateUser = async (currentUser) => {
		dispatch({ type: UPDATE_USER_BEGIN });
		try {
			const { data } = await authFetch.patch('/auth/updateUser', currentUser);
			const { user, location } = data;

			dispatch({
				type: UPDATE_USER_SUCCESS,
				payload: { user, location },
			});
		} catch (error) {
			if (error.response.status !== 401) {
				dispatch({
					type: UPDATE_USER_ERROR,
					payload: { msg: error.response.data.msg },
				});
			}
		}
		clearAlert();
	};

	const handleChange = ({ name, value }) => {
		dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
	};
	const clearValues = () => {
		dispatch({ type: CLEAR_VALUES });
	};
	const createHisab = async () => {
		dispatch({ type: CREATE_HISAB_BEGIN });
		try {
			const { task, sent, got, person, taskType, status } = state;
			await authFetch.post('/hisabs', {
				task,
				sent,
				got,
				person,
				taskType,
				status,
			});
			dispatch({ type: CREATE_HISAB_SUCCESS });
			dispatch({ type: CLEAR_VALUES });
		} catch (error) {
			if (error.response.status === 401) return;
			dispatch({
				type: CREATE_HISAB_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};

	const getHisabs = async () => {
		const { page, search, searchStatus, searchType, sort } = state;

		let url = `/hisabs?page=${page}&status=${searchStatus}&taskType=${searchType}&sort=${sort}`;
		if (search) {
			url = url + `&search=${search}`;
		}
		dispatch({ type: GET_HISABS_BEGIN });
		try {
			const { data } = await authFetch(url);
			const { hisabs, totalHisabs, numOfPages } = data;
			dispatch({
				type: GET_HISABS_SUCCESS,
				payload: {
					hisabs,
					totalHisabs,
					numOfPages,
				},
			});
		} catch (error) {
			logoutUser();
		}
		clearAlert();
	};

	const setEditHisab = (id) => {
		dispatch({ type: SET_EDIT_HISAB, payload: { id } });
	};
	const editHisab = async () => {
		dispatch({ type: EDIT_HISAB_BEGIN });

		try {
			const { task, person, sent, got, taskType, status } = state;
			await authFetch.patch(`/hisabs/${state.editHisabId}`, {
				person,
				task,
				got,
				sent,
				taskType,
				status,
			});
			dispatch({ type: EDIT_HISAB_SUCCESS });
			dispatch({ type: CLEAR_VALUES });
		} catch (error) {
			if (error.response.status === 401) return;
			dispatch({
				type: EDIT_HISAB_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};
	const deleteHisab = async (hisabId) => {
		dispatch({ type: DELETE_HISAB_BEGIN });
		try {
			await authFetch.delete(`/hisabs/${hisabId}`);
			getHisabs();
		} catch (error) {
			if (error.response.status === 401) return;
			dispatch({
				type: DELETE_HISAB_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};
	const showStats = async () => {
		dispatch({ type: SHOW_STATS_BEGIN });
		try {
			const { data } = await authFetch('/hisabs/stats');
			dispatch({
				type: SHOW_STATS_SUCCESS,
				payload: {
					stats: data.defaultStats,
					monthlyApplications: data.monthlyApplications,
				},
			});
		} catch (error) {
			logoutUser();
		}
		clearAlert();
	};
	const clearFilters = () => {
		dispatch({ type: CLEAR_FILTERS });
	};
	const changePage = (page) => {
		dispatch({ type: CHANGE_PAGE, payload: { page } });
	};

	const getCurrentUser = async () => {
		dispatch({ type: GET_CURRENT_USER_BEGIN });
		try {
			const { data } = await authFetch('/auth/getCurrentUser');
			const { user } = data;

			dispatch({
				type: GET_CURRENT_USER_SUCCESS,
				payload: { user },
			});
		} catch (error) {
			if (error.response.status === 401) return;
			logoutUser();
		}
	};
	useEffect(() => {
		getCurrentUser();
	}, []);

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				setupUser,
				toggleSidebar,
				logoutUser,
				updateUser,
				handleChange,
				clearValues,
				createHisab,
				getHisabs,
				setEditHisab,
				deleteHisab,
				editHisab,
				showStats,
				clearFilters,
				changePage,
			}}>
			{children}
		</AppContext.Provider>
	);
};

const useAppContext = () => {
	return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
