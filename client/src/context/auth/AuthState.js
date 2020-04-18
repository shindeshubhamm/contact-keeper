import React, { useReducer } from 'react'
import axios from 'axios'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import setAuthToken from '../../utils/setAuthToken'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_ERRORS,
  CLEAR_LOGOUT
} from '../types'

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
    msg: null
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState)

  // Load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    try {
      const res = await axios.get('/api/auth')
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    } catch (e) {
      dispatch({
        type: AUTH_ERROR
      })
    }
  }

  // Register user
  const register = async formData => {
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/api/users', formData, config)

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
      loadUser()
    } catch (e) {
      dispatch({
        type: REGISTER_FAIL,
        payload: e.response.data.error
      })
    }

  }

  // Login user
  const login = async formData => {
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/api/auth', formData, config)

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      loadUser()
    } catch (e) {
      dispatch({
        type: LOGIN_FAIL,
        payload: e.response.data.error
      })
    }

  }

  // Logout user
  const logout = async () => {
    try {
      const res = await axios.post('/api/auth/logout')
      dispatch({
        type: LOGOUT,
        payload: res.data.msg
      })
    } catch (e) {
      // even though it is logout error, you have to clear data to avoid any potential risk.
      dispatch({
        type: LOGOUT,
        payload: 'Internal server error.'
      })
    }
  }

  const clearLogout = () => {
    dispatch({
      type: CLEAR_LOGOUT
    })
  }

  // Clear errors
  const clearErrors = () => dispatch({
    type: CLEAR_ERRORS
  })

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        msg: state.msg,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
        clearLogout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
