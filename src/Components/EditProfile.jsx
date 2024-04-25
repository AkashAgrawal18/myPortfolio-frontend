import React, { useState, useCallback, useEffect } from 'react'
import { useFieldArray, useForm } from "react-hook-form";
import authService, { getReq } from "../apis/auth.js";
import { useNavigate } from "react-router-dom";

import { Form } from 'react-bootstrap';
import Input from './Input';
import Button from './Button';
import { languageOptions, serverUserImage, softSkillOptions, socialMediaOptions } from '../imageUrl.js';
import Select from './Select.jsx';
const EditProfile = () => {
    // const userData = useSelector((state) => state.auth.userData);

    const [userfile, setUserFile] = useState("images/user-default.png")
    const [coverfile, setCoverFile] = useState("images/imagedefault.png")
    const [loading, setLoading] = useState(true)
    const [isSSOpen, setIsSSOpen] = useState(false);
    const [isLGOpen, setIsLGOpen] = useState(false);
    const [skillset, setSkillset] = useState([])
    const [languageset, setLanguageset] = useState([])
    const [userData, setUserData] = useState({
        fullName: "",
        username: "",
        profession: "",
        email: "",
        mobile: "",
        altMobile: "",
        softSkills: [],
        skills: [{ title: '', rating: "", experience: "" }],
        social: [{ title: '', link: "" }],
        language: [],
        description: "",
        address: "",

    });

    const { register, formState: { errors }, handleSubmit, control, setValue } = useForm({
        values: {
            fullName: userData.fullName,
            username: userData.username,
            profession: userData.profession,
            email: userData.email,
            mobile: userData.mobile,
            altMobile: userData.altMobile,
            softSkills: userData.softSkills,
            skills: userData.skills,
            language: userData.language,
            social: userData.social,
            description: userData.description,
            address: userData.address,

        },

    });

    useEffect(() => {
        getReq('users/current-user')
            .then((neData) => {
                if (neData.success == true) {
                    const userProData = neData.data;
                    if (userProData.avatar) {
                        setUserFile(`${serverUserImage}/${userProData.avatar}`)
                    }
                    if (userProData.coverImage) {
                        setCoverFile(`${serverUserImage}/${userProData.coverImage}`)

                    }

                    setUserData({
                        ...userData, fullName: userProData.fullName,
                        username: userProData.username,
                        profession: userProData?.profession,
                        email: userProData.email,
                        mobile: userProData.mobile,
                        altMobile: userProData.altMobile,
                        softSkills: userProData.softSkills,
                        skills: userProData.skills,
                        social: userProData.social,
                        language: userProData.language,
                        description: userProData?.description,
                        address: userProData?.address,
                    })

                    setLanguageset(userProData.language)
                    setSkillset(userProData.softSkills)
                }
            })
            .finally(() => setLoading(false));
    }, [])

    const navigate = useNavigate();

    const submit = async (data) => {
        if (userData) {

            // console.log(data.avatar[0]);
            const avatarFile = data.avatar[0] ? await authService.updateAvatar(data.avatar[0]) : true;
            const coverFile = data.coverImage[0] ? await authService.updateCoverImage(data.coverImage[0]) : true;

            const dbPost = await authService.updateProfile(data);

            if (dbPost && avatarFile && coverFile) {
                navigate(`/`);
            }
        }
    };

    const { fields: skillFields, append: skillAppend, remove: skillRemove } = useFieldArray({
        control,
        name: "skills"
    });

    const { fields: socialFields, append: socialAppend, remove: socialRemove } = useFieldArray({
        control,
        name: "social"
    });



    const softskillchange = (event) => {
        const courseId = event.target.value;
        const choosen = event.target.checked;

        if (choosen) {
            setSkillset([...skillset, courseId]);
        } else {
            setSkillset(skillset.filter((id) => id !== courseId));
        }
    };

    const languageChangeFun = (event) => {
        const courseId = event.target.value;
        const choosen = event.target.checked;

        if (choosen) {
            setLanguageset([...languageset, courseId]);
        } else {
            setLanguageset(languageset.filter((id) => id !== courseId));
        }
    };
    // console.log(userData.skills);

    return !loading ? (
        <form onSubmit={handleSubmit(submit)} className="form">
            <div className="row flex-lg-nowrap bg-dark p-5 w-100">
                <div className="col-12 col-md-3 mb-3">
                    <div className="card mb-3 bg-light">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 col-sm-auto w-100">
                                    <div className="mx-auto w-100 flex-column d-flex justify-content-center align-items-center">
                                        <h4>Profile Image</h4>
                                        <div className="box">

                                            <Input
                                                label={<img src={userfile} className='w-100' />}
                                                type="file"
                                                id="avatar"

                                                className="inputfile imagebtn"
                                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                                {...register("avatar", { required: !userData })}
                                                onChange={(e) => setUserFile(URL.createObjectURL(e.target.files[0]))}
                                            />
                                            {/* <label htmlFor="avatar" className='py-0 px-3'><img src={userfile} className='w-100' /></label> */}
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="card mb-3 bg-light">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 col-sm-auto mb-3 w-100">
                                    <div className="mx-auto flex-column w-100 d-flex justify-content-center align-items-center">
                                        <h4>Cover Image</h4>
                                        <div className="box flex-column d-flex justify-content-center align-items-center">
                                            <Input
                                                label={<img src={coverfile} className='w-100' />}
                                                type="file"
                                                id="coverImage"
                                                className="inputfile imagebtn"
                                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                                {...register("coverImage", { required: !userData })}
                                                onChange={(e) => setCoverFile(URL.createObjectURL(e.target.files[0]))}
                                            />

                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>


                </div>
                <div className="col">
                    <div className="card darkcard">
                        <div className="card-body">
                            <div className="row g-3">
                                <div className="col-12 col-md-6">
                                    <div className="form-group text-white">
                                        <Input
                                            label="Full Name:"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Full Name"
                                            {...register("fullName", { required: "Full Name is Required" })}
                                            error={errors?.fullName?.message}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group text-white">
                                        <Input
                                            label="Username:"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter username"
                                            {...register("username", { required: "UserName is Required" })}
                                            error={errors?.username?.message}
                                        />
                                    </div>
                                </div>

                                <div className="col-12 col-md-6">
                                    <div className="form-group text-white">
                                        <Input
                                            label="Profession:"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Profession"
                                            {...register("profession", { required: "Profession is Required" })}
                                            error={errors?.profession?.message}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group text-white">
                                        <Input
                                            label="Email:"
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter Email"
                                            {...register("email", {
                                                required: "Email is required", validate: {
                                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                        "Email address must be a valid address",
                                                }
                                            })}
                                            error={errors?.email?.message}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group text-white">
                                        <Input
                                            label="Mobile:"
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter Mobile"
                                            {...register("mobile", { required: "Mobile Number is required", maxLength: 10, minLength: 10 })}
                                            error={errors?.mobile?.message}
                                        />

                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group text-white">
                                        <Input
                                            label="Alt Mobile:"
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter alternate mobile"
                                            {...register("altMobile")}
                                        />

                                    </div>
                                </div>

                                <div className="col-12 divborder-bottom">
                                    <div className="row">
                                        <div className="col-12 col-md-3">
                                            <div className="custom-dropdown">
                                                <Button children={<span>Select Soft Skills <i className="ms-2 bi bi-caret-down-fill"></i></span>} className="btn darkBtn btn-block" type="button" id="multiSelectDropdown" onClick={() => setIsSSOpen(!isSSOpen)} />
                                                {isSSOpen && (
                                                    <div className={`ms-2 multiSelectOptions ${isSSOpen ? 'show' : ''}`}
                                                        aria-labelledby="multiSelectDropdown">
                                                        {softSkillOptions.map((option, index) => (
                                                            <Form.Check
                                                                className="custom-checkbox"
                                                                key={index}
                                                                type="checkbox"
                                                                id={`option_${index}`}
                                                                label={option}
                                                                onClick={softskillchange}
                                                                {...register("softSkills")}
                                                                value={option}

                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-9">
                                            {skillset.map((item, index) => (<span key={index} className='selected-itemspan'>{item}</span>))}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 divborder-bottom">

                                    <div className="row">
                                        <div className="col-12 col-md-3">
                                            <div className="custom-dropdown">
                                                <Button children={<span>Select Languages <i className="ms-2 bi bi-caret-down-fill"></i></span>} className="btn darkBtn btn-block" type="button" id="multiSelectLanguage" onClick={() => setIsLGOpen(!isLGOpen)} />
                                                {isLGOpen && (
                                                    <div className={`ms-2 multiSelectOptions ${isLGOpen ? 'show' : ''}`}
                                                        aria-labelledby="multiSelectLanguage">
                                                        {languageOptions.map((option, index) => (
                                                            <Form.Check
                                                                className="custom-checkbox"
                                                                key={index}
                                                                type="checkbox"
                                                                id={`option_${index}`}
                                                                label={option}
                                                                onClick={languageChangeFun}
                                                                {...register("language")}
                                                                value={option}

                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-9">
                                            {languageset.map((item, index) => (<span key={index} className='selected-itemspan'>{item}</span>))}
                                        </div>
                                    </div>

                                </div>

                                <div className="col-12 col-md-6">
                                    <label>Skills</label>
                                    {skillFields.map((item, index) => (

                                        <div className="row my-2" key={index}>
                                            <div className="col-6">
                                                <Input
                                                    // label="Skill Name"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Skill Name"
                                                    key={item.id}
                                                    {...register(`skills.${index}.title`)}
                                                />
                                            </div>
                                            <div className="col-2">
                                                <Input
                                                    // label={<span>Rating <small>Out of 100</small></span>}
                                                    type="Number"
                                                    className="form-control"
                                                    placeholder="50"
                                                    key={item.id}
                                                    {...register(`skills.${index}.rating`, { max: 100, min: 0 })}
                                                />
                                            </div>
                                            <div className="col-2">
                                                <Input
                                                    //   label="Experience"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="1 Yr"
                                                    key={item.id}
                                                    {...register(`skills.${index}.experience`)}
                                                />
                                            </div>
                                            <div className="col-2">

                                                <button type="button" className="btn btn-danger" onClick={() => skillRemove(index)}><i className="bi bi-trash"></i></button>

                                            </div>
                                        </div>
                                    ))}
                                    <button className="btn btn-primary me-3 float-end" type="button" onClick={() => skillAppend()} ><i className="bi bi-plus"></i></button>
                                </div>

                                <div className="col-12 col-md-6">
                                    <label>Social Media Accounts</label>
                                    {socialFields.map((item, index) => (

                                        <div className="row my-2" key={index}>
                                            <div className="col-4">
                                                <Select
                                                    options={socialMediaOptions}
                                                    className="form-control"
                                                    key={item.id}
                                                    {...register(`social.${index}.title`)}
                                                />

                                            </div>
                                            <div className="col-6">
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Account Link"
                                                    key={item.id}
                                                    {...register(`social.${index}.link`)}
                                                />
                                            </div>

                                            <div className="col-2">
                                                <button type="button" className="btn btn-danger" onClick={() => socialRemove(index)}><i className="bi bi-trash"></i></button>
                                            </div>

                                        </div>
                                    ))}
                                    <button className="btn btn-primary me-3 float-end" type="button" onClick={() => socialAppend()} ><i className="bi bi-plus"></i></button>
                                </div>

                                <div className="col-12 mb-3">
                                    <div className="form-group text-white">
                                        <label>About</label>
                                        <textarea className="form-control" rows="5" placeholder="My Bio"  {...register("description")}></textarea>
                                    </div>
                                </div>

                                <div className="col-12 d-flex justify-content-end">
                                    <Button type="submit" bgColor={userData ? "bg-success" : "bg-info"} className="w-full">{userData ? "Update" : "Submit"} </Button>
                                    {/* <button className="btn btn-primary" type="submit">Save Changes</button> */}
                                </div>
                            </div>
                        </div>
                    </div >
                </div >


            </div >
        </form>
    ) :
        <div className='loadingdiv'>
            <h1 className='text-white p-5'>Loading...</h1>
        </div>
}

export default EditProfile