<template>
  <v-container
    id="role-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <base-material-card icon="mdi-account-outline">
        <template v-slot:heading>
          <v-tabs
            v-model="tabs"
            background-color="#6AA84F"
            slider-color="#6AA84F"
          >
            <v-tab class="mr-3">
              <v-icon class="mr-2">
                mdi-account-key
              </v-icon>
              {{ getTitleButton }}
            </v-tab>
            <v-tab class="mr-3">
              <v-icon class="mr-2">
                mdi-code-tags
              </v-icon>
              {{ $t('Rol : Módulo') }}
            </v-tab>
          </v-tabs>
        </template>

        <v-card-text style="height: 100px; position: relative">
          <v-fab-transition>
            <v-btn
              fab
              dark
              small
              color="secondary"
              absolute
              right
              top
              @click="$router.go(-1)"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-card-text>
        <v-tabs-items
          v-model="tabs"
          class="transparent"
        >
          <v-tab-item :kei="0">
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <v-text-field
                      v-model="ProductoData.nombre"
                      class="purple-input"
                      :label="$t('nombre')"
                      :disabled="option===2?true:false"
                    />
                    <v-text-field
                    v-model="ProductoData.cantidad"
                    class="purple-input"
                    :label="$t('Cantidad')"
                    :disabled="option===2?true:false"
                  />
                  <v-text-field
                  v-model="ProductoData.precio"
                  class="purple-input"
                  :label="$t('precio')"
                  :disabled="option===2?true:false"
                />
                  </v-col>

                  <v-col
                    cols="12"
                    sm="4"
                  >
                   
                      <template v-slot:item="{ attrs, item, on }">
                        <v-list-item
                          v-bind="attrs"
                          active-class="secondary elevation-4 white--text"
                          class="mx-3 mb-2 v-sheet"
                          elevation="0"
                          v-on="on"
                        >
                          <v-list-item-content>
                            <v-list-item-title v-text="item" />
                          </v-list-item-content>

                          <v-scale-transition>
                            <v-list-item-icon
                              v-if="attrs.inputValue"
                              class="my-3"
                            >
                              <v-icon>mdi-check</v-icon>
                            </v-list-item-icon>
                          </v-scale-transition>
                        </v-list-item>
                      </template>
                    </v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    class="text-right"
                  >
                    <v-btn
                      v-if="option!==2"
                      color="#6AA84F"
                      class="mr-0"
                    >
                      {{ getTitleButton }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-tab-item>
        </v-tabs-items>
      </base-material-card>
    </v-row>
  </v-container>
</template>

<script>
  import i18n from '@/i18n'
  import { editProducto, createProducto } from '@/api/modules'
  export default {
    data: () => ({
      tabs: 0,
      option: 0,
      title: '',
      ProductoData: {
        nombre: '',
        cantidad:'',
        precio:'',
      
      },
     
    }),
    computed: {
      getTitle () {
        if (this.option === 1) return i18n.t('Producto.create')
        else if (this.option === 2) return i18n.t('Producto.show')
        else if (this.option === 3) return i18n.t('Producto.edit')
        else return i18n.t('roles.title')
      },
      getTitleButton () {
        if (this.option === 1) return i18n.t('crud.create')
        else if (this.option === 2) return i18n.t('crud.show')
        else if (this.option === 3) return i18n.t('crud.edit')
        else return i18n.t('roles.title')
      },
    },
    mounted () {
      // console.log($t('roles.title'))
      this.initialize()
    },
    methods: {
      initialize () {
        this.option = this.$route.params.option
        if (this.option === 3 || this.option === 2) {
          this.ProductoData = this.$route.params.ProductoData
          console.log(this.ProductoData)
        }
      },
      async submit () {
        if (this.option === 1) {
          let serviceResponse = await createProducto(this.ProductoData)
          if (serviceResponse) {
            console.log(serviceResponse)
            window.getApp.$emit('SHOW_MESSAGE', { text: 'Guardado con éxito'});
            this.$router.go(-1);
          } else {
            console.log(serviceResponse)
            const params = { text: serviceResponse.message.text }
            window.getApp.$emit('SHOW_ERROR', params)
          }
        } else if (this.option === 3) {
          let serviceResponse = await editProducto(this.ProductoData)
          if (serviceResponse) {
            window.getApp.$emit('SHOW_MESSAGE', { text: 'Modificado con éxito'});
            this.$router.go(-1);
            console.log(serviceResponse)
          } else {
            console.log(serviceResponse)
            const params = { text: serviceResponse.message.text }
            window.getApp.$emit('SHOW_ERROR', params)
          }
        }
      },
    }, 
  }
</script>
