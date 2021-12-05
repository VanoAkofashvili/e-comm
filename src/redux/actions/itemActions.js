import {
  ADD_PRODUCT_START,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  OPEN_ADD_PRODUCT_MODAL,
  CLOSE_ADD_PRODUCT_MODAL,
  DELETE_PRODUCT_START,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  EDIT_PRODUCT_START,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  SET_NOW_EDITING,
  API_URL
} from "../constants";
import axios from "axios";
import {notification} from "antd";

export const editProduct = (id, newInfo) => {
  return (dispatch) => {
    dispatch(editProductStart())
    // console.log(newInfo)
    axios
      .put(`${API_URL}/products/${id}`, newInfo)
      .then(response => {
        dispatch(editProductSuccess())
      })
      .catch(error => {
        dispatch(editProductError())
        console.log(error)
      })
  }
}

export const setNowEditing = (product) => ({
  type: SET_NOW_EDITING,
  product
})

const editProductStart = () => ({
  type: EDIT_PRODUCT_START
})

const editProductSuccess = () => ({
  type: EDIT_PRODUCT_SUCCESS
})

const editProductError = (error) => ({
  type: EDIT_PRODUCT_FAIL,
  error
})

export const deleteProduct = (id) => {
  return dispatch => {
    dispatch(deleteProductStart())
    axios
      .delete(`${API_URL}/products/${id}`)
      .then(response => {
        dispatch(deleteProductSuccess())
        notification.success({
          message: 'The product was deleted'
        })
      })
      .catch(error => {
        dispatch(deleteProductError(error))
        notification.error({
          message: 'Unable to delete product, please try again later!'
        })
      })
  }
}

const deleteProductStart = () => ({
  type: DELETE_PRODUCT_START
})

const deleteProductError = (error) => ({
  type: DELETE_PRODUCT_FAIL,
  error
})

const deleteProductSuccess = () => ({
  type: DELETE_PRODUCT_SUCCESS
})

export const addProduct = (productInfo) => {
  return dispatch => {
    dispatch(addProductStart())
    return axios
      .post(`${API_URL}/products`, productInfo)
      .then(response => {
        dispatch(addProductSuccess())
      })
      .catch(error => {
        dispatch(addProductError(error));
      })
  }
}


const addProductStart = () => ({
  type: ADD_PRODUCT_START
})

const addProductSuccess = () => ({
  type: ADD_PRODUCT_SUCCESS
})

const addProductError = (error) => ({
  type: ADD_PRODUCT_FAIL,
  error
})

export const openAddProductModal = () => ({
  type: OPEN_ADD_PRODUCT_MODAL
})

export const closeAddProductModal = () => ({
  type: CLOSE_ADD_PRODUCT_MODAL
})

