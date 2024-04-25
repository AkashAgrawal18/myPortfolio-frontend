import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Button, Input } from ".";
import authService from "../apis/auth.js";
import { useNavigate } from "react-router-dom";
import InputCheck from "./InputCheck.jsx";

export default function ExperienceForm({ experienceId }) {

    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(true)
    // console.log(experienceId)
    useEffect(() => {
        if (experienceId != '' && experienceId != undefined && experienceId != null) {
            authService.getExperienceDetail(experienceId).then((apidata) => {
                if (apidata) {
                    setPost(apidata.data.data[0])
                } else {
                    setPost({})

                }
            }).finally(() => setLoading(false))
        } else {
            setPost({})
            setLoading(false)
        }
    }, [experienceId])



    const { register, handleSubmit, formState: { errors }, setValue, control, getValues } = useForm({
        values: {
            title: post?.title || "",
            startOn: new Date(post?.startOn).toLocaleDateString('fr-CA') || "",
            exitOn: new Date(post?.exitOn).toLocaleDateString('fr-CA') || "",
            companyLocation: post?.companyLocation || "",
            companyName: post?.companyName || "",
            designation: post?.designation || "",
            description: post?.description || [{ points: '' }],
            isCurrent: post?.isCurrent || false,
        },
    });

    // console.log(post?.description)

    const navigate = useNavigate();


    const submit = async (data) => {
        if (post?._id) {
            const dbPost = await authService.updateExperience(post._id, data.title, data.startOn, data.exitOn, data.companyLocation, data.companyName, data.designation, data.description, data.isCurrent);
            if (dbPost) {
                window.location.reload(false);
                // navigate(`/experience`);
            }
        } else {
            const dbPost = await authService.addExperience(data.title, data.startOn, data.exitOn, data.companyLocation, data.companyName, data.designation, data.description, data.isCurrent);
            if (dbPost) {
                window.location.reload(false);
                // navigate(`/experience`);
            }

        }
    };


    const { fields, append, remove } = useFieldArray({
        control,
        name: "description"
    });



    return !loading ? (
        <form onSubmit={handleSubmit(submit)} className="form">

            <div className="card mb-3 darkcard">
                <div className="card-body">
                    {!post?._id ? (<h4>Add New Experience</h4>) : (<h4>Edit Experience Details</h4>)}
                    <div className="row g-3">
                        
                        <div className="col-12 col-md-6 text-white">
                            <Input
                                label="Start On"
                                type="date"
                                className="form-control"
                                placeholder="Enter Start On"
                                // key={item.id}
                                {...register(`startOn`, { required: "Start Date is Required" })}
                                error={errors?.startOn?.message}
                            />
                        </div>
                       {!post?.isCurrent && <div className="col-6 col-md-4 text-white">
                            <Input
                                label="Exit On"
                                type="date"
                                className="form-control"
                                placeholder="Enter Exit On"
                                // key={item.id}
                                {...register(`exitOn`)}
                            />

                        </div>}
                        <div className="col-6 col-md-2 mt-5 text-white">
                            <InputCheck
                                label="Is Present"
                                id="iscurrent"
                                className=""
                                type="checkbox"
                                {...register(`isCurrent`)}
                                onClick={() => {setPost({...post,isCurrent:!post.isCurrent})}}
                            />

                        </div>

                        <div className="col-12 col-md-6 text-white">
                            <Input
                                label="Job Title"
                                type="text"
                                className="form-control"
                                placeholder="Enter title"
                                // key={item.id}
                                {...register(`title`, { required: "Job Title is Required" })}
                                error={errors?.title?.message}
                            />
                        </div>
                        <div className="col-12 col-md-6 text-white">
                            <Input
                                label="Designation"
                                type="text"
                                className="form-control"
                                placeholder="Enter Designation"
                                // key={item.id}
                                {...register(`designation`, { required: "Designation is Required" })}
                                error={errors?.title?.message}
                            />
                        </div>
                        <div className="col-12 col-md-6 text-white">
                            <Input
                                label="Company Name"
                                type="text"
                                className="form-control"
                                placeholder="Enter Company name"
                                // key={item.id}
                                {...register(`companyName`, { required: "Company Name is Required" })}
                                error={errors?.title?.message}
                            />
                        </div>
                        <div className="col-12 col-md-6 text-white">
                            <Input
                                label="Company Location"
                                type="text"
                                className="form-control"
                                placeholder="Enter Location"
                                // key={item.id}
                                {...register(`companyLocation`, { required: "Company Location is Required" })}
                                error={errors?.title?.message}
                            />
                        </div>

                        <label>Description</label>
                        {fields.map((item, index) => (

                            <div className="row mb-3" key={index}>
                                <div className="col-10 ">
                                    <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Other Details"
                                        key={item.id}
                                        {...register(`description.${index}.points`)}
                                    />
                                </div>
                                <div className="col-2">

                                    {index > 0 ? <button type="button" className="btn btn-danger" onClick={() => remove(index)}><i className="bi bi-trash"></i></button> : <button className="btn btn-primary me-2" type="button" onClick={() => append()} ><i className="bi bi-plus"></i></button>}

                                </div>

                            </div>
                        ))}

                        <div className="col-12 d-flex justify-content-end">
                            <Button type="submit" bgColor={post?._id ? "bg-success" : "bg-info"} className="w-full">{post?._id ? "Update" : "Submit"} </Button>

                        </div>

                    </div>
                </div>
            </div>

        </form>
    ) :
        <div className='loadingdiv'>
            <h1 className='text-white p-5'>Loading...</h1>
        </div>;
}
