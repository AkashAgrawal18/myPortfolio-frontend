import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="py-5 mfooter">
        <div className="container pb-4">
            <div className="row g-xl-5 g-lg-4 g-4 justify-content-between">
                <div className="col-xl-4 col-lg-5 col-md-8 col-12">
                    <span> <img src="Images/logo-main1.jpg" alt="" className="w-75" /></span>
                    <p className="mt-lg-1 mt-0 mb-0 text-white">
                        At Myportfolio, we are dedicated to revolutionizing the Corporate
                        industry by delivering
                        top-notch plateform that enhance your portfolio, save you time, and provide unmatched convenience.
                    </p>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-4 col-12">
                    <h3 className="mb-xl-4 mb-lg-4 mb-3 text-warning fw-semibold mt-lg-4 mt-0 text-uppercase">QUICK LINKS</h3>
                    <ul className="list-unstyled ps-2 d-flex flex-column gap-xl-3 gap-lg-4 gap-3">
                        <Link to="/" ><li><span className="text-white fs-6 text-decoration-none">About Us</span></li></Link>
                        {/* <Link to="/login" ><li><span className="text-white fs-6 text-decoration-none">Login</span></li></Link> */}
                        {/* <Link to="/booking" ><li><span className="text-white fs-6 text-decoration-none">Booking</span></li></Link> */}
                        {/* <Link to="/faq" ><li><span className="text-white fs-6 text-decoration-none">FAQs</span></li></Link> */}
                        {/* <Link to="/" ><li><span className="text-white fs-6 text-decoration-none">Account</span></li></Link> */}
                        {/* <Link to="/contact_us" ><li><span className="text-white fs-6 text-decoration-none">Contact</span></li></Link> */}
                    </ul>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                    <h3 className="mb-xl-4 mb-lg-4 mb-3 text-warning fw-semibold mt-lg-4 mt-0 text-uppercase">Contact us Here
                    </h3>
                    <ul className="list-unstyled ps-2 d-flex flex-column gap-xl-3 gap-lg-4 gap-3">
                        <li><span className="text-white fs-6 text-decoration-none">+91 8817125907</span>
                        </li>
                        <li><span className="text-white fs-6 text-decoration-none">info.myportfolio@gmail.com</span>
                        </li>
                        <li><span className="text-white fs-6 text-decoration-none">Myportfolio, junwani chowk, in front of smriti nagar police chowki, smriti nagar, bhilai, 490020
                        </span>
                        </li>
                        <li className=" text-white">
                            <span className="text-white fs-6 text-decoration-none">Terms &amp;
                                Conditions</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span className="text-white fs-6 text-decoration-none">Privacy Policy</span>
                        </li>
                        <li className=" text-white">
                            <span className="text-white fs-6 text-decoration-none">Refund Policy</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span className="text-white fs-6 text-decoration-none">Transportation Policy</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="container border-top border-warning border-1">
            <div className="row g-4 align-items-center pt-2">
                <div className="col-lg-8 col-12">
                    <p className="m-0 text-white text-lg-start text-md-center text-center">
                        ©2024 all rights reserved by <strong>Myportfolio</strong> |
                        Designed and Managed
                        by <span className="text-white text-decoration-none fw-bold">Akash Agrawal</span>
                    </p>
                </div>
                <div className="col-lg-4 col-12 d-flex justify-content-md-end justify-content-center align-items-center gap-xl-4 gap-3">
                    <span className="h3 m-0 text-warning"><i className="bi bi-linkedin-in"></i></span>
                    <span className="h3 m-0 text-warning"><i className="bi bi-facebook"></i></span>
                    <span className="h3 m-0 text-warning"><i className="bi bi-instagram"></i></span>
                    <span className="h3 m-0 text-warning"><i className="bi bi-youtube"></i></span>
                </div>
            </div>
        </div>
    </footer>
    )
}

export default Footer