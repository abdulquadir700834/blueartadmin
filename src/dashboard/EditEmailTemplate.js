import React, { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetOneEmailTemplateMutationMutation, useGetUpdateEmailTemplateMutationMutation, useSingleUserDetailsQuery, useUpdateAdminMutationMutation, useUpdateUserMutation } from "../Store/Store";
import * as Yup from "yup";
import { useFormik } from "formik";
import Loader from '../components/loader/Loader';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CryptoJS from 'crypto-js';

const EditEmailTemplate = () => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { data } = useSingleUserDetailsQuery(id);
  const [createPost2, responseInfo2] = useGetOneEmailTemplateMutationMutation()
  const [createPost, responseInfo] = useGetUpdateEmailTemplateMutationMutation();
  const [getOneSpecificData, setGetOneSpecificData] = useState()
  const [selectedOption, setSelectedOption] = useState({ value: `${getOneSpecificData?.Status}`, label: `${getOneSpecificData?.Status}` });

  const decryptedItem = CryptoJS.AES.decrypt(id, process.env.REACT_APP_SECRET_PASS).toString(CryptoJS.enc.Utf8);

  const handleChange = (e) => {
    console.log(e, "option");
    setSelectedOption(e)
  }

  const schema = Yup.object().shape({
    Subject: Yup.string().min(2).required("Please enter your Subject"),
    Html: Yup.string().required("Please enter your Html")
  });

  const getOneData = async () => {
    setIsLoading(true);
    const updateUserDetails = await createPost2({ "Id": decodeURIComponent(decryptedItem) })
      .then(res => {
        setGetOneSpecificData(res?.data?.info, "res")
        setIsLoading(false)
      })
    console.log(updateUserDetails, "details")
  }

  useEffect(() => {
    getOneData()
  }, [])

  const formik = useFormik({
    initialValues: {
      Subject: getOneSpecificData?.Subject,
      Html: getOneSpecificData?.Html,
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      setIsLoading(true);
      let postData = {
        Id: decodeURIComponent(decryptedItem),
        Subject: values.Subject,
        Html: selectedOption && selectedOption || values.Html,
      }
      createPost(postData).then(res => {
        if (res?.data?.status !== false) {
          toast.success(res?.data?.info)
          setIsLoading(false);
          setTimeout(() => navigate("/emailtemplate"), 1500);
        } else {
          toast.error(res?.data?.message)
          setIsLoading(false);
        }
      })
    },
  });

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
                  <Link className="btn btn-danger  btn-sm w-10" to="/emailtemplate" >
                    <i class="bi bi-chevron-double-left"></i>Back
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <Tabs className="border-0 mb-3 settings-tabs">
                <Tab eventKey="" title="Edit Email Template">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                      <Form onSubmit={formik.handleSubmit} >
                        <div className="row g-4">
                          <div className="col-12">
                            <label >Subject</label>
                            <input
                              className="form-control bg-gray border-0"
                              type="name"
                              autoComplete="off"
                              name="Subject"
                              id="Subject"
                              placeholder="User Name"
                              value={formik.values.Subject}
                              onChange={formik.handleChange}
                            />
                            <div className='formik-error'>{formik.errors.Subject}</div>
                          </div>
                          <div className="col-12">
                            <label >Html</label>
                            <CKEditor
                              editor={ClassicEditor}
                              data={formik.values.Html}
                              class="form-control"
                              onChange={(event, editor) => {
                                const text = editor.getData();
                                setSelectedOption(text);
                              }}
                            />
                          </div>
                          <div className='formik-error'>{formik.errors.Html}</div>
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

export default EditEmailTemplate