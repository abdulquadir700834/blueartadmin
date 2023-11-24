import React, { useState,useEffect } from 'react'
import DashboardHeader from '../../../components/dashboard/header/DashboardHeader'
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useAddContactUsMutation } from '../../../Store/Store';
import { toast,ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import { cmsContactSchema } from "../../Schema";

const AddContactUs = () => {
    const [addContactUs,responseInfo]=useAddContactUsMutation();
    const initialValues = {
        name: "",
        email: "",
        phone: "",
        address: "",
    };
    
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: cmsContactSchema,
      onSubmit: (values, action) => {
        console.log(
          values
        );
        addContactUs(values)
        action.resetForm();
      },
    });
    console.log(
    errors
    );
    
    useEffect(() => {
    
    if(responseInfo?.data?.status === true) {
        toast?.success(responseInfo?.data?.message)
        setTimeout(() => (window.location.href = "/contact-us"), 2000);
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
              <Tabs className="border-0 mb-3 settings-tabs">
                <Tab eventKey="" title="Contact Us">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                      <Form onSubmit={handleSubmit} >
                        <div className="row g-4">
                          <div className="col-12">
                            <input
                              className="form-control bg-gray border-0"
                              type="text"
                              id="name"
                              name="name"
                              placeholder="Name..."
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.name && errors.name ? (
                              <p  className="form-error">{errors.name}</p>
                            ) : null}
                          </div>
                          <div className="col-12">
                            <input
                              className="form-control bg-gray border-0"
                              type="text"
                              id="name"
                              name="email"
                              placeholder="Email..."
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.email && errors.email ? (
                              <p  className="form-error">{errors.email}</p>
                            ) : null}
                          </div>
                          <div className="col-12">
                            <input
                              className="form-control bg-gray border-0"
                              type="number"
                              id="name"
                              name="phone"
                              placeholder="Phone..."
                              value={values.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.phone && errors.phone ? (
                              <p  className="form-error">{errors.phone}</p>
                            ) : null}
                          </div>
                          <div className="col-12">
                            <input
                              className="form-control bg-gray border-0"
                              type="text"
                              id="name"
                              name="address"
                              placeholder="Address..."
                              value={values.address}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.address && errors.address ? (
                              <p  className="form-error">{errors.address}</p>
                            ) : null}
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
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
   
   </>
  )
}

export default AddContactUs