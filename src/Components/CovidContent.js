import Graph from '../Components/Graph';
import React from 'react';
import '../App.css';
import CovidDetails from '../Components/CovidDetails';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Components/Spinner';
import { World_Wide_Data, Country_Data } from '../ActionFile/Action';

const CovidContent = () => {

    const dispatch = useDispatch();

    const totalConfirmed = useSelector(state => state.totalConfirmed);
    const totalDeaths = useSelector(state => state.totalDeaths);
    const totalRecovered = useSelector(state => state.totalRecovered);
    const loading = useSelector(state => state.loading);
    const covidData = useSelector(state => state.covidData);
    let country = useSelector(state => state.country);
    let days = useSelector(state => state.days);
    const covidCountArr = useSelector(state => state.covidCountArr);
    const xData = useSelector(state => state.xData);

    useEffect(() => {
        dispatch(World_Wide_Data());
    }, []);

    const formatDate = (d) => {
        const newDate = new Date(d);
        const date = newDate.getDate();
        const year = newDate.getFullYear();
        const month = newDate.getMonth() + 1;
        return `${year}-${month < 10 ? `0${month}` : `${month}`}-${date < 10 ? `0${date}` : `${date}`}`;
    }

    const countryHandler = (event) => {
        country = event.target.value;
        const date = new Date();
        const to = formatDate(date);
        const from = formatDate(date.setDate(date.getDate() - days));

        getCovidDataByDate(event.target.value, from, to, days);
    }

    const daysHandler = (event) => {
        days = event.target.value;
        const date = new Date();
        const to = formatDate(date);
        const from = formatDate(date.setDate(date.getDate() - event.target.value));

        getCovidDataByDate(country, from, to, days)
    }

    const getCovidDataByDate = (countrySlug, from, to, days) => {
        if (countrySlug === '') {
            dispatch(World_Wide_Data());
        }
        else {
            dispatch(Country_Data(countrySlug, from, to,covidData,days));
        }
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <div className="App">
            <CovidDetails
                totalConfirmed={totalConfirmed}
                totalRecovered={totalRecovered}
                totalDeaths={totalDeaths}
                country={country}
            /><br /><br />

            <div>
                <select value={country} onChange={countryHandler}>
                    <option value="">World Wide Data</option>
                    {
                        covidData.Countries && covidData.Countries.map(location =>
                            <option key={location.CountryCode} value={location.Slug}>{location.Country}</option>)
                    }
                </select>
                <select value={days} onChange={daysHandler}>
                    <option value='7'>Last 7 days</option>
                    <option value='30'>Last 30 days</option>
                    <option value='60'>Last 60 days</option>
                </select>
            </div>
            <Graph yAxis={covidCountArr} xAxis={xData} />
        </div>
    );
}

export default CovidContent;