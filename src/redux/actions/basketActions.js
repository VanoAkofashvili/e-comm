import {
  BASKET_ITEMS_GET_START,
  BASKET_ITEMS_GET_SUCCESS,
  BASKET_ITEMS_GET_FAIL,
  BASKET_ITEM_DELETE_START,
  BASKET_ITEM_DELETE_SUCCESS,
  BASKET_ITEM_DELETE_FAIL,
  API_URL
} from '../constants'
import axios from "axios";

export const fetchBasketProducts = (userId) => {
  return dispatch => {
    dispatch(fetchBasketItemsStart())
    axios.get(`${API_URL}/basket?userId=${+userId}`)
      .then(({ data }) => dispatch(fetchBasketItemsSuccess(data)))
      .catch(error => dispatch(fetchBasketItemsError(error)))
  }
}

export const deleteBasketItem = (product) => {
  return dispatch => {
    dispatch(deleteProductStart())
    axios.delete(`${API_URL}/basket/${product.id}`)
      .then(() => {
        dispatch(deleteProductSuccess())
        dispatch(fetchBasketProducts(product.userId))
      })
      .catch((error) => dispatch(deleteProductFail(error)))
  }
}

// deleting
const deleteProductStart = () => ({
  type: BASKET_ITEM_DELETE_START
})

const deleteProductSuccess = () => ({
  type: BASKET_ITEM_DELETE_SUCCESS
})

const deleteProductFail = (error) => ({
  type: BASKET_ITEM_DELETE_FAIL,
  error
})

// fetching
const fetchBasketItemsStart = () => ({
  type: BASKET_ITEMS_GET_START
})

const fetchBasketItemsSuccess = (products) => ({
  type: BASKET_ITEMS_GET_SUCCESS,
  products
})

const fetchBasketItemsError = (error) => ({
  type: BASKET_ITEMS_GET_FAIL,
  error
})