import Swal from "sweetalert2";

import '../partials/toststyle.css';
export const tostNtf = async (title, type = 'success', position = 'top-end') => {
    if (type === 'success') {
        Swal.fire({
            text: title,
            icon: 'success',
            toast: true,
            position: position,
            showConfirmButton: false,
            timer: 3000,
        });
    } else {
        Swal.fire({
            text: title,
            icon: 'error',
            toast: true,
            position: position,
            showConfirmButton: false,
            timer: 3000,
        });
    }
}