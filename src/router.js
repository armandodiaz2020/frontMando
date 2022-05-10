import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    
    {
      path: '/',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: 'Home',
          path: '',
          component: () => import('@/views/container/Home'),
        },
        // Users
        {
          name: 'Users',
          path: 'users/users',
          component: () => import('@/views/container/Users/Users'),
        },
        {
          name: 'UsersFrom',
          path: 'users/form',
          component: () => import('@/views/container/Users/UsersFrom'),
        },
        // Roles
        {
          name: 'Cliente',
          path: 'cliente/cliente',
          component: () => import('@/views/container/Cliente/Cliente'),
        },
        {
          name: 'ClienteForm',
          path: 'cliente/form',
          component: () => import('@/views/container/Cliente/ClienteForm'),

        },

         // Módulos
         {
          name: 'TipoCliente',
          path: 'tipocliente/tipocliente',
          component: () => import('@/views/container/TipoCliente/TipoCliente'),
        },
        {
          name: 'TipoClienteForm',
          path: 'tipocliente/form',
          component: () => import('@/views/container/TipoCliente/TipoClienteForm'),
        },

        {
          name: 'Producto',
          path: 'producto/producto',
          component: () => import('@/views/container/Producto/Producto'),
        },
        {
          name: 'ProductoForm',
          path: 'producto/form',
          component: () => import('@/views/container/Producto/ProductoForm'),
        },
        
      ],
    },
  ],
})
