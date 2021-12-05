import axios from 'axios'
import {
    FETCH_REVIEW_START,
    FETCH_REVIEW_SUCCESS,
    FETCH_REVIEW_FAIL,
    ADD_REVIEW_START,
    ADD_REVIEW_SUCCESS,
    ADD_REVIEW_FAIL,
    UPDATE_REVIEW_START,
    UPDATE_REVIEW_SUCCESS,
    UPDATE_REVIEW_FAIL,
    DELETE_REVIEW_START,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    TOGGLE_EDIT_SUCCESS,
    TOGGLE_EDIT_FAIL,
    API_URL
} from '../constants'

export const fetchReviews = (id) =>  {
    return dispatch => {
        dispatch(fetchReviewsStart())
        axios
            .get(`${API_URL}/reviews?prodId=${id}`)
            .then(({data}) => {
                dispatch(fetchReviewsSuccess(data))
            })
            .catch(error => dispatch(fetchReviewsFail(error)))
    }
}

export const addReview = (review) => {
    return dispatch => {
        dispatch(addReviewStart())
        axios
            .post(`${API_URL}/reviews`, review)
            .then(({data}) => {
                dispatch(addReviewSuccess(data))
            })
            .catch(error => dispatch(addReviewFail(error)))
    }
}

export const updateReview = (newReview) => {
    return dispatch => {
        dispatch(updateReviewStart())
        axios
            .put(`${API_URL}/reviews/${newReview.id}`, newReview)
            .then(() => {
                dispatch(updateReviewSuccess(newReview))
                dispatch(toggleEditMode(newReview))
            })
            .catch(error => dispatch(updateReviewFail(error)))
    }
}

export const deleteReview = (id) => {
    return dispatch => {
        dispatch(deleteReviewStart())
        axios
            .delete(`${API_URL}/reviews/${id}`)
            .then(() => dispatch(deleteReviewSuccess(id)))
            .catch(error => dispatch(deleteReviewError(error)))
    }
} 

export const toggleEditMode = (review) => {
    const newReview = {...review, isEditing: !review.isEditing}
    return dispatch => {
        axios
            .put(`${API_URL}/reviews/${newReview.id}`, newReview)
            .then(({ data }) => dispatch(toggleEditSuccess(data)))
            .catch(error => toggleEditFail(error))
    }
}

// fetch
const fetchReviewsStart = () => ({
    type: FETCH_REVIEW_START
})

const fetchReviewsSuccess = (reviews) => ({
    type: FETCH_REVIEW_SUCCESS,
    reviews
})

const fetchReviewsFail = (error) => ({
    type: FETCH_REVIEW_FAIL,
    error
})

// add

const addReviewStart = () => ({
    type: ADD_REVIEW_START
})

const addReviewSuccess = (review) => ({
    type: ADD_REVIEW_SUCCESS,
    review
})

const addReviewFail = (error) => ({
    type: ADD_REVIEW_FAIL,
    error
})

// update
const updateReviewStart = () => ({
    type: UPDATE_REVIEW_START
})

const updateReviewSuccess = (newReview) => ({
    type: UPDATE_REVIEW_SUCCESS,
    newReview,
})

const updateReviewFail = (error) => ({
    type: UPDATE_REVIEW_FAIL,
    error
}) 

// delete
const deleteReviewStart = () => ({
    type: DELETE_REVIEW_START
})

const deleteReviewSuccess = (reviewId) => ({
    type: DELETE_REVIEW_SUCCESS,
    reviewId
})

const deleteReviewError = (error) => ({
    type: DELETE_REVIEW_FAIL,
    error
})

// toggle editing mode
const toggleEditSuccess = (newReview) => ({
    type: TOGGLE_EDIT_SUCCESS,
    newReview
})
const toggleEditFail = (error) => ({
    type: TOGGLE_EDIT_FAIL,
    error
})