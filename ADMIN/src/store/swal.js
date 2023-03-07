//DOCUMENTAÇÃO NO SITE:
// https://sweetalert2.github.io/

import { createStore } from 'vuex'
import Swal from 'sweetalert2'
// Create a new store instance.
const store = createStore({
    state: {
        Toast: Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        }),
    },
    getters: {},
    actions: {},
    mutations: {
        notification: (state, { icon, title }) => {
            state.Toast.fire({
                icon,
                title
            })
        },
        alert: (state, { icon, title = '', text = '', confirmButtonText = 'OK' }) => {
            Swal.fire({
                title,
                text,
                icon,
                confirmButtonText,
            })
        }
    },
    modules: {},
})

export default store