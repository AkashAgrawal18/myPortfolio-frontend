import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import authService, { deleteReq, getReq } from "../apis/auth.js";
import ExperienceForm from '../Components/ExperienceForm.jsx';
import { Container } from '../Components';
import { dateMMYYYY } from '../utills/dateFormat.js';
import ModalDialog from '../Components/ModalDialog.jsx';

const Experience = () => {

    const { experienceId } = useParams()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalShow, setModalShow] = useState(false)
    const [modalData, setModalData] = useState({ title: "", msg: "", status: "", btnText: "", btnText2: "", btn2func: "" })

    // console.log(experienceId)
    useEffect(() => {
        getReq('users/current-user').then((postdata) => {
            if (postdata) {
                setPosts(postdata.data.experience)
            }
        }).finally(() => setLoading(false));
    }, [posts])


    const deleteExperience = useCallback(
        (Id) => () => {

            deleteReq("users/experience", { params: { Id } })
                .then((data) => {
                    if (data.success) {
                        // window.location.reload(false);
                        setPosts(posts.filter(post => post._id !== Id));
                        setModalShow(false)
                    }
                }).catch((err) => {
                    console.log(err);
                })

        },
        [],
    )

    return !loading ? (
        <div className='py-8'>
            <Container>
                <div className='row py-5  d-flex flex-column-reverse flex-md-row'>

                    <h4 className='text-white'> My Experience List</h4>
                    <div className="col-12 col-md-6 experienceListDiv">
                        {
                            posts.length > 0 ? (
                                <div className="row g-0 g-md-3 w-100 text-center">
                                    {posts.map((item, index) => {
                                        return (

                                            <div className="col-12 mb-3" key={index}>
                                                <div className="card ">
                                                    <div className="card-header border-0 d-flex align-item-center justify-content-between">
                                                        <h5 className="card-title me-2">{item.title}</h5>
                                                        <h6 >{item.designation}</h6>
                                                    </div>
                                                    <div className="card-body pt-0">
                                                        <div className="widget">
                                                            <div className="d-flex align-item-center justify-content-between">

                                                                <div className="widget-head d-flex flex-column text-start">
                                                                    <span className="widget-title">{item.companyName}</span>
                                                                    <span className="widget-time">{dateMMYYYY(item.startOn)} - {dateMMYYYY(item.exitOn)}</span>
                                                                </div>
                                                                <div className="widget-head d-flex flex-column">
                                                                    <span className="widget-title">{item.companyLocation}</span>
                                                                </div>
                                                            </div>
                                                            <ul className="widget-points text-start">
                                                                {item.description.map((des, indexx) => {
                                                                    return (<li className="widget-item" key={indexx} ><span>{des.points}</span></li>)
                                                                })}

                                                            </ul>
                                                            <div className="widget-action text-end">
                                                                <Link to={`/edit-experience/${item._id}`} className="btn btn-primary btn-sm"><i className="bi bi-pencil-square"></i></Link>
                                                                <button className='btn btn-danger btn-sm' type='button' onClick={() => {
                                                                    setModalData({ title: 'Are You Sure?', msg: 'You Want to delete Experience Detail?', status: 'warning', btnText: 'NO', btnText2: 'YES', btn2func: item._id });
                                                                    setModalShow(true)
                                                                }} ><i className="bi bi-trash"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        )
                                    })}


                                </div>
                            ) : (
                                <div className='loadingdiv'>
                                    <h1 className='text-white p-5'>No Data Found</h1>
                                </div>
                            )
                        }
                        <ModalDialog
                            title={modalData.title}
                            status={modalData.status}
                            msg={modalData.msg}
                            btnText={modalData.btnText}
                            btnText2={modalData.btnText2}
                            btn2func={deleteExperience(modalData.btn2func)}
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        {experienceId == '' || experienceId == undefined || experienceId == null ? <ExperienceForm /> : <ExperienceForm experienceId={experienceId} />}
                    </div>
                </div>
            </Container>

        </div>
    ) :
        <div className='loadingdiv'>
            <h1 className='text-white p-5'>Loading...</h1>
        </div>

}

export default Experience