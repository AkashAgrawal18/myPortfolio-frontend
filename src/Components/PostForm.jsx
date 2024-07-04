import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Button, Input, Select } from ".";
import authService, { getReq } from "../apis/auth.js";
import { useNavigate } from "react-router-dom";
import { serverProjectImage } from "../imageUrl.js";

export default function PostForm({ projectId }) {

    const [coverImage, setCoverImage] = useState("images/imagedefault.png")
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(true)
    // console.log(projectId)
    useEffect(() => {
        if (projectId != '' && projectId != undefined && projectId != null) {

            getReq('project/detail/', {
                params: { projectId }
            })
                .then((neData) => {
                    if (neData.success) {
                        setPost(neData.data)
                        setCoverImage(`${serverProjectImage}/${neData.data.coverImage}`)
                    } else {
                        setPost({})
                        setCoverImage("images/imagedefault.png")
                    }
                })
                .finally(() => setLoading(false));

        } else {
            setPost({})
            setCoverImage("images/imagedefault.png")
            setLoading(false)
        }
    }, [projectId])



    const { register, handleSubmit, formState: { errors }, setValue, control, getValues ,reset} = useForm({
        values: {
            domain: post?.domain || "Web Application",
            startOn: new Date(post?.startOn).toLocaleDateString('fr-CA') || "",
            completedOn: new Date(post?.completedOn).toLocaleDateString('fr-CA') || "",
            shortDesc: post?.shortDesc || "",
            title: post?.title || "",
            description: post?.description || [{ points: '' }],
            status: post?.status || "Completed",
        },
    });

    // console.log(post?.description)

    const navigate = useNavigate();


    // const submit = async (data) => {
    //     if (post?._id) {
    //         const dbPost = await authService.updateProject(post._id, data);
    //         if (dbPost) {
    //             window.location.reload(false);
    //             // navigate(`/`);
    //         }
    //     } else {
    //         const dbPost = await authService.addProject(data);
    //         if (dbPost) {
    //             window.location.reload(false);
    //             // navigate(`/`);
    //         }

    //     }
    // };

    const submit = async (data) => {
        try {
            let dbPost;
            if (post?._id) {
                dbPost = await authService.updateProject(post._id, data);
            } else {
              dbPost = await authService.addProject(data);
            }

            if (dbPost) {
                 reset({
                    domain: "",
                    startOn: "",
                    completedOn: "",
                    shortDesc: "",
                    title: "",
                    description: [{ points: '' }],
                    status: "",
                   
                });
                navigate('.', { replace: true })
            } else {
                console.error('Failed to update/add project.'); // Handle error or log
            }
        } catch (error) {
            console.error('Error submitting data:', error); // Handle specific errors if needed
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
                    {!post?._id ? (<h4>Add New Project</h4>) : (<h4>Edit Project Details</h4>)}
                    <div className="row">
                        <div className="col-12 col-md-8">
                            <div className="row g-3">
                                <div className="col-12 col-md-6">
                                    <div className="form-group">

                                        <Select
                                            label="Domain"
                                            options={["Web Application", "Mobile Application", "Desktop Software", "Other"]}
                                            className="form-control"
                                            {...register("domain", { required: "Domain is Required" })}
                                            error={errors?.domain?.message}
                                        />

                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group">

                                        <Select
                                            label="Status"
                                            options={["Completed", "Is Runing", "On Hold"]}
                                            className="form-control"
                                            {...register("status", { required: "Status is Required" })}
                                            error={errors?.status?.message}
                                        />

                                    </div>
                                </div>

                                <div className="col-12 col-md-6 text-white">
                                    <Input
                                        label="Start On:"
                                        type="date"
                                        className="form-control"
                                        placeholder="Enter Start On"
                                        // key={item.id}
                                        {...register(`startOn`, { required: "Start Date is Required" })}
                                        error={errors?.startOn?.message}
                                    />
                                </div>
                                <div className="col-12 col-md-6 text-white">
                                    <Input
                                        label="Completed On:"
                                        type="date"
                                        className="form-control"
                                        placeholder="Enter Completed On"
                                        // key={item.id}
                                        {...register(`completedOn`)}
                                    />

                                </div>

                                <div className="col-12 text-white">
                                    <Input
                                        label="Title:"
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter title"
                                        // key={item.id}
                                        {...register(`title`, { required: "Project Title is Required" })}
                                        error={errors?.title?.message}
                                    />
                                </div>

                            </div>
                        </div>

                        <div className="col-12 col-md-4 text-center">
                            <h4>Cover Image</h4>
                            <div className="box flex-column d-flex text-center ">
                                <Input
                                    label={<img src={coverImage} className='w-100' />}
                                    type="file"
                                    id="coverImage"
                                    className="inputfile imagebtn"
                                    accept="image/png, image/jpg, image/jpeg, image/gif"
                                    {...register("coverImage", { required: "images is required" })}
                                    error={errors?.coverImage?.message}
                                    onChange={(e) => setCoverImage(URL.createObjectURL(e.target.files[0]))}
                                />
                            </div>
                        </div>

                        <div className="col-12 mb-3">
                            <Input
                                label="Short Description"
                                type="text"
                                className="form-control"
                                {...register("shortDesc")}

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
