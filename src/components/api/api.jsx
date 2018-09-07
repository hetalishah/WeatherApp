import React, { Component } from 'react';
import {request,then} from 'superagent';


// export function loadData(){
//     return(dispatch)=>{
//         return request.get(url), then((response)=> {
//         const results = response.body.query
//             this.setState({
//                     title: results.results.channel.location.city +", " + results.results.channel.location.country +", "+ results.results.channel.location.region,

//                     forecast: results.results.channel.item.forecast,
//                     isFetching: false
//                 })

//             dispatch(showData(this.state));

//         console.log(this.state);
//     })
//     } 
// }

// export function showData(data){
//     return{
//         type:"SHOW_DATA",
//         title:title,
//         forecast:forecast
//     }

// }

class Api extends Component {
    constructor(props){
        super(props)
        this.state = {
                        city:'',
                        title:'',
                        forecast: '',
                        isFetching: true
                    }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e){
        this.setState({city: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        var url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22`+this.state.city+`%22)%20and%20u%3D'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
        console.log(url);
        return request.get(url)
         .then(function(response) {
                    const results = response.body.query
                        this.setState({
                                title: results.results.channel.location.city +", " + results.results.channel.location.country +", "+ results.results.channel.location.region,
            
                                forecast: results.results.channel.item.forecast,
                                isFetching: false
                            })
            
        
            
                    console.log(this.state);
        });
}


    render() {
        return (
            <div id="weather">
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} value={this.state.city} type="text" placeholder="Enter a city, zip, state, or a country"/>
                <button>Search</button>
                <p>{this.state.title}</p>
            </form>
            </div>
        )
    }
}

export default Api;
 