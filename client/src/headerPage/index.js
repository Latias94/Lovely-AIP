import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as style from './headerPageCss';
import Logo from '../Img/icon2.png';
import { Icon } from 'react-icons-kit'
import {ic_account_circle} from 'react-icons-kit/md/ic_account_circle'

export default () => {
    return (
        <div style={style.background}>
            <div style={style.containerDiv}>
                <img src={Logo} style={style.iconLogo} />
                <div style={style.navigation}><Link to='/'>Home</Link></div>
                <div style={style.navigation}><Link to='/register'>register</Link></div>
                <div style={style.navigation}><Link to='./login'>login</Link></div>
                <div style={style.navigation}><Icon icon={ic_account_circle} size={40} /></div>
            </div>
        </div>
    )
}