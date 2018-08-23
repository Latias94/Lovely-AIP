import axios from 'axios';

const setAuthTokenInHeader = (token) => {
	axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

	if (token) {
		// Apply to every request
		axios.defaults.headers.common.Authorization = token;
	} else {
		// Delete header
		delete axios.defaults.headers.common.Authorization;
	}
};

export default setAuthTokenInHeader;
