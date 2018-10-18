import React from 'react';
import './index.css';

export default props => {
    return (
        <div className='weather-box error-container'>
            <span>Oops... Something went wrong! Try to refresh the page or select existing city</span><br/>
        </div>
    )
}