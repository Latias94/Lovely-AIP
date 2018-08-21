import React, { Component } from 'react';

class DetailConfirm extends Component{
    render(){
        return(
            <table>
                <tr>
                    <th>Book Name</th>
                    <th>Price($)</th>
                    <th>Amount</th>
                    <th>Total</th>
                </tr>
                <tr>
                    <td>Big Data</td>
                    <th>123</th>
                    <th>2</th>
                    <th>246</th>
                </tr>
            </table>

        );

    }

}

export default DetailConfirm;