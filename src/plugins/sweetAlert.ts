import Swal from 'sweetalert2';

export const swal = Swal.mixin({
  allowOutsideClick: true,
  allowEscapeKey: false,
  showCancelButton: true,
  cancelButtonText: 'Bỏ qua',
  confirmButtonColor: '#32c072',
  cancelButtonColor: '#dc0606',
  focusConfirm: false
});
