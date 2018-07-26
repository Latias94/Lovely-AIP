import React, {Component} from 'react';
import { Link } from 'react-router-dom';


export default () => {
    return (
        <div>
            <h1><Link to='/'>Welcome</Link></h1>
            <h2><Link to='/register'>register</Link></h2>
            <h3><Link to='./login'>login</Link></h3>
            
        </div>
    )
}