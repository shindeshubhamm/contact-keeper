import React, { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types'

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        _id: 1,
        name: 'Shubham Shinde',
        email: 'shubhamshinde.3151@gmail.com',
        phone: '8983493798',
        type: 'personal'
      }, {
        _id: 2,
        name: 'Sharvari Shinde',
        email: 'sharvarishinde.ss@gmail.com',
        phone: '9552446351',
        type: 'professional',
      }, {
        _id: 3,
        name: 'Rohit Mali',
        email: 'rohitmali242@gmail.com',
        phone: '9370615199',
        type: 'personal'
      }
    ],
    current: null,
    filtered: null
  }

  const [state, dispatch] = useReducer(contactReducer, initialState)

  // Add Contact
  const addContact = (contact) => {
    contact._id = uuidv4()
    dispatch({
      type: ADD_CONTACT,
      payload: contact
    })
  }

  // Delete Contact
  const deleteContact = (_id) => {
    dispatch({
      type: DELETE_CONTACT,
      payload: _id
    })
  }

  // Set Current Contact
  const setCurrent = contact => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    })
  }

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    })
  }

  // Update Contact
  const updateContact = (contact) => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact
    })
  }

  // Filter Contacts
  const filterContacts = (text) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text
    })
  }

  // Clear Filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    })
  }

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState