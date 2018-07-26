import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as style from './registerPageCss';

export default () => {
    return (
        <div>
            <h1><Link to='/'>Welcome</Link></h1>
            <h2><Link to='/register'>register</Link></h2>
            <h3><Link to='./login'>login</Link></h3>
            <div style={style.containerLayout}>
                <div style={style.innerDiv}><p>email</p><input type="text"/></div>
                <div style={style.innerDiv}><p>password</p><input type="text"/></div>
                <div style={style.innerDiv}><p>confirm password</p><input type="text" /></div>
                <input type="submit" value="submit"/>
            </div>
        </div>
    )
}