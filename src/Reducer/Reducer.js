let initialState = {
    totalConfirmed: 0,
    totalDeaths: 0,
    totalRecovered: 0,
    loading: false,
    covidData: {},
    country: '',
    days: 7,
    covidCountArr: [],
    xData: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case 'FETCH_LOADING_SPINNER':
            return {
                ...state,
                loading: true,
            }

        
        case 'FETCH_LOADING_SPINNER_DISABLE':
            return {
                ...state,
                loading: false
            }

        case 'UPDATE_WORLDWIDE_DATA':
            return {
                ...state,
                totalConfirmed: action.RESPONSE.Global.TotalConfirmed,
                totalRecovered: action.RESPONSE.Global.TotalRecovered,
                totalDeaths: action.RESPONSE.Global.TotalDeaths,
                covidData: action.RESPONSE,
                covidCountArr: null,
                xData: null,
                country: '',
            }

        case 'UPDATE_COUNTRY_DATA':
            return {
                ...state,
                totalConfirmed: action.COVIDDATA.Countries.find(CurrCountry => CurrCountry.Slug === action.COUNTRYSLUG).TotalConfirmed,
                totalDeaths: action.COVIDDATA.Countries.find(CurrCountry => CurrCountry.Slug === action.COUNTRYSLUG).TotalRecovered,
                totalRecovered: action.COVIDDATA.Countries.find(CurrCountry => CurrCountry.Slug === action.COUNTRYSLUG).TotalDeaths,
                covidCountArr: action.RESPONSE.map(data => data.Cases),
                xData: action.RESPONSE.map(data => data.Date),
                country: action.COUNTRYSLUG,
                days: action.DAYS,
            }
        default: return state
    }
}

export default reducer;