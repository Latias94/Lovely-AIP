import Axios from "axios";
import {showErrorMsgFromObject, alertDeleted, showSuccess} from '../common/utils/sweetAlert';

export function deleteBookList(id) {
    Axios.delete(`/booklists/${id}`)
        .then(() => {
            alertDeleted();
            window.location = '/account';
        })
        .catch(err => showErrorMsgFromObject(err.response.data));
}

export function updateBookList(title, description, id) {
    Axios.post(`/booklists/${id}`, {title, description})
        .then((res) => {
            showSuccess();
            window.location = `/booklist/${res.data.slug}`;
        })
        .catch(err => showErrorMsgFromObject(err.response.data));
}
