import Axios from 'axios';

// const GET_CURRENT_USER_BOOKLISTS = 'GET__CURRENT_USER_BOOKLISTS';

// TODO: refactor it to Promise
export const getCurrentUserBookLists = (setter) => {
	Axios.get('/users/current/booklist')
		.then((res) => {
			setter(res.data);
		})
		.catch(err => console.log(err.data));
};

export const createBookList = (name) => (description) => {
    Axios.post('/booklists', { title: name, description })
        .then(res => {})
        .catch(()=>{})
}
