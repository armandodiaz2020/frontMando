<template>
  <v-container
    class="home-page fill-height"
    tag="section"
  >
    <v-row
      class="text-center"
      justify="center"
    >
      <v-col cols="auto">
        <h1 class="welcome">
          Bienvenido al sistema 
        </h1>
        <h2 class="parrafo">
          Seleccione una opción
        </h2>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-btn
              depressed
              to="users/users"
              class="btn-user"
            >
              Factura
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-btn
              depressed
              to="Cliente/Cliente"
              class="btn-roles"
            >
              Cliente
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-btn
              depressed
              to="/tipocliente/tipocliente"
              class="btn-module"
            >
              TipoCliente
          </v-btn>
          </v-col>

           <v-col cols="12" sm="6" md="4">
            <v-btn
              depressed
              to="/producto/producto"
              class="btn-rolmodule"
            >
              Producto
          </v-btn>
          </v-col>
          
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',
  }
</script>

<style type="text/css" media="screen">
  .welcome{
    font-size: 5vw !important;
  }
  .parrafo {
    font-size: 2vw;
    margin: 2vw 0 2vw 0;
  }
  .btn-user {
    background-color: firebrick !important;
  }
  .btn-roles {
    background-color: rebeccapurple !important;
  }
  .btn-module {
    background-color: tomato !important;
  }

  .btn-rolmodule {
    background-color: tomato !important;

  }
</style>