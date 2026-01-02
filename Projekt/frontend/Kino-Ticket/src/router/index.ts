import {createRouter, createWebHistory, type RouteLocationNormalized} from 'vue-router'
import {useAuthStore} from "../stores/auth.js";
import DetailMovieView from "../views/DetailMovieView.vue";
import MovieView from "../views/MovieView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import AdminView from "../views/AdminView.vue";
import BuyTickets from "../views/BuyTickets.vue";
import RegistrationView from "../views/RegistrationView.vue";
import ShoppingCart from "../views/ShoppingCart.vue";

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
        props: (route: RouteLocationNormalized) => ({ id: Number(route.params.id) }),
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationView,
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
        props: (route: RouteLocationNormalized) => ({ id: Number(route.params.id) }),
        meta: { requiresAuth: true }
    },
    {
        path: '/shoppingcart',
        name: 'shoppingcart',
        component: ShoppingCart,
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: () => ({ top: 0 }),

})

router.beforeEach((to) => {
    const auth = useAuthStore();

    if(to.meta.requiresAuth && !auth.isLoggedIn) {
        return { path: '/login' };
    }
})

export default router