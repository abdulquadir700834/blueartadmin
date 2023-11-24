import React, { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from 'react-router-dom';
import { useGetAdminOneAdminMutation, useSingleUserDetailsQuery, useUpdateAdminMutationMutation, useUpdateUserMutation, useGetAdminRoleQuerysQuery } from "../Store/Store";
import * as Yup from "yup";
import { useFormik } from "formik";
import Select from "react-select"
import { isArray } from 'jquery';
import CryptoJS from 'crypto-js';
import Loader from '../components/loader/Loader';

const options = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
]

const UpdateUser = () => {

  const getRole = useGetAdminRoleQuerysQuery();

  const optionsRole = getRole?.data?.info?.map((guest, index) => {
    return {
      label: guest.Role,
      value: guest._id,
      key: index
    }
  })
  const { id } = useParams();
  let navigate = useNavigate()
  const { data } = useSingleUserDetailsQuery(id);
  const [createPost2, responseInfo2] = useGetAdminOneAdminMutation()
  const [createPost, responseInfo] = useUpdateAdminMutationMutation();
  const [getOneSpecificData, setGetOneSpecificData] = useState();
  const [getOneSpecificRole, setGetOneSpecificRole] = useState();
  const [selectedOptionRole, setSelectedOptionRole] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ value: `${getOneSpecificData?.Status}`, label: `${getOneSpecificData?.Status}` });
  console.log("single user data", data);

  const handleChange = (e) => {
    console.log(e, "option");
    setSelectedOption(e.value)
  }

  console.log("createPost2", createPost2)

  const schema = Yup.object().shape({
    UserName: Yup.string().min(2).max(25).required("Please enter your username name"),
    Email: Yup.string().email().required("Please enter your email"),
    Password: Yup.string().min(6).required("Please enter your password"),
    ConfirmPassword: Yup.string()
      .oneOf([Yup.ref("Password"), null], "Password must match").required("Please enter your password"),

  });

    const decryptedItem = CryptoJS.AES.decrypt(id, process.env.REACT_APP_SECRET_PASS).toString(CryptoJS.enc.Utf8);
console.log("decryptedItemList:",decryptedItem)
  const getOneData = async () => {
    setIsLoading(true)
    const updateUserDetails = await createPost2({ "Id": decryptedItem }).then(res => {
      setGetOneSpecificRole(res?.data?.roleinfo[0]?.Role);
      setGetOneSpecificData(res?.data?.info, "res")
      setIsLoading(false)
    })
  }

  useEffect(() => {
    getOneData()
  }, [])

  useEffect(() => {
    setSelectedOption({ value: `${getOneSpecificData?.Status}`, label: `${getOneSpecificData?.Status}` })
  }, [getOneSpecificData])

  useEffect(() => {
    createPost2({ "Id": decryptedItem }).then(res => {
      let setRole = getRole?.data?.info?.filter((role, index) => res?.data?.roleinfo[0]?.Role === role.Role)
      if (isArray(setRole)) {
        console.log("setRole", setRole)
        setSelectedOptionRole({ value: setRole[0]?._id, label: setRole[0]?.Role })
      }
    })
  }, [getRole])

  const formik = useFormik({
    initialValues: {
      UserName: getOneSpecificData?.UserName,
      Email: getOneSpecificData?.Email,
      Role: getOneSpecificData?.Role,
      Status: "",
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      let postData = {
        Id: decryptedItem,
        UserName: values.UserName,
        Email: values.Email,
        Role: selectedOptionRole.value,
        Status: selectedOption.value,
        Password: values?.Password
      }

      createPost(postData).then(res => {
        if (res?.data?.status !== false) {
          toast.success(res?.data?.info)
          setTimeout(() => navigate("/user"), 1500);
        } else {
          toast.error(res?.data?.message)
        }
      })
    },
  });
  console.log(formik.values.Status, "change")

  const handleChangeSelect = (e) => {
    console.log(e, "option");
    setSelectedOption(e)
  }

  const handleChangeSelectRole = (e) => {
    console.log(e, "option");
    setSelectedOptionRole(e)
  }

  console.log("selectedOptionRole", selectedOptionRole)

  return (
    <>
    {isLoading && <Loader />}
      <div className="admin-wrapper">
        <ToastContainer></ToastContainer>
        <div className="container">

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
                <Tab eventKey="" title="Edit Admin">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                      <Form onSubmit={formik.handleSubmit} >
                        <div className="row g-4">
                          <div className="col-12">
                            <label >Username</label>
                            <input
                              className="form-control bg-gray border-0"
                              type="name"
                              autoComplete="off"
                              name="UserName"
                              id="UserName"
                              placeholder="User Name"
                              value={formik.values.UserName}
                              onChange={formik.handleChange}
                            />
                            <div>{formik.errors.UserName}</div>
                          </div>
                          <div className="col-12">
                            <label >Role</label>
                            <Select
                              options={optionsRole}
                              placeholder="Select a Role"
                              value={selectedOptionRole}
                              onChange={(e) => handleChangeSelectRole(e)}
                            />
                          </div>
                          <div className="col-12">
                            <label >Email</label>
                            <input
                              type="email"
                              className="form-control bg-gray border-0"
                              autoComplete="off"
                              name="Email"
                              id="Email"
                              placeholder="Email"
                              value={formik.values.Email}
                              onChange={formik.handleChange}
                            />
                            <div>{formik.errors.Email}</div>
                          </div>

                          <div className="col-12">
                            <label >Status</label>
                            <Select options={options} placeholder="Select a brand"
                              value={selectedOption}
                              onChange={handleChangeSelect}
                            />
                          </div>
                          <div className="col-12">
                            <input
                              type="password"
                              className="form-control card shadow"
                              autoComplete="off"
                              name="Password"
                              id="Password"
                              placeholder="Password"
                              value={formik?.values.Password}
                              onChange={formik?.handleChange}
                            />
                            {formik?.errors?.Password ? <p className="form-error">{formik?.errors?.Password}</p> : null}
                          </div>
                          <div className="col-12">
                            <input
                              type="password"
                              autoComplete="off"
                              className="form-control card shadow"
                              name="ConfirmPassword"
                              id="ConfirmPassword"
                              placeholder="Confirm Password"
                              onChange={formik?.handleChange}
                              value={formik?.values?.ConfirmPassword}
                            />
                            {formik?.errors?.ConfirmPassword ? <p className="form-error">{formik?.errors?.ConfirmPassword}</p> : null}
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

export default UpdateUser