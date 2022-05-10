<template>
  <v-container
    id="data-tables"
    tag="section"
  >
    <base-material-card
      color="#45818E"
      icon="mdi-account-supervisor"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="TipoCliente">
          {{ title }}
        </div>
      </template>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        class="ml-auto"
        label="BUSCAR"
        hide-details
        single-line
        style="max-width: 250px;"
      />

      <v-divider class="mt-3" />

      <v-data-table
        :headers="headers"
        :items="items"
        :search.sync="search"
        :sort-by="['name', 'office']"
        :sort-desc="[false, true]"
        multi-sort
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn
            :key="1"
            color="blue"
            fab
            class="px-1 ml-1"
            x-small
            @click="showTipoCliente(item)"
          >
            <v-icon
              small
              v-text="'mdi-eye'"
            />
          </v-btn>
          <v-btn

            :key="2"
            color="primary"
            fab
            class="px-1 ml-1"
            x-small
            @click="editTipoCliente(item)"
          >
            <v-icon
              small
              v-text="'mdi-pencil'"
            />
          </v-btn>
          <v-btn

            :key="3"
            color="#CC0000"
            fab
            class="px-1 ml-1"
            x-small
            @click="deleteTipoCliente(item)"
          >
            <v-icon
              small
              v-text="'mdi-delete'"
            />
          </v-btn>
        </template>
      </v-data-table>
      <v-card-text style="height: 100px; position: relative">
        <v-fab-transition>
          <v-btn
            fab
            dark
            large
            color="#45818E"
            fixed
            right
            bottom
            @click="createTipoCliente"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-card-text>
    </base-material-card>
  </v-container>
</template>

<script>
  import { editTipoCliente ,getTipoCliente, deleteTipoCliente } from '@/api/modules'
  import i18n from '@/i18n'

  export default {
    name: 'DashboardDataTables',

    data: () => ({
      hidden: false,
      title: 'Tipos de Clientes',
      headers: [
        {
          text: i18n.t('ID'),
          value: 'id',
        },
        {
          text: i18n.t('tipo de cliente'),
          value: 'tipo_cliente',
        },

        {
          sortable: false,
          text: 'Actions',
          value: 'actions',
        },
        
      ],
      items: [],
      search: undefined,
    }),
    async mounted () {
      // window.getApp.$emit("SHOW_ERROR", "34534535")
      await this.loadTipoClienteData();
    },
    methods: {
      async loadTipoClienteData () {
        let serviceResponse = await getTipoCliente();
         if (serviceResponse) {
          this.items = Object.values(serviceResponse);
           console.log(this.items)
         } else {
           //console.log(serviceResponse)
           const params = { text: serviceResponse.message.text }
           window.getApp.$emit('SHOW_ERROR', params)
         }
      },
      createTipoCliente () {
        console.log('create')
        this.$router.push({
          name: 'TipoClienteForm',
          params: {
            option: 1, // option 1 to create
          },
        })
      },
      showTipoCliente (item) {
        console.log(item)
        this.$router.push({
          name: 'TipoClienteForm',
          params: {
            option: 2, // option 2 to show
            TipoClienteData: item,
          },
        })
      },
      editTipoCliente (item) {
        console.log(item)
        this.$router.push({
          name: 'TipoClienteForm',
          params: {
            option: 3, // option 3 to edit
            TipoClienteData: item,
          },
        })
      },
      async deleteTipoCliente(item) {
      if (confirm("¿Seguro que desea eliminar este Tipo de Cliente?")) {
        let serviceResponse = await deleteTipoCliente(item);
        if (serviceResponse) {
          window.getApp.$emit("SHOW_MESSAGE", { text: "Tipo Cliente eliminado" });
          this.loadTipoClienteData();
        } else {
          const params = { text: "Error: Registro no eliminado" };
          window.getApp.$emit("SHOW_ERROR", params);
        }
      }
    },
    },
  }
</script>

<style>
/* .theme--dark.v-card {
  background: #ffff !important;
} */
.modules {
  text-transform: uppercase;
  color: #45818E;
  font-size: 2vw;
  font-family: 'Georgia', 'Times New Roman', Times, serif;
  font-weight: 900;
}
/* .v-input__slot{
  background: #45818E !important;
}
.theme--dark.v-input:not(.v-input--is-disabled) input {
  color: black !important;
}
.theme--dark.v-data-table {
  background: #45818E!important;
} */
</style>
