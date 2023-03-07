import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import store from '../store';
import dynamic from '../store/dynamic'

import DefaultLayout from '../components/DefaultLayout/DefaultLayout.vue'
import DynamicRegister from '../components/Dynamic/Register.vue'
import DynamicList from '../components/Dynamic/List.vue'
import Dynamic from '../view/Dynamic.vue'
import Pages from '../view/Pages.vue'
import Dashboard from '../view/Dashboard.vue'
import Profile from '../view/Profile.vue'
import Layout from '../view/Layout.vue'
import User from '../view/User.vue'

import AuthLayout from '../components/AuthLayout.vue'
import Login from '../view/Login.vue'
import Register from '../view/Register.vue'
import Forgot from '../view/Forgot.vue'
import Reset from '../view/Reset.vue'

const routes = [{
    path: '/',
    redirect: '/dashboard',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: { name: '' }
        },
        {
            path: '/layout',
            name: 'Layout',
            component: Layout,
            meta: { name: 'Layout' }
        },
        {
            path: '/users',
            name: 'Users',
            component: User,
            meta: { name: 'Usuários' }
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            meta: { name: 'Seu Perfil' }
        },
        {
            path: '/pages',
            name: 'Pages',
            component: Pages,
            meta: { name: '' }
        },
        {
            path: '/dynamic',
            component: Dynamic,
            meta: { name: '', default: true },
            children: [
                {
                    path: '/dynamic/register',
                    name: 'dynamic-register',
                    component: DynamicRegister,
                    meta: { name: '' }
                },
                {
                    path: '/dynamic/list',
                    name: 'dynamic-list',
                    component: DynamicList,
                    meta: { name: '' }
                }
            ]
        },
    ]
},
{
    path: '/auth',
    redirect: '/login',
    component: AuthLayout,
    meta: { isGuest: true },
    children: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: null
        },
        {
            path: '/forgot',
            name: 'Forgot',
            component: Forgot
        },
        {
            path: '/reset',
            name: 'Reset',
            component: Reset
        },
    ]
},

]
const router = createRouter({
    history: createWebHistory(),
    routes
})



router.beforeEach((to, from, next) => {
    if (to.meta.default) {
        dynamic.dispatch('GetAll', to)
        dynamic.dispatch('GetDB', to)
    }

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (to.meta.requiresAuth && !user)
            next({ name: 'Login' })
        else if (user && to.meta.isGuest)
            next({ name: 'Dashboard' })
        else
            next()

        store.commit('setUser', user)
    });

})

export default router