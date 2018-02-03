import {appName} from '../config'
import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import {PORTFOLIO} from '../config'


// Constants
export const moduleName = 'portfolio'
const prefix = `${appName}/${moduleName}`
export const LOAD_PORTFOLIO_START = `${prefix}/LOAD_PORTFOLIO_START`
export const LOAD_PORTFOLIO_SUCCESS = `${prefix}/LOAD_PORTFOLIO_SUCCESS`
export const LOAD_PORTFOLIO_ERROR = `${prefix}/LOAD_PORTFOLIO_ERROR`


// Reducer
const ReducerState = Record({
	entities: new Map(),
	error: null,
	loading: true
})

export default function reducer(state = new ReducerState(), action) {
	const {type, payload} = action

	switch(type){
		case LOAD_PORTFOLIO_SUCCESS:
	 		return state
	 						.setIn(['entities'], payload.response)
	 		 				.setIn(['loading'], false)
	 			
		case LOAD_PORTFOLIO_ERROR:
	 		return state
	 						.setIn(['error'], payload.error)
	 						.setIn(['loading'], false)
	}

	return state
}


// Action Creators
export function loadPortfolio(lang){
	return {
		type: LOAD_PORTFOLIO_START,
		payload: {lang}
	}
}


//Sagas
export function * loadPortfolioSaga(action){	
	try {
		const response = yield call(axios.get, `/wp-json/wp/v2/posts?categories=4`)

		yield put({
						type: LOAD_PORTFOLIO_SUCCESS,
						payload: {response}
					})
	} catch (error) {
		
		yield put({
						type: LOAD_PORTFOLIO_ERROR,
						payload: {error}
					})
	}
}

export function * saga() {
	yield takeEvery(LOAD_PORTFOLIO_START, loadPortfolioSaga);
}