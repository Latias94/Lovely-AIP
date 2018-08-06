import React, {Component} from 'react';
const axios = require('axios');

class accountPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: 'PLEASE LOG IN',
      email: 'PLEASE LOG IN'
    }

    const URL = 'http://localhost:5000/api/users/current'
    axios.get(URL, {})
      .then((response => {
        if (response.status === 200) {
          const {name: username, email} = response.data
          this.setState({
            username,
            email
          })
        }
      }))
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    const {} = styles

    return <div>
      <h1>ACCOUNT INFO</h1>
      <p>Username: {this.state.username}</p>
      <label>Email: {this.state.email}</label>
    </div>
  }
}

const styles = {}

export default accountPage;