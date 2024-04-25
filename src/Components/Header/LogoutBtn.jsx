import React, { useState } from 'react'

import { useDispatch } from 'react-redux';
import authService from '../../apis/auth.js'
// import axios from 'axios';
import { logout } from '../../store/authSlice'
import ModalDialog from '../ModalDialog.jsx';

const LogoutBtn = () => {

  const dispatch = useDispatch()
  const [modalShow, setModalShow] = useState(false)
  const logoutHandler = async () => {
    const logot = authService.logout();
    if (logot) {
      dispatch(logout());
      return logot;
    }

  }

  return (<>
    <button onClick={() => {
      setModalShow(true)
    }} className='btn loginbtn rounded-4 d-lg-inline-block d-none'>Logout</button>
    <ModalDialog
      title="Are You Sure?"
      status="warning"
      msg="Are you sure? You want to Logout"
      btnText="NO"
      btnText2="YES"
      btn2func={logoutHandler}
      show={modalShow}
      onHide={() => setModalShow(false)}
    />
  </>
  )
}

export default LogoutBtn