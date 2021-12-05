import {
  PRODUCTS_FETCH_START,
  PRODUCTS_FETCH_SUCCESS,
  PRODUCTS_FETCH_FAIL,
  PRODUCTS_SET_CATEGORY,
  SET_TOTAL_COUNT,
  API_URL
} from "../constants";
import axios from "axios";

const per_page = 10;
const limit = 10;


export const fetchProducts = (category = "", filters = {}, sort_by = null, page = 1) => {

  let url = `${API_URL}/products?_start=${(page - 1) * per_page}&_limit=${limit}`;
  if (category) {
    url += `&category=${category}`;
  }

  // hardcoded, should be dynamic
  if (filters && Object.keys(filters).length) {
    for (const filter in filters) {
      url += `&${filter}=${filters[filter]}`
    }
    console.log(url, 'URL');
  }

  switch (sort_by) {
    case 'price':
      url += `&_sort=${sort_by}`
      break;
    case 'relevance':
      url += `&_sort=id&_order=desc`;
      break;
    default:
      url += `&_sort=id&_order=desc`;
  }

  return (dispatch) => {
    dispatch(fetchProductsStart())
    axios.get(url)
      .then(response => {
        dispatch(fetchProductsSuccess(response.data))
        dispatch(setTotalCount(+response.headers["x-total-count"]));
      })
      .catch(error => {
        dispatch(fetchProductsError(error));
      })
  }
}

export const setTotalCount = (count) => ({
  type: SET_TOTAL_COUNT,
  count
})

export const setCurrentCategory = (category) => ({
  type: PRODUCTS_SET_CATEGORY,
  category
})

export const fetchProductsStart = () => ({
  type: PRODUCTS_FETCH_START
})

export const fetchProductsSuccess = (products) => ({
  type: PRODUCTS_FETCH_SUCCESS,
  products
})

export const fetchProductsError = (error) => ({
  type: PRODUCTS_FETCH_FAIL,
  error
})


