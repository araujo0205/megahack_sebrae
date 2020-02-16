import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Cadastro from '../views/Cadastro.vue'
import Home from '../views/Home.vue'
import Perfil from '../views/Perfil.vue'
import Vendas from '../views/Vendas.vue'
import Financeiro from '../views/Financeiro.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: Cadastro
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil
  },
  {
    path: '/vendas',
    name: 'Vendas',
    component: Vendas
  },
  {
    path: '/financeiro',
    name: 'Financeiro',
    component: Financeiro
  }
]

const router = new VueRouter({
  routes
})

export default router
