import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input } from './index'
import { useDispatch } from 'react-redux'
// import axios from 'axios';
import authService, { getReq } from "../apis/auth.js"
import { useForm } from 'react-hook-form'
import ModalDialog from './ModalDialog.jsx'

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [modalShow, setModalShow] = useState(false)
    const [modalData, setModalData] = useState({ title: "", msg: "", status: ""})
   
    const login = async (data) => {
       
        try {
            const session = await authService.login(data)
            // console.log(session);
            if (session.data.success == true) {
                const usData = await getReq('users/current-user')
                // console.log(usData);
                if (usData.success == true) {
                    dispatch(authLogin(usData.data));
                    setModalData({title:'Login Success',msg:usData.message || 'Login Successfully',status:'success'});
                    setModalShow(true);
                    setTimeout(function() {
                        navigate("/")
                      }, 1000);
                   
                }
            }else {
                setModalData({title:'Error',msg:session.data.message || 'Somthing Went Worng',status:'error'});
                setModalShow(true);
                setTimeout(function() {
                    setModalShow(false);
                  }, 4000);
                
            }
        } catch (error) {
            // console.log(error);
            setModalShow(true);
            setModalData({title:'Error',msg:session.data.message || 'Somthing Went Worng',status:'error'});
           
        }
    }

    return (

        <section className="signIn py-5 bg-dark">
            <div className="signupdiv">
                <div className="row py-5">

                    <div className="col-12 col-lg-6 text-center ">
                        <figure><img src="images/signin-image.jpg" alt="sing up image" /></figure>
                        <Link to="/signup" className="signup-image-link text-dark">Create an Account</Link>
                    </div>

                    <div className="col-12 col-lg-6 signup-form p-3 text-center">
                        <h2 className="form-title mb-4 fw-bold fs-2">Sign In</h2>

                        <form method="POST" onSubmit={handleSubmit(login)} className="register-form px-5" id="register-form">

                            <Input
                                type="email"
                                placeholder="Enter your Email"
                                className="loginput mb-4"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                    }
                                })}
                            />
                            <Input

                                type="password"
                                placeholder="Enter your password"
                                className="loginput mb-4"
                                {...register("password", {
                                    required: true,
                                })}
                            />


                            {/* <div className="form-group">
                                <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                                <label for="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in <a href="#" className="term-service">Terms of service</a></label>
                            </div> */}
                            <div className="form-group form-button">
                                <Button
                                    type="submit"
                                    className="btn-dark mt-4"
                                >Sign in</Button>

                            </div>
                        </form>
                    </div>

                </div>
            </div>
            <ModalDialog
                title={modalData.title}
                status={modalData.status}
                msg={modalData.msg}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </section>

    )
}

export default Login