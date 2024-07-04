import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication = true}) {
    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate('/login')
        }else if(!authentication && authStatus !== authentication){
            navigate('/')
        }
        setLoader(false);
    },[authStatus,navigate,authentication])

  return loader ? <div className='loadingdiv'>
  <h1 className='text-white p-5'>Loading...</h1>
    </div> : <>{children}</>
}
