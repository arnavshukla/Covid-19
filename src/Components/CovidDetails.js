import React from 'react';
import NumberFormat from 'react-number-format';

const CovidDetails = (props) => {

    const {
        totalConfirmed,
        totalRecovered,
        totalDeaths,
        country
    } = props;


    return (
        <div>
            <h2 style={{textTransform:'capitalize'}}>
                {country === '' ? 'World Wide Covid Report' : country}
            </h2>
            <table align='center' border='2px'>
            <tbody>
                <tr>
                    <th>Total Confirmed</th>
                    <th>Total Recovered</th>
                    <th>Total Deaths</th>
                </tr>
                <tr>
                    <td><NumberFormat 
                    value={totalConfirmed} 
                    thousandSeparator={true}
                    displayType='text'/>
                    </td>

                    <td><NumberFormat 
                    value={totalRecovered} 
                    thousandSeparator={true}
                    displayType='text'/>
                    </td>

                    <td><NumberFormat 
                    value={totalDeaths} 
                    thousandSeparator={true}
                    displayType='text'/>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    );
}

export default CovidDetails;