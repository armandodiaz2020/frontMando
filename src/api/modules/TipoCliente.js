import { apiHttp } from '../axiosApi.js'
import {

  TipoClientePath, TipoClienteSave,

} from '../config/apiRoute.js'

export const createTipoCliente = (body) =>
  apiHttp('POST', `${TipoClienteSave}`, body)

export const editTipoCliente = (body) =>
  apiHttp('PUT', `${TipoClienteSave}`, body)

export const getTipoCliente= () =>
  apiHttp('GET', `${TipoClientePath}`)

export const deleteTipoCliente = (body) => 
  apiHttp('DELETE', `${TipoClientePath}`, body)