import {
  ADD_TO_CART_START,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  API_URL
} from "../constants"
import axios from "axios";
import {notification} from "antd";

export const addToCart = (product, user) => {
  const {category, id,  ...rest} = product;
  console.log('user: ', user)
  return dispatch => {
    dispatch(addToCartStart());
    axios
      .post(`${API_URL}/basket`, {
        shipping: (Math.random() * 10).toFixed(2),
        userId: Number(user.sub),
        id: Math.random(), 
        ...rest
      })
      .then(response => {
        dispatch(addToCartSuccess())
        notification.success({
          message: "Added to cart"
        })
      })
      .catch(error => {
        dispatch(addToCartFail(error))
        notification.error({
          message: 'Product has already been added to the cart!'
        })
      })
  }
}


const addToCartStart = () => ({
  type: ADD_TO_CART_START
})

const addToCartSuccess = () => ({
  type: ADD_TO_CART_SUCCESS
})

const addToCartFail = (error) => ({
  type: ADD_TO_CART_FAIL,
  error
})