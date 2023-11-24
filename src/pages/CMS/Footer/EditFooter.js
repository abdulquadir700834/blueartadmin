import React, { useEffect, useState } from 'react'
import DashboardHeader from '../../../components/dashboard/header/DashboardHeader'
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useFormik } from "formik";
import { cmsFooter } from "../../Schema";
import { toast, ToastContainer } from "react-toastify";
import { useGetFooterListByIdQuery, useEditFooterMutation } from '../../../Store/Store';
import { useParams } from 'react-router-dom';

const EditFooter = () => {
  const { id } = useParams()
  const { data } = useGetFooterListByIdQuery(id);
  const [editFooter, responseInfo] = useEditFooterMutation();
  console.log(data);
  const initialValues = {
    menu_id: id,
    menutype: "",
    menu: "",
    link: "",
    section: "",
    status: "",

  };

  const [formValue, setFormValue] = useState(initialValues);

  const handleInputChanges = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValue);
    await editFooter(formValue)
  }


  useEffect(() => {
    if (responseInfo?.data?.status === true) {
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
                <Tab eventKey="" title="Edit Footer">
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
                              defaultValue={data?.data?.menutype}
                              onChange={handleInputChanges}
                            />

                          </div>
                          <div className="col-12">
                            <input
                              className="form-control bg-gray border-0"
                              type="text"
                              id="menu"
                              name="menu"
                              placeholder="Menu..."
                              defaultValue={data?.data?.menu}
                              onChange={handleInputChanges}

                            />

                          </div>

                          <div className="col-12">
                            <input
                              className="form-control bg-gray border-0"
                              type="text"
                              id="link"
                              name="link"
                              placeholder="Link..."
                              defaultValue={data?.data?.link}
                              onChange={handleInputChanges}

                            />

                          </div>
                          <div className="col-12">
                            <input
                              className="form-control bg-gray border-0"
                              type="number"
                              id="section"
                              name="section"
                              placeholder="Section..."
                              defaultValue={data?.data?.section}
                              onChange={handleInputChanges}

                            />

                          </div>

                          <div className="col-12">
                            <select className="filter-select bg-gray w-100" name="status"
                              defaultValue={data?.data?.status} onChange={handleInputChanges}

                            >
                              <option  >active</option>
                              <option  >inactive</option>

                            </select>

                          </div>
                          <div className="col-12">
                            <input
                              className="btn btn-primary w-100 rounded-pill"
                              type="submit"
                              value={"Update"}
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

export default EditFooter