import axios from 'axios';
 
export function RegisteAccount(name, email, password) {
    return axios.post('http://localhost:5000/api/users/register', {
        name: name,
        email: email,
        password: password,
        })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}