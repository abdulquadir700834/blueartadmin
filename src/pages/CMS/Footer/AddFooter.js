import React,{useEffect} from 'react'
import DashboardHeader from '../../../components/dashboard/header/DashboardHeader'
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { toast,ToastContainer } from "react-toastify";
import { useAddFooterMutation } from '../../../Store/Store';
import { useFormik } from "formik";
import { cmsFooter } from "../../Schema";

const AddFooter = () => {


    const [addFooter,responseInfo]=useAddFooterMutation();
    const initialValues = {
        menutype: "",
        menu: "",
        link: "",
        section: "",
        status: "",
    
    };
    
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: cmsFooter,
      onSubmit: (values, action) => {
        console.log(
          values
        );
        addFooter(values)
        action.resetForm();
      },
    });
    console.log(
    errors
    );
    
    useEffect(() => {
    
    if(responseInfo?.data?.status === true) {
        toast?.success(responseInfo?.data?.message)
        setTimeout(() => (window.location.href = "/footerList"), 2000);
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
                <Tab eventKey="" title="Add Footer">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                      <Form onSubmit={handleSubmit} >
                        <div className="row g-4">
                          <div className="col-12">
                            <input
                              className="form-control bg-gray border-0"
                              type="text"
                              id="menutype"
                              name="menutype"
                              placeholder="Menu Type..."
                              value={values.menutype}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.menutype && errors.menutype ? (
                              <p  className="form-error">{errors.menutype}</p>
                            ) : null}
                          </div>
                          <div className="col-12">
                            <input
                              className="form-control bg-gray border-0"
                              type="text"
                              id="menu"
                              name="menu"
                              placeholder="Menu..."
                              value={values.menu}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.menu && errors.menu ? (
                              <p  className="form-error">{errors.menu}</p>
                            ) : null}
                          </div>

                          <div className="col-12">
                            <input
                              className="form-control bg-gray border-0"
                              type="text"
                              id="link"
                              name="link"
                              placeholder="Link..."
                              value={values.link}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.link && errors.link ? (
                              <p  className="form-error">{errors.link}</p>
                            ) : null}
                          </div>
                          <div className="col-12">
                            <input
                              className="form-control bg-gray border-0"
                              type="number"
                              id="section"
                              name="section"
                              placeholder="Section..."
                              value={values.section}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.section && errors.section ? (
                              <p  className="form-error">{errors.section}</p>
                            ) : null}
                          </div>

                          <div className="col-12">
                            <select className="filter-select bg-gray w-100" name="status" 
                            value={values.status} onChange={handleChange}
                            onBlur={handleBlur}
                             >
                              <option  >active</option>
                              <option  >inactive</option>

                            </select>
                            {touched.status && errors.status ? (
                              <p  className="form-error">{errors.status}</p>
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

export default AddFooter