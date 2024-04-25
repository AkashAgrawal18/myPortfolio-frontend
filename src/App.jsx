
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getReq } from './apis/auth.js';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './Components';
import { Outlet } from 'react-router-dom';


function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    getReq('users/current-user')
      .then((neData) => {
        if (neData.success == true) {
          // console.log(neData);
         const userData = neData.data;
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false));
  }, [])

  return !loading ? (
    <div className='min-h-screen d-flex flex-wrap justify-between bg-gray'>
      <div className='w-100 d-block'>
        <Header />
        <main className='bg-dark'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : 
  <div className='loadingdiv'>
<h1 className='text-white p-5'>Loading...</h1>
  </div>
  // <div className="loadingsec spinner-grow" role="status">
  //   <span className="visually-hidden">Loading...</span>
  // </div>


}

export default App
