import {
  ADD_TO_CART_START,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL
} from "../constants"
import axios from "axios";
import {notification} from "antd";


export const addToCart = (product, user) => {
  const {userId, category, ...rest} = product;

  return dispatch => {
    dispatch(addToCartStart());
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/basket`, {
        userId: user.id,
        product: rest
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
          message: 'Please try again later'
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