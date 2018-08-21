import React, {Component} from 'react';

class paymentConfirm extends Component {

    render() {
        return (
            <table className="paymentChoose">
                <tr>
                    <th>Holder Name</th>
                    <th>Card Number</th>
                </tr>
                <tr>
                    <td><input /></td>
                    <td><input /></td>
                </tr>
                <tr>
                    <th>Expire Date</th>
                    <th>CVV</th>
                </tr>
                <tr>
                    <td><input />/<input /></td>
                    <td><input /></td>
                </tr>
            </table>
        );
    }
}
export default paymentConfirm;
