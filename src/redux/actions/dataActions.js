import {GET_DATA_STARTED, GET_DATA_SUCCESS, GET_DATA_FAILURE, LOAD_DATA_STARTED, LOAD_DATA_SUCCESS, LOAD_DATA_FAILURE} from './actionTypes'

export const getDataStarted = () => {
    return {
        type: GET_DATA_STARTED
    }
}

export const getDataSuccess = (data) => {
    return {
        type: GET_DATA_SUCCESS,
        payload: data
    }
}

export const getDataFailure = (error) => {
    return {
        type: GET_DATA_FAILURE,
        payload: {
            error
        }
    }
} 

export const loadDataStarted = () => {
    return {
        type: LOAD_DATA_STARTED
    }
}

export const loadDataSuccess = (data) => {
    return {
        type: LOAD_DATA_SUCCESS,
        payload: {
            data
        }
    }
}

export const loadDataFailure = (error) => {
    return {
        type: LOAD_DATA_FAILURE,
        payload: {
            error
        }
    }
} 