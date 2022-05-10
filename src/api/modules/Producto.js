import { apiHttp } from '../axiosApi.js'
import {

  ProductoPath, ProductoSave,

} from '../config/apiRoute.js'

export const createProducto = (body) =>
  apiHttp('POST', `${ProductoSave}`, body)

export const editProducto = (id, body) =>
  apiHttp('PUT', `${ProductoSave}/${id}`, body)

export const getProducto = () =>
  apiHttp('GET', `${ProductoPath}`)

  export const deleteProducto = (body) => 
  apiHttp('DELETE', `${ProductoPath}`, body)
