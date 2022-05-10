<template>
  <v-container
    id="data-tables"
    tag="section"
  >
    <base-material-card
      color="indigo"
      icon="mdi-vuetify"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="Cliente">
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
            @click="showCliente(item)"
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
            @click="editCliente(item)"
          >
            <v-icon
              small
              v-text="'mdi-pencil'"
            />
          </v-btn>
          <v-btn

            :key="3"
            color="secondary"
            fab
            class="px-1 ml-1"
            x-small
            @click="deleteCliene(item)"
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
            color="primary"
            fixed
            right
            bottom
            @click="createCliente"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-card-text>
    </base-material-card>
  </v-container>
</template>

<script>
  import { getCliente, deleteCliente } from '@/api/modules'
  
  import i18n from '@/i18n'

  export default {
    name: 'DashboardDataTables',
    
    data: () => ({
      hidden: false,
      title:'Cliente',
      headers: [
        {
          text: i18n.t('ID'),
          value: 'id',
        },
        {
          text: i18n.t('Tipo cliente'),
          value: 'tipo_cliente',
        },
        {
          text: i18n.t('Nombre'),
          value: 'nombre',
        },
        {
          text: i18n.t('Apellido'),
          value: 'apellido',
        },
        {
          text: i18n.t('Correo'),
          value: 'correo',
        },
        {
          text: i18n.t('Telefono'),
          value: 'telefono',
        },


        {
          sortable: false,
          text: 'ACCIONES',
          value: 'actions',
        },
      ],
      items: [],
      search: undefined,
    }),
    async mounted () {
      // window.getApp.$emit("SHOW_ERROR", "34534535")
        await this.loadClienteData();
    },
    methods: {
      async loadClienteData () {
        let serviceResponse = await getCliente()
        if (serviceResponse) {
          this.items = Object.values(serviceResponse);
        } else {

          const params = { text: serviceResponse.message.text }
          window.getApp.$emit('SHOW_ERROR', params)
        }
      },
      createCliente() {
        console.log('create')
        this.$router.push({
          name: 'ClienteForm',
          params: {
            option: 1, // option 1 to create
            
          },
        })
      },
      showRole (item) {
        console.log(item)
        this.$router.push({
          name: 'ClienteForm',
          params: {
            option: 2, // option 2 to show
            ClienteData: item,
          },
        })
      },
      editCliente (item) {
        console.log(item)
        this.$router.push({
          name: 'ClienteForm',
          params: {
            option: 3, // option 3 to edit
            ClienteData: item,
          },
        })
      },
      async deleteCliente (item) {
         if (confirm("¿Seguro que desea eliminar este Item?")) {
        let serviceResponse = await deleteCliente(item);
        if (serviceResponse) {
          window.getApp.$emit("SHOW_MESSAGE", { text: "Item eliminado" });
          this.loadClienteData();
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
.roles {
  text-transform: uppercase;
  color: #45818E;
  font-size: 2vw;
  font-family: ''Georgia, 'Times New Roman', Times, serif;
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
