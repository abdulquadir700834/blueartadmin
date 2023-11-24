import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAddAdminMutationMutation, useUpdateAdminMutationMutation, useGetAdminRoleQueryQuery, useGetAdminListQueryQuery } from "../Store/Store";
import { useFormik } from "formik";
import { addUserSchema } from "./Schema";
import Form from "react-bootstrap/Form";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Loader from "../components/loader/Loader";
const options = [

  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },

]
const AddAdmin = () => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const getRole = useGetAdminRoleQueryQuery();
  const getAdmin = useGetAdminListQueryQuery();

  const optionsRole = getRole?.data?.info?.map((guest, index) => {
    return {
      label: guest.Role,
      value: guest._id,
      key: index
    }
  })
  const [selectedOption, setSelectedOption] = useState({ value: 'active', label: 'Active' });
  const [selectedOptionRole, setSelectedOptionRole] = useState({ value: 'Role', label: 'Role' });
  const [updateUser, response] = useUpdateAdminMutationMutation();
  const [addUser, responseInfo] = useAddAdminMutationMutation();
  const handleChangeSelect = (e) => {
    console.log(e, "option");
    setSelectedOption(e)
  }
  const handleChangeSelectRole = (e) => {
    console.log(e, "option");
    setSelectedOptionRole(e)
  }
  console.log(selectedOption.value, "option")

  const initialValues = {
    UserName: "",
    Email: "",
    Password: "",
    Role: "",
    Status: "",
    ConfirmPassword: ""
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: addUserSchema,
      onSubmit: (values, action) => {
        setIsLoading(true);
        let postData = {
          UserName: values.UserName,
          Email: values.Email,
          Password: values.Password,
          Role: selectedOptionRole.value,
          Status: selectedOption.label,
        }
        console.log(
          values
        );
        addUser(postData)
          .then(res => {
            if (res?.data?.status !== false) {
              toast.success(res?.data?.info)
              setTimeout(() => navigate("/user"), 1500);
              setIsLoading(false);
            } else {
              toast.error(res?.data?.info);
              setIsLoading(false);
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      },
    });
  console.log(
    errors
  );

  return (
    <>
      {isLoading && <Loader />}
      <ToastContainer></ToastContainer>
      <div className="admin-wrapper-table">
        <div className="row g-4 justify-content-center">
          <div className='d-flex flex-wrap justify-content-end px-5'>
            <div className=''>
              <div className='btn-right'>
                <Link className="btn btn-danger  btn-sm w-10" to="/user" >
                  <i class="bi bi-chevron-double-left"></i>Back
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
            <Tabs className="border-0 mb-3 settings-tabs">
              <Tab eventKey="" title="Add Admin">
                <div className="card">
                  <div className="card-body p-4 p-sm-5">
                    <Form onSubmit={handleSubmit} >
                      <div className="row g-4">
                        <div className="col-12">

                          <input
                            style={{ background: "#0C153B;" }}
                            className="form-control card shadow"
                            type="name"
                            autoComplete="off"
                            name="UserName"
                            id="UserName"
                            placeholder="User Name"
                            value={values.UserName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.UserName && errors.UserName ? (
                            <p className="form-error">{errors.UserName}</p>
                          ) : null}
                        </div>

                        <div className="col-12">
                          <input
                            type="email"
                            className="form-control card shadow"
                            autoComplete="off"
                            name="Email"
                            id="Email"
                            placeholder="Email"
                            value={values.Email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.Email && touched.Email ? (
                            <p className="form-error">{errors.Email}</p>
                          ) : null}
                        </div>
                        <div className="col-12">

                          <div className="col-12">
                            <Select options={optionsRole} placeholder="Select a brand"
                              value={selectedOptionRole}
                              onChange={(e) => handleChangeSelectRole(e)}
                            />
                            {touched.Status && errors.Status ? (
                              <p className="form-error">{errors.Status}</p>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-12">
                          <Select options={options} placeholder="Select a brand"
                            value={selectedOption}
                            onChange={(e) => handleChangeSelect(e)}
                          />
                          {touched.Status && errors.Status ? (
                            <p className="form-error">{errors.Status}</p>
                          ) : null}
                        </div>
                        <div className="col-12">
                          <input
                            type="password"
                            className="form-control card shadow"
                            autoComplete="off"
                            name="Password"
                            id="Password"
                            placeholder="Password"
                            value={values.Password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.Password && touched.Password ? (
                            <p className="form-error">{errors.Password}</p>
                          ) : null}
                        </div>
                        <div className="col-12">
                          <input
                            type="password"
                            autoComplete="off"
                            className="form-control card shadow"
                            name="ConfirmPassword"
                            id="ConfirmPassword"
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            value={values?.ConfirmPassword}
                          />
                          {errors.ConfirmPassword && touched.ConfirmPassword ? (
                            <p className="form-error">{errors.ConfirmPassword}</p>
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
    </>
  );
};
export default AddAdmin;
