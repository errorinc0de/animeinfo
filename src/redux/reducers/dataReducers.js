import {GET_DATA_STARTED, GET_DATA_SUCCESS, GET_DATA_FAILURE, LOAD_DATA_STARTED, LOAD_DATA_SUCCESS, LOAD_DATA_FAILURE} from '../actions/actionTypes'

const initialState = {
    data: [],
    lastPage: null,
    loading: false,
    error: null
}

export default function common(state = initialState, action) {
    switch (action.type) {
        case GET_DATA_STARTED:
            return {
                ...state,
                loading: true
            }
        case GET_DATA_SUCCESS:
            const queryData = action.payload
            return {
                ...state,
                loading: false,
                data: queryData.data,
                lastPage: queryData.lastPage
            }
        case GET_DATA_FAILURE:
            const { error } = action.payload
            return {
                ...state,
                error: error,
                loading: false
            }
        case LOAD_DATA_STARTED:
            return {
                ...state,
                loading: true
            }
        case LOAD_DATA_SUCCESS:
            const loadedData = action.payload
            return {
                ...state,
                loading: false,
                data: [...state.data, ...loadedData.data]
            }
        case LOAD_DATA_FAILURE:
            const { errorLoad } = action.payload
            return {
                ...state,
                error: errorLoad,
                loading: false
            }
        default: 
            return state
    }
}