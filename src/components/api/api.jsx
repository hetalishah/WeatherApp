import React, { Component } from 'react';
import request from 'superagent';

class Api extends Component {
    constructor(props){
        super(props)
        this.state = {
                        city: '',
                        title:'',
                        key:'',
                        display:'hide',
                        currentTime:'',
                        currentText:'',
                        currentTemp:''
                    }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e){
        this.setState({city: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const apikey = "PnefH8G0yoBMtQZ7H1f2L0CoQKpIrY26";

       var url='http://dataservice.accuweather.com/locations/v1/cities/search?apikey='+apikey+'&q='+this.state.city+'&offset=0';
        
        request.get(url)
        .then((response) => {
                                const results = response.body[0];

                                this.setState({
                                    title: results.LocalizedName+", "+ results.AdministrativeArea.ID +", "+ results.Country.ID,
                                    key: results.Key,
                                    display: '',
                                })
                                var url2 ='http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/'+this.state.key+'?apikey='+apikey+'&details=true';
                                var current='http://dataservice.accuweather.com/currentconditions/v1/'+this.state.key+'?apikey='+apikey;
                                request.get(url2)
                                .then((response)=>{
                                    const results2 = response.body;
                                   this.setState({

                                   })




                                })


                                request.get(current)
                                .then((response)=>{
                                    const current = response.body[0];
                                    var time=current.LocalObservationDateTime;
                                    var t=new Date(time);
                                    console.log(t);

                                    var hours=t.getHours();
                                    var minutes=t.getMinutes();
                                  // console.log(current);
                                   this.setState({
                                       currentTime:hours+":"+minutes,
                                       currentText:current.WeatherText,
                                       currentTemp:current.Temperature.Metric.Value +'\xB0'+ current.Temperature.Metric.Unit

                                   })




                                })


            
        })
        .catch((err) => {
            alert("Please enter a valid city");

        })
}


    render() {
        return (
            <div id="weather">
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} value={this.state.city} type="text" placeholder="Enter a city, zip, state, or a country"/>
                <button>Search</button>
                <p>{this.state.title}</p>
                <div className={this.state.display}>
                    <p>{this.state.currentTime}
                    {this.state.currentText}
                    {this.state.currentTemp} </p>
                </div>
            </form>
            </div>
        )
    }
}

export default Api;
 