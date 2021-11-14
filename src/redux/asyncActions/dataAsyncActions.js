import { getDataStarted, getDataSuccess, getDataFailure, loadDataStarted, loadDataSuccess, loadDataFailure } from "../actions/dataActions";

export const getData = (query, page = 1) => async dispatch => {
    dispatch (getDataStarted());
    try {
        const res = await fetch (`https://api.jikan.moe/v3/search/anime?q=${encodeURI(query)}&limit=16&page=${page}`)
        const data = await res.json();
        dispatch (getDataSuccess({data: data.results, lastPage: data.last_page}));
    } catch (err) {
        dispatch (getDataFailure(err.message))
    }
}

export const loadMoreData = (query, page = 2) => async dispatch => {
    dispatch (loadDataStarted());
    try {
        const res = await fetch (`https://api.jikan.moe/v3/search/anime?q=${encodeURI(query)}&limit=16&page=${page}`)
        const data = await res.json();
        dispatch (loadDataSuccess(data.results));
    } catch (err) {
        dispatch (loadDataFailure(err.message))
    }
}