import React, { Component } from 'react';
const axios = require('axios')

export default () => {
    return (
        <div>
            <h1>Welcome</h1>
            <div><p>username</p><input type="text"/></div>
            <div><p>password</p><input type="text" /></div>
          <button onClick={() => {

            axios({
              method: 'post',
              url: 'http://localhost:5000/api/users/login',
              header: {
                'Access-Control-Allow-Origin': '*',
                'content-type': 'application/x-www-form-urlencoded',
              },
              data: {
                email: 'dasihdoiahsdo@hotmail.com',
                password: 'dasdaasdasdasdssdasdasdas',
              }
            }
            ).then(function (response) {
                console.log(response);
              });
          }}>Login</button>
        </div>
    )
}