import React, { useContext, useEffect } from 'react'
import ContactForm from '../contacts/ContactForm'
import Contacts from '../contacts/Contacts'
import ContactFilter from '../contacts/ContactFilter'
import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'
import AlertContext from '../../context/alert/alertContext'

const Home = () => {
  const authContext = useContext(AuthContext)
  const contactContext = useContext(ContactContext)
  const alertContext = useContext(AlertContext)

  const { error, clearAll } = contactContext
  const { setAlert } = alertContext
  const { loadUser } = authContext

  useEffect(() => {
    if (error === 'Please enter all fields correctly.') {
      setAlert(error, 'danger')
      clearAll()
    }
    // eslint-disable-next-line
  }, [error])

  useEffect(() => {
    loadUser()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  )
}

export default Home
