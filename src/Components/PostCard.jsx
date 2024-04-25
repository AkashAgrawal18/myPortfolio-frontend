import React, { useCallback, useEffect, useState } from 'react'
// import AuthService from "../apis/auth.js"
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { serverUserImage } from '../imageUrl';
import Button from './Button';
import ModalDialog from './ModalDialog';

function PostCard({ id, title, image, shortDesc, owner, domain, created_at, status }) {

  const userData = useSelector((state) => state.auth.userData);
  const [myproject, setMyproject] = useState(false);
  const [modalShow, setModalShow] = useState(false)
  const [modalData, setModalData] = useState({ title: "", msg: "", status: "", btnText: "", btnText2: "", btn2func: "" })

  useEffect(() => {
    if (userData?._id == owner?._id) {
      setMyproject(true);
    } else {
      setMyproject(false);
    }

  }, [])

  const deleteProject = useCallback(
    (Id) => () => {
      alert(Id)
      // deleteReq("users/experience", {
      //     params: {
      //         Id: Id
      //     }
      // }).then((data) => {
      //     if (data.success) {
      //         window.location.reload(false);
      //     }
      // }).catch((err) => {
      //     console.log(err);
      // })

    },
    [],
  )

  return (
    <>
      <div className="card postcard">
        <img src={image} alt={title} className="card-img-top w-100" />
        <div className="card-body d-flex flex-column">
          <div className='d-flex justify-content-between mb-2'>
            <span><i className="bi bi-calendar-date"></i> {created_at.toDateString()}</span>
            <span ><i className="bi bi-tags"></i> {domain}</span>
          </div>
          <div className='position-absolute top-0 end-0 pe-2'><span className='badge bg-success p-1'>{status}</span></div>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{shortDesc}</p>

          <div className="row text-start ">
            <div className="col-2">
              <img src={owner.avatar ? `${serverUserImage}/${owner.avatar}` : 'images/user-default.png'} alt={title} className="rounded-5 w-100" />
            </div>
            <Link to={`/user-profile/${owner.username}`} className='col-6 lh-1 text-decoration-none text-dark'>
              <div className='fs-6 fw-bold'>{owner?.fullName}</div>
              <small >{owner?.profession}</small>
            
            </Link>

            {myproject && (<div className="col-4 text-end"><Link to={`/edit-project/${id}`} className="btn btn-primary btn-sm"><i className="bi bi-pencil-square"></i></Link> <button className='btn btn-danger btn-sm' type='button' onClick={() => {
              setModalData({ title: 'Are You Sure?', msg: 'You Want to delete Project?', status: 'warning', btnText: 'NO', btnText2: 'YES', btn2func: id });
              setModalShow(true)
            }}><i className="bi bi-trash"></i></button></div>)}

          </div>

        </div>
      </div>
      <ModalDialog
        title={modalData.title}
        status={modalData.status}
        msg={modalData.msg}
        btnText={modalData.btnText}
        btnText2={modalData.btnText2}
        btn2func={deleteProject(modalData.btn2func)}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
    //     <div className='col-3 bg-light rounded-xl p-4'>
    // <Link to={`/post/${$id}`}>
    //         <div className='w-100 justify-center mb-4'>
    //             <img src={image} alt={title}
    //             className='rounded-xl w-100' />

    //         </div>
    //         <h2
    //         className='text-xl font-bold'
    //         >{title}</h2>
    // </Link>
    //     </div>
  )
}


export default PostCard