import React, { useState, useEffect } from 'react'
import DashboardHeader from '../components/dashboard/header/DashboardHeader'
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useGetcommisionQuery, useEditCommisionMutation } from '../Store/Store';
import { toast, ToastContainer } from 'react-toastify'
import { useFormik } from 'formik';
import * as yup from "yup";
const Commision = () => {

  const data = useGetcommisionQuery();
  const [addCommision, responseInfo] = useEditCommisionMutation();
  const initialState = {
    name: "",
    value: ""
  };
  const [formValue, setFormValue] = useState(initialState);
  const { name, value } = formValue;


  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    value: yup.string().required("Value is required")
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      value: ''
    },
    validationSchema: schema,
    onSubmit: values => {
      let postData = {
        name: values.name,
        value: values.value
      }
      addCommision(postData)
    },
  });

  useEffect(() => {
    if(data.status === "fulfilled"){
        formik.setFieldValue("name",data?.data?.result?.name)
        formik.setFieldValue("value",data?.data?.result?.value)        
    }
    console.log("data", data);
  }, [data])

  const handleInputChanges = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    console.log('', formValue);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValue);
    addCommision(formValue)

  }

  useEffect(() => {

    if (responseInfo?.data?.status === true) {
      toast?.success(responseInfo?.data?.message)
    } else {
      toast?.error(responseInfo?.data?.message)
    }

  }, [responseInfo])


  return (
    <>
      <div className="admin-wrapper">
        <ToastContainer></ToastContainer>
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <h3>Commision</h3>
              <div className="card">
                <div className="card-body p-4 p-sm-5">
                  <Form onSubmit={formik.handleSubmit} >
                    <div className="row g-4">
                      <label>Commision Name</label>
                      <div className="col-12">
                        <input
                          className="form-control card shadow"
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Name..."
                          onChange={formik.handleChange} value={formik.values.name}
                        />
                      </div>
                      <label>Commision Value</label>
                      <div className="col-12">
                        <input
                          className="form-control card shadow"
                          type="text"
                          id="value"
                          name="value"
                          placeholder="Value..."
                          onChange={formik.handleChange} value={formik.values.value}
                        />
                      </div>

                      <div className="col-12">
                        <input
                          className="btn btn-primary w-100 rounded-pill"
                          type="submit"
                          value={"Save"}
                        />
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Commision