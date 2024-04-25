import React, { useEffect, useState } from 'react'
import '../assets/webview.css';
import HNavbar from '../Components/FrontSite/HNavbar';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authService from "../apis/auth.js";
import { serverUserImage } from '../imageUrl.js';
import { dateMMYYYY } from '../utills/dateFormat.js';

const PortFollioSite = () => {

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
        authService.getUserProfile(userNameId)
            .then((neData) => {
                if (neData) {
                    const userProData = neData.data.data;
                    setUserData(userProData)
                }
            })
            .finally(() => setLoading(false));
        // console.log(userData)
    }, [userNameId, currentuserData])


    return !loading ? (
        <div id="webView">

            <HNavbar />

            <section id="home" className="main-banner parallaxie" style={{ background: `url(${serverUserImage}/${userData.coverImage}) center -7.04px / cover no-repeat fixed` }} >
                <div className="caption-header text-center wow zoomInDown">
                    <h4>Welcome, </h4>
                    <h1> i'm {userData.fullName}</h1>
                    <div className='badge'> {userData.profession}</div>

                </div>
            </section>

            <section id="about" className="section wb theme-red">

                <div className="p-5 dark-theme">
                    <div className="row">
                        <div className="col-lg-4 py-3">
                            <div className="img-place wow fadeInUp" style={{ visibility: "visible", animationName: "fadeInUp" }}>
                                <img src={`${serverUserImage}/${userData.avatar}`} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 offset-lg-1 wow fadeInRight" style={{ visibility: "visible", animationName: "fadeInRight" }}>
                            <h1 className="fw-light fs-1">{userData.fullName}</h1>
                            <h5 className="fg-theme mb-3 fs-5"> {userData.profession}</h5>
                            <p className="">{userData.description}</p>
                            <ul className="theme-list">
                                {/* <li><b>From:</b> Texas, US</li>
                                <li><b>Lives In:</b> Texas, US</li>
                                <li><b>Age:</b> 25</li>
                                <li><b>Gender:</b> Male</li> */}
                                <li><b>Mobile:</b> {userData.mobile}</li>
                                <li><b>Email:</b> {userData.email}</li>
                                {/* <li><b>Age:</b> 25</li> */}
                                <li><b>Language:</b> {userData.language}</li>
                            </ul>
                            <Link to={`/user-resume/${userData.username}`} className="btn btn-theme-outline">Download CV</Link>
                        </div>
                    </div>
                </div>

                <div className="p-5 dark-theme2">
                    <h1 className="text-center fw-normal wow fadeIn" style={{ visibility: "visible", animationName: "fadeIn" }}>My Skills</h1>
                    <div className="row py-3">
                        {userData.skills?.map((skillitm) => (

                            <div className="col-md-6">
                                <div className="px-lg-3">
                                    <div className="progress-wrapper wow fadeInUp" style={{ visibility: "visible", animationName: "fadeInUp" }} >
                                        <div className='d-flex justify-content-between'>
                                            <span className="caption">{skillitm.title}</span>
                                            <span className="caption text-end">{skillitm.experience}</span>
                                        </div>

                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: `${skillitm.rating}%` }} aria-valuenow={skillitm.rating} aria-valuemin="0" aria-valuemax="100">{skillitm.rating}%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))}



                    </div>
                </div>


                <div className="p-5 dark-theme">
                    <div className="row">
                        <div className="col-md-6 wow fadeInRight" style={{ visibility: "visible", animationName: "fadeInRight" }}>
                            <h2 className="fw-normal">Education</h2>
                            <ul className="timeline mt-4 pr-md-5">
                                {userData.education?.map((item) => (

                                    <li key={item.id}>
                                        <div className="title">{dateMMYYYY(item.startOn)} - {dateMMYYYY(item.completedOn)}</div>
                                        <div className="details">
                                            <h5>{`${item.degree}`}</h5>
                                            <small className="fg-theme"> <i className="bi bi-mortarboard-fill"></i> {item.universityName} <i className="bi bi-geo-alt-fill ms-2"></i>{item.universityLocation}</small>
                                            <p>{item.description}</p>
                                        </div>
                                    </li>

                                )).reverse()}

                            </ul>
                        </div>
                        <div className="col-md-6 wow fadeInRight" data-wow-delay="200ms" style={{ visibility: "visible", animationDelay: "200ms", animationName: "fadeInRight" }}>
                            <h2 className="fw-normal">Experience</h2>
                            <ul className="timeline mt-4 pr-md-5">

                                {userData.experience?.map((item) => (

                                    <li key={item.id}>
                                        <div className="title">{dateMMYYYY(item.startOn)} - {dateMMYYYY(item.exitOn)}</div>
                                        <div className="details">
                                            <h5>{`${item.designation} ${item.title}`}</h5>
                                            <small className="fg-theme"> <i className="bi bi-bank2"></i> {item.companyName} <i className="bi bi-geo-alt-fill ms-2"></i>{item.companyLocation}</small>
                                            <p>{item.description?.map((des) => { return (`${des.points} ,`) })}</p>
                                        </div>
                                    </li>

                                )).reverse()}

                            </ul>
                        </div>
                    </div>
                </div>


            </section>

            <section id="service" className="section wb dark-theme2 theme-red">
                <div className="vg-page page-service">
                    <div className="container">
                        <div className="text-center wow fadeInUp" style={{ visibility: "visible", animationName: "fadeInUp" }}>
                            <div className="badge badge-subhead">Service</div>
                        </div>
                        <h1 className="fw-normal text-center wow fadeInUp" style={{ visibility: "visible", animationName: "fadeInUp" }}>What can i do?</h1>
                        <div className="row mt-5">
                            <div className="col-md-6 col-lg-4 col-xl-3">
                                <div className="card card-service wow fadeInUp" style={{ visibility: "visible", animationName: "fadeInUp" }}>
                                    <div className="icon">
                                        <span className="ti-paint-bucket"></span>
                                    </div>
                                    <div className="caption">
                                        <h4 className="fg-theme">Web Design</h4>
                                        <p>There are many variations of passages of Lorem Ipsum available</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 col-xl-3">
                                <div className="card card-service wow fadeInUp" style={{ visibility: "visible", animationName: "fadeInUp" }}>
                                    <div className="icon">
                                        <span className="ti-search"></span>
                                    </div>
                                    <div className="caption">
                                        <h4 className="fg-theme">SEO</h4>
                                        <p>There are many variations of passages of Lorem Ipsum available</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 col-xl-3">
                                <div className="card card-service wow fadeInUp" style={{ visibility: "visible", animationName: "fadeInUp" }}>
                                    <div className="icon">
                                        <span className="ti-vector"></span>
                                    </div>
                                    <div className="caption">
                                        <h4 className="fg-theme">UI/UX Design</h4>
                                        <p>There are many variations of passages of Lorem Ipsum available</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 col-xl-3">
                                <div className="card card-service wow fadeInUp" style={{ visibility: "visible", animationName: "fadeInUp" }}>
                                    <div className="icon">
                                        <span className="ti-desktop"></span>
                                    </div>
                                    <div className="caption">
                                        <h4 className="fg-theme">Web Development</h4>
                                        <p>There are many variations of passages of Lorem Ipsum available</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="vg-page page-funfact" style={{ backgroundImage: `url(images/bg_banner.jpg)` }}>
                    <div className="container position-relative">
                        <div className="row section-counter">
                            <div className="col-md-6 col-lg-3 py-4 wow fadeIn" style={{ visibility: "visible", animationName: "fadeIn" }}>
                                <h1 className="number" data-number="768">768</h1>
                                <span>Clients</span>
                            </div>
                            <div className="col-md-6 col-lg-3 py-4 wow fadeIn" style={{ visibility: "visible", animationName: "fadeIn" }}>
                                <h1 className="number" data-number="230">230</h1>
                                <span>Project Compleate</span>
                            </div>
                            <div className="col-md-6 col-lg-3 py-4 wow fadeIn" style={{ visibility: "visible", animationName: "fadeIn" }}>
                                <h1 className="number" data-number="97">97</h1>
                                <span>Project Ongoing</span>
                            </div>
                            <div className="col-md-6 col-lg-3 py-4 wow fadeIn" style={{ visibility: "visible", animationName: "fadeIn" }}>
                                <h1 className="number" data-number="699">699</h1>
                                <span>Client Satisfaction</span>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            {/* <div className="vg-page page-portfolio" id="portfolio">
                <div className="container">
                    <div className="text-center wow fadeInUp" style={{ visibility: "visible", animationName: "fadeInUp" }}>
                        <div className="badge badge-subhead">Portfolio</div>
                    </div>
                    <h1 className="text-center fw-normal wow fadeInUp" style={{ visibility: "visible", animationName: "fadeInUp" }}>See my work</h1>
                    <div className="filterable-button py-3 wow fadeInUp" data-toggle="selected" style={{ visibility: "visible", animationName: "fadeInUp" }}>
                        <button className="btn btn-theme-outline selected" data-filter="*">All</button>
                        <button className="btn btn-theme-outline" data-filter=".apps">Apps</button>
                        <button className="btn btn-theme-outline" data-filter=".template">Template</button>
                        <button className="btn btn-theme-outline" data-filter=".ios">IOS</button>
                        <button className="btn btn-theme-outline" data-filter=".ui-ux">UI/UX</button>
                        <button className="btn btn-theme-outline" data-filter=".graphic">Graphic</button>
                        <button className="btn btn-theme-outline" data-filter=".wireframes">Wireframes</button>
                    </div>

                    <div className="gridder my-3" style={{ position: "relative", height: "570.976px" }}>

                        <div className="grid-item apps wow zoomIn" style={{ visibility: "visible", animationName: "zoomIn" }}>
                            <div className="img-place" data-src="images/signin2.jpg" data-fancybox="" data-caption="<h5 class='fg-theme'>Mobile Travel App</h5> <p>Travel, Discovery</p>">
                                <img src="images/signin2.jpg" alt="" />
                                <div className="img-caption">
                                    <h5 className="fg-theme">Mobile Travel App</h5>
                                    <p>Travel, Discovery</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid-item apps wow zoomIn" style={{ visibility: "visible", animationName: "zoomIn" }}>
                            <div className="img-place" data-src="images/signin2.jpg" data-fancybox="" data-caption="<h5 class='fg-theme'>Mobile Travel App</h5> <p>Travel, Discovery</p>">
                                <img src="images/signin2.jpg" alt="" />
                                <div className="img-caption">
                                    <h5 className="fg-theme">Mobile Travel App</h5>
                                    <p>Travel, Discovery</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid-item apps wow zoomIn" style={{ visibility: "visible", animationName: "zoomIn" }}>
                            <div className="img-place" data-src="images/signin2.jpg" data-fancybox="" data-caption="<h5 class='fg-theme'>Mobile Travel App</h5> <p>Travel, Discovery</p>">
                                <img src="images/signin2.jpg" alt="" />
                                <div className="img-caption">
                                    <h5 className="fg-theme">Mobile Travel App</h5>
                                    <p>Travel, Discovery</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid-item apps wow zoomIn" style={{ visibility: "visible", animationName: "zoomIn" }}>
                            <div className="img-place" data-src="images/signin2.jpg" data-fancybox="" data-caption="<h5 class='fg-theme'>Mobile Travel App</h5> <p>Travel, Discovery</p>">
                                <img src="images/signin2.jpg" alt="" />
                                <div className="img-caption">
                                    <h5 className="fg-theme">Mobile Travel App</h5>
                                    <p>Travel, Discovery</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid-item apps wow zoomIn" style={{ visibility: "visible", animationName: "zoomIn" }}>
                            <div className="img-place" data-src="images/signin2.jpg" data-fancybox="" data-caption="<h5 class='fg-theme'>Mobile Travel App</h5> <p>Travel, Discovery</p>">
                                <img src="images/signin2.jpg" alt="" />
                                <div className="img-caption">
                                    <h5 className="fg-theme">Mobile Travel App</h5>
                                    <p>Travel, Discovery</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid-item apps wow zoomIn" style={{ visibility: "visible", animationName: "zoomIn" }}>
                            <div className="img-place" data-src="images/signin2.jpg" data-fancybox="" data-caption="<h5 class='fg-theme'>Mobile Travel App</h5> <p>Travel, Discovery</p>">
                                <img src="images/signin2.jpg" alt="" />
                                <div className="img-caption">
                                    <h5 className="fg-theme">Mobile Travel App</h5>
                                    <p>Travel, Discovery</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid-item apps wow zoomIn" style={{ visibility: "visible", animationName: "zoomIn" }}>
                            <div className="img-place" data-src="images/signin2.jpg" data-fancybox="" data-caption="<h5 class='fg-theme'>Mobile Travel App</h5> <p>Travel, Discovery</p>">
                                <img src="images/signin2.jpg" alt="" />
                                <div className="img-caption">
                                    <h5 className="fg-theme">Mobile Travel App</h5>
                                    <p>Travel, Discovery</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid-item apps wow zoomIn" style={{ visibility: "visible", animationName: "zoomIn" }}>
                            <div className="img-place" data-src="images/signin2.jpg" data-fancybox="" data-caption="<h5 class='fg-theme'>Mobile Travel App</h5> <p>Travel, Discovery</p>">
                                <img src="images/signin2.jpg" alt="" />
                                <div className="img-caption">
                                    <h5 className="fg-theme">Mobile Travel App</h5>
                                    <p>Travel, Discovery</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid-item apps wow zoomIn" style={{ visibility: "visible", animationName: "zoomIn" }}>
                            <div className="img-place" data-src="images/signin2.jpg" data-fancybox="" data-caption="<h5 class='fg-theme'>Mobile Travel App</h5> <p>Travel, Discovery</p>">
                                <img src="images/signin2.jpg" alt="" />
                                <div className="img-caption">
                                    <h5 className="fg-theme">Mobile Travel App</h5>
                                    <p>Travel, Discovery</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="text-center wow fadeInUp" style={{ visibility: "visible", animationName: "fadeInUp" }}>
                        <a href="javascript:void(0)" className="btn btn-theme">Load More</a>
                    </div>
                </div>
            </div> */}

            <div id="blog" className="vg-page page-blog dark-theme2 section lb">
                <div className="container">
                    <div className="text-center">
                        <div className="badge badge-subhead wow fadeInUp">Blog</div>
                    </div>
                    <h1 className="text-center fw-normal wow fadeInUp" >Latest Post</h1>

                    <div className="row">
                        <div className="col-md-3 col-12">
                            <div className="post-box">
                                <div className="post-thumb">
                                    <img src="images/photo-2.jpg" className="img-fluid" alt="post-img" />
                                    <div className="date">
                                        <span>06</span>
                                        <span>Aug</span>
                                    </div>
                                </div>
                                <div className="post-info">
                                    <h4>Quisque auctor lectus interdum nisl accumsan venenatis.</h4>
                                    <ul>
                                        <li>by admin</li>
                                        <li>Apr 21, 2018</li>
                                        <li><a href="#"><b> Comments</b></a></li>
                                    </ul>
                                    <p>Etiam materials ut mollis tellus, vel posuere nulla. Etiam sit amet massa sodales aliquam at eget quam. Integer ultricies et magna quis.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-12">
                            <div className="post-box">
                                <div className="post-thumb">
                                    <img src="images/photo-2.jpg" className="img-fluid" alt="post-img" />
                                    <div className="date">
                                        <span>06</span>
                                        <span>Aug</span>
                                    </div>
                                </div>
                                <div className="post-info">
                                    <h4>Quisque auctor lectus interdum nisl accumsan venenatis.</h4>
                                    <ul>
                                        <li>by admin</li>
                                        <li>Apr 21, 2018</li>
                                        <li><a href="#"><b> Comments</b></a></li>
                                    </ul>
                                    <p>Etiam materials ut mollis tellus, vel posuere nulla. Etiam sit amet massa sodales aliquam at eget quam. Integer ultricies et magna quis.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-12">
                            <div className="post-box">
                                <div className="post-thumb">
                                    <img src="images/photo-2.jpg" className="img-fluid" alt="post-img" />
                                    <div className="date">
                                        <span>06</span>
                                        <span>Aug</span>
                                    </div>
                                </div>
                                <div className="post-info">
                                    <h4>Quisque auctor lectus interdum nisl accumsan venenatis.</h4>
                                    <ul>
                                        <li>by admin</li>
                                        <li>Apr 21, 2018</li>
                                        <li><a href="#"><b> Comments</b></a></li>
                                    </ul>
                                    <p>Etiam materials ut mollis tellus, vel posuere nulla. Etiam sit amet massa sodales aliquam at eget quam. Integer ultricies et magna quis.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-12">
                            <div className="post-box">
                                <div className="post-thumb">
                                    <img src="images/photo-2.jpg" className="img-fluid" alt="post-img" />
                                    <div className="date">
                                        <span>06</span>
                                        <span>Aug</span>
                                    </div>
                                </div>
                                <div className="post-info">
                                    <h4>Quisque auctor lectus interdum nisl accumsan venenatis.</h4>
                                    <ul>
                                        <li>by admin</li>
                                        <li>Apr 21, 2018</li>
                                        <li><a href="#"><b> Comments</b></a></li>
                                    </ul>
                                    <p>Etiam materials ut mollis tellus, vel posuere nulla. Etiam sit amet massa sodales aliquam at eget quam. Integer ultricies et magna quis.</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div id="contact" className="vg-page vg-contact">
                <div className="container position-relative">
                    <div className="text-center">
                        <div className="badge badge-subhead wow fadeInUp">Contact</div>
                    </div>
                    <h1 className="text-center fw-normal wow fadeInUp">Contact Me</h1>

                    <div className="row card card-outline-light p-5 mt-5">
                        <div className="col-md-12">
                            <div className="contact_form">
                                <div id="message"></div>
                                <form id="contactForm" name="sentMessage" novalidate="novalidate">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input className="form-control" id="name" type="text" placeholder="Your Name" required="required" data-validation-required-message="Please enter your name." />
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control" id="email" type="email" placeholder="Your Email" required="required" data-validation-required-message="Please enter your email address." />
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control" id="phone" type="tel" placeholder="Your Phone" required="required" data-validation-required-message="Please enter your phone number." />
                                                <p className="help-block text-danger"></p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <textarea className="form-control" rows="5" id="message" placeholder="Your Message" required="required" data-validation-required-message="Please enter a message."></textarea>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="col-lg-12 text-center">
                                            <div id="success"></div>
                                            <button className="btn btn-theme-outline">Send Message</button>
                                            {/* <button id="sendMessageButton" className="sim-btn btn-hover-new" data-text="Send Message" type="submit">Send Message</button> */}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="vg-footer">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <p className="text-center my-3">Copyright ©2020. All right reserved | This template is made with <span className="ti-heart fg-theme-red"></span> by <a href="https://www.macodeid.com/">MACode ID</a></p>
                    </div>
                </div>
            </div>

        </div>
    ) : <div className='loadingdiv'>
        <h1 className='text-white p-5'>Loading...</h1>
    </div>
}

export default PortFollioSite