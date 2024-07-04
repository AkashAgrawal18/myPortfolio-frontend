import React, { useEffect, useState } from 'react'
import { getReq } from "../apis/auth.js";
import { useSelector } from 'react-redux';
import { serverUserImage } from '../imageUrl.js';
import { Link, useParams } from 'react-router-dom';
import { dateMMYYYY } from '../utills/dateFormat.js';

const Resume = () => {
    const { userName } = useParams()
    const currentuserData = useSelector((state) => state.auth.userData);
    //  console.log(currentuserData.username);
    const [loading, setLoading] = useState(true)
    const [userNameId, setUserNameId] = useState(userName)
    const [userData, setUserData] = useState({
        fullName: "",
        username: "",
        profession: "",
        email: "",
        mobile: "",
        altMobile: "",
        softSkills: [],
        language: [],
        skills: [],
        education: [],
        experience: [],
        social: [],
        description: "",
        address: "",
        avatar: "images/user-default.png",
        coverImage: "images/imagedefault.png",

    });
    // console.log(userName);
    useEffect(() => {
        if (userName != undefined && userName != '' && userName != null) {
            setUserNameId(userName);
        } else {
            setUserNameId(currentuserData?.username);
        }

        getReq('users/detail', {
            params: {
                username: userNameId
            }
        })
            .then((neData) => {
                if (neData.success) {
                    const userProData = neData.data;
                    setUserData(userProData)
                }
            })
            .finally(() => {
                setLoading(false)
                // setTimeout(window.print(), 3000);
            });

    }, [userNameId, currentuserData])

    return !loading ? (

        <article className="resume-wrapper text-center position-relative printablediv">
            <div className="resume-wrapper-inner mx-auto text-left bg-white shadow-lg">
                <div className="resume-body">
                    <div className="row w-100">

                        <div className="col-3 resumeleftside">
                            <section className="resume-section profile-image mb-2">
                                <div className="media flex-column flex-md-row text-center">
                                    {userData.avatar ? (<img src={`${serverUserImage}/${userData.avatar}`} alt="image"
                                        border="0" width="180" height="180" />) : (<img src={userData.avatar} alt="image"
                                            border="0" width="180" height="180" />)}
                                    {/* <img className="mr-3 img-fluid picture mx-auto" src="assets/images/фотощька.jpg" alt=""/> */}

                                </div>
                            </section>

                            <section className="resume-section skills-section mb-2">
                                <h2 className="resume-section-title">Skills</h2>
                                <div className="resume-section-content">
                                    <div className="resume-skill-item">
                                        <h4 className="resume-skills-cat fw-bold">Programming Languages</h4>
                                        <ul className="list-unstyled mb-4">

                                            {userData.skills?.map((skillitm) => (
                                                <li className="mb-2" key={skillitm._id}>
                                                    <div className="resume-skill-name">{skillitm.title}</div>
                                                    <div className="progress resume-progress">
                                                        <div className="progress-bar theme-progress-bar-dark" role="progressbar"
                                                            style={{ width: `${skillitm.rating}%` }} aria-valuenow={skillitm.rating} aria-valuemin="0"
                                                            aria-valuemax="100"></div>
                                                    </div>
                                                </li>
                                            ))}

                                        </ul>
                                    </div>

                                    <div className="resume-skill-item">
                                        <h4 className="resume-skills-cat fw-bold">Soft Skills</h4>
                                        <ul className="list-inline">
                                            {userData.softSkills?.map((softskl) => (
                                                <li className="list-inline-item" key={softskl}><span className="badge badge-light">{softskl}</span>
                                                </li>
                                            ))}

                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* <section className="resume-section reference-section mb-2">
                                <h2 className="resume-section-title">Awards</h2>
                                <div className="resume-section-content">
                                    <ul className="list-unstyled resume-awards-list">
                                        <li className="mb-2 pl-4 position-relative">
                                            <i className="resume-award-icon fas fa-trophy position-absolute"
                                                data-fa-transform="shrink-2"></i>
                                            <div className="resume-award-name">Employee of Month</div>
                                            <div className="resume-award-desc">3-4 time win Employee of Month</div>
                                        </li>

                                    </ul>
                                </div>
                            </section> */}

                            <section className="resume-section language-section mb-2">
                                <h2 className="resume-section-title">Languages
                                </h2>
                                <div className="resume-section-content">
                                    <ul className="list-unstyled resume-lang-list">
                                        {
                                            userData.language && userData.language.map((item) => {
                                                return (<li className="list-inline-item" key={item}><span className="badge badge-light">{item}</span></li>)
                                            })
                                        }

                                    </ul>
                                </div>
                            </section>

                            {/* <section className="resume-section interests-section mb-2">
                                <h2 className="resume-section-title">Interest</h2>
                                <div className="resume-section-content">
                                    <ul className="list-unstyled">
                                        <li className="mb-1">Cricket</li>
                                        <li className="mb-1">Exploring New Things</li>
                                        <li className="mb-1">Traveling</li>
                                    </ul>
                                </div>
                            </section> */}

                        </div>

                        <div className="col-9 resumerightside">

                            <section className="resume-section profile-section mb-2">
                                {/* <div className="media-body d-flex flex-row mx-auto mx-lg-0 justify-content-between">
                                    <div className="primary-info"> */}
                                <div className="row">
                                    <div className="col-7">
                                        <h1 className="main-name">{userData.fullName}</h1>
                                        <div className="main-prof">{userData.profession}</div>
                                        <ul className="list-unstyled">
                                            <li className="mb-0"><i className="bi bi-envelope-at-fill me-2"></i>{userData.email}</li>
                                            <li><i className="bi bi-phone me-2"></i>+91 {userData.mobile}{userData.altMobile ? `,${userData.altMobile}` : null}</li>
                                        </ul>
                                    </div>
                                    <div className="col-5">
                                        <ul className="resume-social list-unstyled mt-4 pt-2">
                                            {userData.social?.map((item, index) => <Link to='#' onClick={() => window.open(`https://${item.link}`, '_blank')} className='text-decoration-none text-dark' key={index}><li className="mb-1"><i className={`bi bi-${item.title.toLowerCase()} me-2`}></i>{item.link}</li></Link>)}

                                        </ul>
                                    </div>
                                </div>

                                {/* </div> */}
                                {/* <div className="secondary-info ml-auto mt-2 "> */}

                                {/* </div> */}
                                {/* </div> */}
                            </section>

                            <section className="resume-section summary-section mb-3">
                                <h2 className="resume-section-title">Summary</h2>
                                <div className="resume-section-content">
                                    <p className="resum-par">{userData.description}</p>
                                </div>
                            </section>

                            <section className="resume-section experience-section mb-3">
                                <h2 className="resume-section-title">Experience</h2>
                                <div className="resume-section-content">
                                    <div className="resume-timeline position-relative">
                                        {userData.experience?.map((item) => (
                                            <article className="resume-timeline-item position-relative pb-0" key={item._id}>

                                                <div className="resume-timeline-item-header mb-1">
                                                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-baseline">
                                                        <h3 className="resume-position-title">{`${item.designation} ${item.title}`}</h3>
                                                        <div className="resume-position-time">{dateMMYYYY(item.startOn)} - {dateMMYYYY(item.exitOn)}</div>
                                                    </div>
                                                    <div className="resume-company-name ml-auto">
                                                        <i className="bi bi-bank2"></i> {item.companyName} <i className="bi bi-geo-alt-fill ms-2"></i>{item.companyLocation}
                                                    </div>

                                                </div>
                                                <div className="resume-timeline-item-desc">
                                                    <ul className='mb-1'>
                                                        {item.description?.map((des, index) => <li className='resum-par' key={index}>{des.points}</li>)}
                                                    </ul>
                                                </div>

                                            </article>
                                        ))}


                                    </div>


                                </div>
                            </section>

                            <section className="resume-section experience-section mb-2">
                                <h2 className="resume-section-title">Education</h2>
                                <div className="resume-section-content">
                                    <div className="resume-timeline position-relative">
                                        {userData.education?.map((item) => (
                                            <article className="resume-timeline-item position-relative pb-0" key={item._id}>

                                                <div className="resume-timeline-item-header mb-1">
                                                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-baseline">
                                                        <h3 className="resume-position-title">{item.degree}</h3>
                                                        <div className="resume-position-time">{dateMMYYYY(item.startOn)} - {dateMMYYYY(item.completedOn)}</div>

                                                    </div>

                                                </div>
                                                <div className="resume-company-name ml-auto">
                                                    <i className="bi bi-mortarboard-fill"></i> {item.universityName} <i className="bi bi-geo-alt-fill ms-2"></i>{item.universityLocation}
                                                </div>
                                                <div className="resume-timeline-item-desc">
                                                    <p className='resum-par'> {item.description} </p>
                                                </div>

                                            </article>
                                        ))}

                                    </div>

                                </div>
                            </section>
                        </div>

                    </div>
                </div>


            </div>
        </article>

    ) : <div className='loadingdiv'>
        <h1 className='text-white p-5'>Loading...</h1>
    </div>
}

export default Resume