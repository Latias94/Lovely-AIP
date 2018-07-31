import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as style from './registerPageCss';
import axios from "axios";

export default () => {
    return (
        <div>
            <div style={style.containerLayout}>
                <div style={style.innerDiv}><p>email</p><input type="text"/></div>
                <div style={style.innerDiv}><p>password</p><input type="text"/></div>
                <div style={style.innerDiv}><p>confirm password</p><input type="text" /></div>
                <input type="submit" value="submit"/>
              <button onClick={() => {
                axios({
                  method: 'post',
                  url: 'http://localhost:5000/api/users/register',
                  header: {
                    'Access-Control-Allow-Origin': '*',
                    'content-type': 'application/x-www-form-urlencoded',
                  },
                  data: {
                    name: '165468sd',
                    email: 'dasihdoiahsdo@hotmail.com',
                    password: 'dasdaasdasdasdssdasdasdas',
                  }
                });
              }}>Submit</button>
            </div>
        </div>
    )
}