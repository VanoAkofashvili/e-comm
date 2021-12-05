import axios from "axios"
import {
    API_URL,
    DELETE_USER_SUCCESS,
    GET_USERS_SUCCESS
} from '../constants'

const apiUrl = API_URL

export const getUsers = () => {
    return dispatch => {
        axios
            .get("http://localhost:3001/users")
            .then(({ data }) => {
                const users = data.map((user, key) => {
                    const { password, ...rest} = user
                    return {...rest, key}
                })
                dispatch(getUsersSuccess(users))
            })
            .catch(error => console.log(error))
    }
}

export const deleteUser = (user) => {
    return dispatch => {
        axios
            .delete(`${apiUrl}/users/${user.id}`)
            .then(() => dispatch(deleteUserSuccess(user.id)))
            .catch(error => console.log(error))
    }
}

const getUsersSuccess = (users) => ({
    type: GET_USERS_SUCCESS,
    users
})

const deleteUserSuccess = (id) => ({
    type: DELETE_USER_SUCCESS,
    id
})