import { createApp } from 'vue'
import store from './store'
import router from './router'
import './index.css'

import App from './App.vue'

//ALERT
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

//fortawesome
import faIcon from "./plugins/fontawesome";

//firebase
import './plugins/firebase'

import 'flowbite';

createApp(App)
    .use(store)
    .use(router)
    .use(VueSweetalert2)
    .component("font-awesome-icon", faIcon)
    .mount('#app')
