import Axios from 'axios';

// const GET_CURRENT_USER_BOOKLISTS = 'GET__CURRENT_USER_BOOKLISTS';

// TODO: refactor it to Promise
export const getCurrentUserBookLists = (setter) => {
	Axios.get('/users/current/booklist')
		.then(res => {
			// save to Redux
            console.log("current booklist", res.data);
			setter(res.data);
		})
		.catch(err => console.log(err.data));
};

export const createBookList = (title) => (description) => {
    Axios.post('/booklists', { title, description })
        .then(res => {
            // TODO: transfer error msg to UI
            // console.log(res.data)
        })
        .catch(()=>{})
};
