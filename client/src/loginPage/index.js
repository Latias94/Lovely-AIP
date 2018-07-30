import React, { Component } from 'react';
import axios from 'axios';

// import {RegisteAccount} from './actions'
export default () => {
    return (
        <div>
            <h1>Welcome</h1>
            <div><p>username</p><input type="text"/></div>
            <div><p>password</p><input type="text" /></div>
            <button >Submmit</button>
        </div>
    )
}