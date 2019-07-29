import React, {Component} from 'react';
import './css/Ticker.css';
import Change from './Change';
import axios from 'axios';

class Ticker extends Component{
    constructor(props){
        super(props);

        this.state = {
            data: [],
            currencies: [],
            values: [],
            usdValue: 0,
            curr: 'USD',
            loader: true
        }
    }

    componentDidMount(){
        this.fetchData()
        this.getUserCountry()
        Notification.requestPermission()
        
        setInterval(() => {
            this.fetchData();
        }, 300000);
    }

    componentDidUpdate(){
        this.state.data.forEach(element => {
            let title, body, image;

            if(element.percent_change_1h >= 2){
                title = `Increase in ${element.name}`
                body = `${element.name} has a ${element.percent_change_1h}% increase over a hour`
            }
            else if(element.percent_change_1h <= -2){
                title = `Decrease in ${element.name}`
                body = `${element.name} has a ${element.percent_change_1h}% decrease over a hour`
            }


            if(element.percent_change_24h >= 5){
                title = `Increase in ${element.name}`
                body = `${element.name} has a ${element.percent_change_24h}% increase over a hour`
            }
            else if(element.percent_change_24h <= -5){
                title = `Decrease in ${element.name}`
                body = `${element.name} has a ${element.percent_change_24h}% decrease over one day`
            }

            if(element.percent_change_7d >= 5){
                title = `Increase in ${element.name}`
                body = `${element.name} has a ${element.percent_change_7d}% increase over one day`
            }
            else if(element.percent_change_7d <= -5){
                title = `Decrease in ${element.name}`
                body = `${element.name} has a ${element.percent_change_7d}% decrease over one week`
            }  

            image = require('./img/'+(element.symbol).toLowerCase()+'.png')

            if(title && body){
                // audio = new Audio(audio)
                // audio.play()
                this.notify(title, body, image)
            }
        })
    }


    // functions
    cryptoImage = (symbol) =>{
        return require('./img/'+symbol+'.png')
    }

    notify(title, body, image){
        let n = new Notification(title, {
            body: body,
            icon: image
        })

        setTimeout(() => {
            n.close()
        }, 1000);
    }

    getUserCountry = async() =>{  
        let response = await axios.get('https://api.exchangeratesapi.io/latest?base=USD');
        await this.setState({
            currencies: Object.keys(response.data.rates),
            values: response.data.rates,
            usdValue: response.data.rates[this.state.curr]
        })
    }

    fetchData = async() => {
        let response = await axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=100')
        let coinTypes = ["BTC","LTC","BCH","ETH", "XRP", "ETC", "BAT", "BCH", "EOS", "ZEC"]
         
        await this.setState({
            data: response.data.filter(key => coinTypes.includes(key.symbol)),
            loader: false
        })
    }

    fix = (num) => {
        return parseFloat(num).toFixed(2)
    }

    selectCurrency = (e) => {
        this.setState({
            curr: e.target.value,
            usdValue: this.state.values[e.target.value]
        })
    }

    render(){
        let tickers = this.state.data.map(crypto => {

            // const bgImage = {
            //     backgroundImage: 'url('+this.cryptoImage(crypto.symbol.toLowerCase())+')'
            // }

          return (
                <div key={crypto.symbol.toLowerCase()} className="coin-row">
                    <div className="coin-head">
                        <img src={this.cryptoImage(crypto.symbol.toLowerCase())} className="circle responsive-img coin-image" alt={crypto.id}/>
                        <h2 className="coin-name">{crypto.name}</h2>
                    </div>

                    <div className="col s12">
                        <div className="card-panel grey lighten-5 z-depth-1">
                            <div className="row valign-wrapper">
                                <div className="col s12 coin-text">
                                    <span className="black-text"><h3>1 {crypto.symbol} = {this.state.curr} { 
                                        parseFloat(this.fix(crypto.price_usd * this.state.usdValue)).toLocaleString('en')}  </h3></span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <Change data={this.state.data} id={crypto.id}></Change>
                </div>
          )
        })

        let options = this.state.currencies.map(currency => {
            return(
                <option key={currency.toLowerCase()} value={currency}>{currency}</option>
            )
        })

        return (
            <div className="container">
                <div className="select-currency">
                    <select onChange={this.selectCurrency} value={this.state.curr}>
                        <option disabled defaultValue value="">Choose currency</option>
                        {options}
                    </select>
                </div>

                {   
                    !this.state.loader
                    ? <div className="row"> {tickers} </div> 
                    : <div className="loader"> 
                        <img src='https://i.pinimg.com/originals/78/e8/26/78e826ca1b9351214dfdd5e47f7e2024.gif' alt="loader" /> 
                        <p>Loading</p>
                    </div>
                }

            </div>
        )
    }
}

export default Ticker;