import React, { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from 'react-router-dom';
import { useGetTestimonialMoreInfoMutation, useSingleUserDetailsQuery, useUpdateTestimonialMutation } from "../Store/Store";
import { useFormik } from "formik";
import Select from "react-select"
import Loader from '../components/loader/Loader';
import CryptoJS from 'crypto-js';

const options = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
]

const TestimonialUpdate = () => {
  let navigate = useNavigate()
  const { id } = useParams();
  const { data } = useSingleUserDetailsQuery(id);
  const [createPost2, responseInfo2] = useGetTestimonialMoreInfoMutation()
  const [createPost, responseInfo] = useUpdateTestimonialMutation();
  const [getOneSpecificData, setGetOneSpecificData] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ value: `${getOneSpecificData?.Status}`, label: `${getOneSpecificData?.Status}` });
  console.log("single user data", data);

  const decryptedItem = CryptoJS.AES.decrypt(id, process.env.REACT_APP_SECRET_PASS).toString(CryptoJS.enc.Utf8);

  const getOneData = async () => {
    setIsLoading(true)
    const updateUserDetails = await createPost2({ "Id": decodeURIComponent(decryptedItem) })
    .then(res => {
      setGetOneSpecificData(res?.data?.info, "res")
      setIsLoading(false)
    })
    console.log(updateUserDetails, "details")
  }
  console.log("createPost2", createPost2)
  useEffect(() => {
    getOneData()
  }, [])

  useEffect(() => {
    setSelectedOption({ value: `${getOneSpecificData?.Status}`, label: `${getOneSpecificData?.Status}` })
  }, [getOneSpecificData])

  const formik = useFormik({
    initialValues: {
      Status: ""
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      setIsLoading(true)
      let postData = {
        Id: decodeURIComponent(decryptedItem),
        Status: selectedOption.value,
      }
      console.log(postData, "postData")

      createPost(postData).then(res => {
        debugger;
        if (res?.data?.status !== false) {
          setIsLoading(false)
          toast.success(res?.data?.info)
          setTimeout(() => navigate("/testimonial"), 1500);
        } else {
          toast.error(res?.data?.message)
          setIsLoading(false)
        }
      })
      console.log(responseInfo, postData, "response")
    },
  });

  const handleChangeSelect = (e) => {
    console.log(e, "option");
    setSelectedOption(e)
  }

  return (
    <>
      <div className="admin-wrapper">
        <ToastContainer></ToastContainer>
        {isLoading && <Loader />}
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className='d-flex flex-wrap justify-content-end px-5'>
              <div className=''>
                <div className='btn-right'>
                  <Link className="btn btn-danger  btn-sm w-10" to="/testimonial" >
                    <i class="bi bi-chevron-double-left"></i>Back
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <Tabs className="border-0 mb-3 settings-tabs">
                <Tab eventKey="" title="Edit Testimonial">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                      <Form onSubmit={formik.handleSubmit} >
                        <div className="row g-4">
                          <div className="col-12">
                            <label >Status</label>
                            <Select options={options} placeholder="Select a brand"
                              value={selectedOption}
                              onChange={handleChangeSelect}
                            />
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

export default TestimonialUpdate