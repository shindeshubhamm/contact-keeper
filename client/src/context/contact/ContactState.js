import React, { useReducer } from 'react'
import uuid from 'uuid'
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
        id: 1,
        name: 'Shubham Shinde',
        email: 'shubhamshinde.3151@gmail.com',
        phone: '8983493798',
        type: 'personal'
      }, {
        id: 2,
        name: 'Sharvari Shinde',
        email: 'sharvarishinde.ss@gmail.com',
        phone: '9552446351',
        type: 'professional',
      }, {
        id: 3,
        name: 'Rohit Mali',
        email: 'rohitmali242@gmail.com',
        phone: '9370615199',
        type: 'personal'
      }
    ]
  }

  const [state, dispatch] = useReducer(contactReducer, initialState)

  // Add Contact

  // Delete Contact

  // Set Current Contact

  // Clear Current Contact

  // Update Contact

  // Filter Contacts

  // Clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState