import React, { Component } from 'react';
import Api from '../api/api';
class Header extends Component {
    render(){
        return( 
            <div className='header'>
            <span fontSize="30">Wheather or not? </span><br></br>
            <Api/>
            </div>
        );
}
}
export default Header;