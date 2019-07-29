import React from 'react';
import './css/Ticker.css';

const Change = ({data, id}) => {
    data = data.find(key => key.id  === id)

    return(
        <div className="row">
            <div className="col s4">
                <div className="card horizontal">
                    <div className="card-stacked">
                        <div className="card-content">
                        
                        {
                            (Math.sign(data.percent_change_1h) === 1) ? <span style={{color: 'green'}}>{data.percent_change_1h}%</span> : 
                            (Math.sign(data.percent_change_1h) === 0) ? <span style={{color: 'black'}}>{data.percent_change_1h}%</span>
                            : <span style={{color: 'red'}}>{data.percent_change_1h}%</span>
                        }
                        </div>
                            
                        <div className="card-action">
                            <span>1 hour</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col s4">
                <div className="card horizontal">
                    <div className="card-stacked">
                        <div className="card-content">
                            {
                                (Math.sign(data.percent_change_24h) === 1) ? <span style={{color: 'green'}}>{data.percent_change_24h}%</span> : 
                                (Math.sign(data.percent_change_24h) === 0) ? <span style={{color: 'black'}}>{data.percent_change_24h}%</span>
                                : <span style={{color: 'red'}}>{data.percent_change_24h}%</span>
                            }                            
                        </div>
                            
                        <div className="card-action">
                            <span>1 day</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col s4">
                <div className="card horizontal">
                    <div className="card-stacked">
                        <div className="card-content">
                            {
                                (Math.sign(data.percent_change_7d) === 1) ? <span style={{color: 'green'}}>{data.percent_change_7d}%</span> : 
                                (Math.sign(data.percent_change_7d) === 0) ? <span style={{color: 'black'}}>{data.percent_change_7d}%</span>
                                : <span style={{color: 'red'}}>{data.percent_change_7d}%</span>
                            }
                        </div>
                            
                        <div className="card-action">
                            <span>1 week</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Change;