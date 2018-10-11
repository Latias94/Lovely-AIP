import swal from 'sweetalert2';
import printObj from './printObject';

export function showErrorMsg(msg) {
    swal({
        position: 'top',
        title: 'Oops!',
        text: msg,
        showConfirmButton: false,
        timer: 2000
    })
}

export function showErrorMsgFromObject(obj) {
    swal({
        position: 'top',
        title: 'Oops!',
        text: printObj(obj),
        showConfirmButton: false,
        timer: 2000
    })
}

export function showErrorMsgFromErrorObject(obj) {
    swal({
        position: 'top',
        title: 'Oops!',
        text: printObj(obj.response.data),
        showConfirmButton: false,
        timer: 2000
    })
}

export function alertDeleted() {
    swal({
        position: 'top',
        title: 'Deleted!',
        showConfirmButton: false,
        timer: 2000
    })
}

export function showSuccess() {
    swal({
        position: 'top',
        title: 'Success!',
        showConfirmButton: false,
        timer: 1500
    });
}
