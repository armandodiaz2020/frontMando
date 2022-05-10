import { apiHttp } from '../axiosApi.js'
import {

  ClientePath, ClienteSave,

} from '../config/apiRoute.js'

export const createCliente = (body) =>
  apiHttp('POST', `${ClienteSave}`, body)

export const editCliente = (id, body) =>
  apiHttp('PUT', `${ClienteSave}/${id}`, body)

export const getCliente = () =>
  apiHttp('GET', `${ClientePath}`)

  export const deleteCliente = (body) => 
  apiHttp('DELETE', `${ClientePath}`, body)
