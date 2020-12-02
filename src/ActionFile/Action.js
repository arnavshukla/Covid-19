import axios from '../Axios/axios';

export const fetch_spinner = () => {
    return {
        type: 'FETCH_LOADING_SPINNER',
    };
};

export const fetch_spinner_disable = () => {
    return {
        type: 'FETCH_LOADING_SPINNER_DISABLE',
    };
};

export const update_world_data = (response) => {
    return {
        type: 'UPDATE_WORLDWIDE_DATA',
        RESPONSE:response
    }
}

export const update_country_data = (response,countrySlug,covidData,days) => {
    return {
        type: 'UPDATE_COUNTRY_DATA',
        RESPONSE: response,
        COUNTRYSLUG: countrySlug,
        COVIDDATA: covidData,
        DAYS: days,
    }
}

export const World_Wide_Data = () => {
    return dispatch => {
        dispatch(fetch_spinner());
        axios.get('/summary')
            .then(response => {
                dispatch(fetch_spinner_disable());
                if (response.status === 200) {
                    dispatch(update_world_data(response.data));
                }
            })
            .catch(error => {
                dispatch(fetch_spinner());
            })
    }
}

export const Country_Data = (countrySlug,from,to,covidData,days) => {
    return dispatch => {
        axios.get(`/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`)
            .then(response => {
                dispatch(update_country_data(response.data,countrySlug,covidData,days));
            })
            .catch(error => {
                dispatch(fetch_spinner());
            })
    }
}