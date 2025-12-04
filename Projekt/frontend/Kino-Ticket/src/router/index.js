import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/MovieView.vue'
import Movie from '../views/MovieView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/movie',
        name: 'movie',
        component: Movie,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router