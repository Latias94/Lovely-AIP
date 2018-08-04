import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as style from './headerPageCss';
import Logo from '../Img/icon2.png';
import { Icon } from 'react-icons-kit';
import { ic_account_circle } from 'react-icons-kit/md/ic_account_circle';
import { ic_search } from 'react-icons-kit/md/ic_search';



export default () => {
    return (
        <div style={style.background}>
            <div style={style.containerDiv}>
                <div style={style.logoPart}>
                    <div style={{width: '200px', color:'white', height:'60px', display:'flex', alignItems:'flex-end', justifyContent:'flex-end' }}><Icon icon={ic_search} size={30} /></div>
                    <img src={Logo} style={style.iconLogo} />
                    <div style={{width:'200px', color:'white', height:'60px',display:'flex', alignItems:'flex-end', justifyContent:'flex-start' }}><Icon icon={ic_account_circle} size={30} /></div>
                </div>
                <div style={style.navigation}>
                    <div style={style.navigationBar}><Link to='/'>Home</Link></div>
                    <div style={style.navigationBar}><Link to='/register'>register</Link></div>
                    <div style={style.navigationBar}><Link to='/login'>login</Link></div>
                    <div style={style.navigationBar}><Link to='/book/1'> 123</Link></div>
                </div>
            </div>
        </div>
    )
}