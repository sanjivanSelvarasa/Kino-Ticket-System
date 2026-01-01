import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/MovieView.vue'
import Movie from '../views/MovieView.vue'
import DetailMovieView from "../views/DetailMovieView.vue";
import MovieView from "../views/MovieView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import AdminView from "../views/AdminView.vue";
import BuyTickets from "../views/BuyTickets.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/movie',
        name: 'movie',
        component: MovieView,
    },
    {
        path: '/movieDetail/:id',
        name: 'movieDetail',
        component: DetailMovieView,
        props: route => ({ id: Number(route.params.id) }),
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
    },
    {
        path: '/adminView',
        name: 'adminView',
        component: AdminView,
    },
    {
        path: '/tickets/:id',
        name: 'tickets',
        component: BuyTickets,
        props: route => ({ id: Number(route.params.id) }),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router