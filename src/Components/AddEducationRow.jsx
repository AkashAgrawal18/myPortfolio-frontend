
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import authService, { getReq } from "../apis/auth.js";
import { useNavigate } from "react-router-dom";
import InputCheck from "./InputCheck.jsx";
import ModalDialog from "./ModalDialog.jsx";

export default function AddEducationRow() {
  const navigate = useNavigate();
  const [edudata, setEdudata] = useState([{
    isCurrent: false,
    startOn: new Date(),
    completedOn: '',
    degree: '',
    universityName: '',
    universityLocation: '',
    description: '',
  }])

  const [modalShow, setModalShow] = useState(false)
  const [modalData, setModalData] = useState({ title: "", msg: "", status: "", btnText: "", btnText2: "", btn2func:"" })


  const { register, formState: { errors }, control, handleSubmit, setValue } = useForm({ values: { item: edudata } });

  useEffect(() => {
    ; (async () => {
      const userdata = await getReq('users/current-user')
      if (userdata) {
        let experidata = userdata.data.education;
        if (experidata.length > 0) {
          setEdudata(experidata)

        }
      }

      // console.log(edudata)
    })()


  }, []);


  const { fields, append, remove } = useFieldArray({
    control,
    name: "item"
  });

  const submit = async (data) => {

    const dbPost = await authService.addEducation(data.item);

    if (dbPost) {
      navigate(`/`);
    }

  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>

        {fields.map((item, index) => {
          setValue(`item.${index}.startOn`, new Date(edudata[index]?.startOn).toLocaleDateString('fr-CA'));
          setValue(`item.${index}.completedOn`, new Date(edudata[index]?.completedOn).toLocaleDateString('fr-CA'));

          return (
            <div className="card mb-3 darkcard" key={index}>
              <div className="card-body">
                <div className="input_container" key={index}>
                  <div className="row g-3">
                    <div className="col-6 text-white">
                      <InputCheck
                        label="Is Present"
                        id="iscurrent"
                        className=""
                        type="checkbox"
                        {...register(`item.${index}.isCurrent`)}
                      />

                    </div>
                    <div className="col-6 text-end">
                      {index > 0 ? <Button type="button" className="btn btn-danger" onClick={() => {
                        setModalData({title:'Are You Sure?',msg:'You Want to Remove Education Detail?',status:'warning',btnText:'NO',btnText2:'YES',btn2func:index});
                        setModalShow(true)
                      }} children={<i className="bi bi-trash"></i>} /> : null}
                    </div>
                    <div className="col-6 col-md-3 text-white">
                      <Input
                        label="Start On:"
                        type="date"
                        className="form-control"
                        placeholder="Enter Start On"
                        key={item.id}
                        {...register(`item.${index}.startOn`, { required: "Start Date is Required" })}
                        error={errors?.item?.[index]?.startOn?.message}
                      />
                    </div>
                    {!item.isCurrent && <div className="col-6 col-md-3 text-white">
                      <Input
                        label="Completed On:"
                        type="date"
                        className="form-control"
                        placeholder="Enter Completed On"
                        key={item.id}
                        {...register(`item.${index}.completedOn`)}
                      />

                    </div>}
                    <div className="col-12 col-md-6 text-white">
                      <Input
                        label="Degree:"
                        type="text"
                        className="form-control"
                        placeholder="Enter Degree"
                        key={item.id}
                        {...register(`item.${index}.degree`, { required: "Degree Name is Required" })}
                        error={errors?.item?.[index]?.degree?.message}
                      />
                    </div>
                    <div className="col-12 col-md-6 text-white">
                      <Input
                        label="University Name:"
                        type="text"
                        className="form-control"
                        placeholder="Enter University Name"
                        key={item.id}
                        {...register(`item.${index}.universityName`, { required: "University Name is Required" })}
                        error={errors?.item?.[index]?.universityName?.message}
                      />
                    </div>
                    <div className="col-12 col-md-6 text-white">
                      <Input
                        label="University Location:"
                        type="text"
                        className="form-control"
                        placeholder="Enter University Location"
                        key={item.id}
                        {...register(`item.${index}.universityLocation`, { required: "University Location is Required" })}
                        error={errors?.item?.[index]?.universityLocation?.message}
                      />
                    </div>
                    <div className="col-12 text-white">

                      <Input
                        label="Other Details:"
                        type="text"
                        className="form-control"
                        placeholder="Enter Other Details"
                        key={item.id}
                        {...register(`item.${index}.description`)}
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>

          )
        })}

        <Button children="Add More" className="btn btn-primary me-2" type="button" onClick={() => append()} />
        <Button children="Submit" className="btn btn-success" type="submit" />

      </form>
      <ModalDialog
        title={modalData.title}
        status={modalData.status}
        msg={modalData.msg}
        btnText={modalData.btnText}
        btnText2={modalData.btnText2}
        btn2func={() => {remove(modalData.btn2func); setModalShow(false)}}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}


