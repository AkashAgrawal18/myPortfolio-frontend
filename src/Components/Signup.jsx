import React, { useState } from 'react'
import authService, { getReq } from '../apis/auth.js'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import ModalDialog from './ModalDialog.jsx'

function Signup() {
    const navigate = useNavigate()
    const [modalShow, setModalShow] = useState(false)
    const [modalData, setModalData] = useState({ title: "", msg: "", status: "" })

    const dispatch = useDispatch()
    const { register, formState: { errors }, handleSubmit } = useForm()

    const create = async (data) => {

        try {
            const session = await authService.createAccount(data)
            if (session.data.success == true) {
                const userData = await getReq('users/current-user')
                if (userData.success == true) {
                    dispatch(login({ userData: userData.data }));
                    setModalData({ title: 'SignUp Success', msg: session.data.message || 'User Created Successfully', status: 'success' });
                    setModalShow(true);
                  
                }
            }else {
                setModalData({title:'Error',msg:session.data.message || 'Somthing Went Worng',status:'error'});
                setModalShow(true);
                setTimeout(function() {
                    setModalShow(false);
                  }, 4000);
            }
        } catch (error) {
            setModalData({title:'Error',msg:error.message || 'Somthing Went Worng',status:'error'});
            setModalShow(true);
            setTimeout(function() {
                setModalShow(false);
              }, 4000);
           
        }
    }

    return (

        <section className="signUp py-5 bg-dark">
            <div className="signupdiv">
                <div className="row py-5">

                    <div className="col-12 col-lg-6 signup-form p-3 text-center">
                        <h2 className="form-title mb-4 fw-bold fs-2">Sign Up</h2>

                        <form method="POST" onSubmit={handleSubmit(create)} className="register-form px-2 px-md-5" id="register-form">

                            <Input
                                placeholder="Enter your full name"
                                className="loginput mb-4"
                                {...register("fullName", {
                                    required: "FullName Is Required",
                                })}
                                error={errors?.fullName?.message}
                            />
                            <Input
                                type="number"
                                placeholder="Enter your MobileNo"
                                className="loginput mb-4"
                                {...register("mobile", {
                                    required: "Mobile Number is Required", maxLength: {
                                        value: 10,
                                        message: "Maximum Length is 10"
                                    }, minLength: {
                                        value: 10,
                                        message: "Minimum Length is 10"
                                    }
                                })}
                                error={errors?.mobile?.message}
                            />
                            <Input
                                placeholder="Enter your Username"
                                className="loginput mb-4"
                                {...register("username", {
                                    required: "Username is Required",
                                })}
                                error={errors?.username?.message}
                            />

                            <Input
                                type="email"
                                placeholder="Enter your Email"
                                className="loginput mb-4"
                                {...register("email", {
                                    required: "Email is Required",
                                    validate: {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                    }
                                })}
                                error={errors?.email?.message}
                            />
                            <Input

                                type="password"
                                placeholder="Enter your password"
                                className="loginput mb-4"
                                {...register("password", {
                                    required: "Password is Required", minLength: {
                                        value: 8,
                                        message: "Password Must Content 8 digit atleast"
                                    }
                                })}
                                error={errors?.password?.message}
                            />


                            {/* <div className="form-group">
                        <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                        <label for="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in <a href="#" className="term-service">Terms of service</a></label>
                    </div> */}
                            <div className="form-group form-button">
                                <Button
                                    type="submit"
                                    className="btn-dark mt-4"
                                >Create Account</Button>

                            </div>
                        </form>
                      </div>

                    <div className="col-12 col-lg-6 text-center ">
                        <figure><img src="images/signup-image.jpg" alt="sign up image" /></figure>
                        <Link to="/login" className="signup-image-link text-dark">I am already a member </Link>
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

export default Signup