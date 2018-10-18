import axios from "axios";
import { showErrorMsgFromObject, alertDeleted, showSuccess } from '../common/utils/sweetAlert';

export function deleteBookList(id) {
	axios.delete(`/booklists/${id}`)
		.then(() => {
			alertDeleted();
			window.location = '/account';
		})
		.catch(err => showErrorMsgFromObject(err.response.data));
}

export function updateBookList(title, description, id, slug) {
	axios.post(`/booklists/${id}`, { title, description })
		.then(() => {
			showSuccess();
			window.location = `/booklist/${slug}`;
		})
		.catch(err => showErrorMsgFromObject(err.response.data));
}
