import {
  ADD_TO_CART_START,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL
} from "../constants"
import axios from "axios";


export const addToCart = (product, user) => {
  const {userId, id, category, ...rest} = product;

  return dispatch => {
    dispatch(addToCartStart());
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/basket`, {
        userId: user.id,
        product: rest
      })
      .then(response => {
        console.log(response, 'ddddd')
        dispatch(addToCartSuccess())
      })
      .catch(error => {
        console.log(error)
        dispatch(addToCartFail(error))
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