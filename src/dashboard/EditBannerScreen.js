import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import Loader from '../components/loader/Loader';

const EditBannerScreen = ({ setting }) => {
  const { key, cdn } = useParams();
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [logoFile, setLogoFile] = useState("");
  const [inputImage, setInputImage] = useState("");

  const formik = useFormik({
    initialValues: {
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      setIsLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("myToken")}`,
        },
      };

      var formData = new FormData();
      formData.append("Type", key);
      if (logoFile) {
        formData.append("Section1Image", logoFile);
      }

      setIsLoading(true);
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}UpdateBannerVideo`,
          formData,
          config,
          {}
        )
        .then((res) => {
          if (res?.data?.status) {
            let obj = {
              Type: key,
              Image: res.data.Image,
            };
            axios
              .post(
                `${process.env.REACT_APP_BACKEND_URL}UpdateBanner`,
                obj,
                config,
                {}
              )
              .then((res) => {
                setInputImage(res.data.Image);
              });
            setIsLoading(false);
            toast.success(res?.data?.message);
            setTimeout(() => navigate("/banner"), 1000);
          } else {
            toast.error(res?.data?.message);
            setIsLoading(false);
          }
        });
    },
  });

  const ImagehandleChange = (e) => {
    setLogoFile(e.target.files[0]);
    setInputImage(URL.createObjectURL(e.target.files[0]));
  };

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
                  <Link className="btn btn-danger  btn-sm w-10" to="/banner" >
                    <i class="bi bi-chevron-double-left"></i>Back
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <Tabs className="border-0 mb-3 settings-tabs">
                <Tab eventKey="" title="Edit Banner">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                      <Form
                        onSubmit={formik.handleSubmit}
                      >
                        <div className="row g-4">
                          <div className="container pt-3">
                            <div className="row align-items-center">
                              <div className="col">
                                <p className="labes">Title</p>
                              </div>
                              <div className='col-6'>
                                <p className='text-white'>{key}</p>
                              </div>
                            </div>
                          </div>

                          <div className="container pt-3">
                            <div className="row align-items-center">
                              <div className="col">
                                <label className="labes">Video</label>
                              </div>
                              <div className="col">
                                <input className="form-control card shadow w-100"
                                  type="file" name="Image"
                                  placeholder="Video"
                                  id="Image"
                                  onChange={(e) => ImagehandleChange(e)}
                                />

                                {inputImage === "" ? (
                                  <div>
                                    <video className="banner-video-pre" controls>
                                      <source src={decodeURIComponent(cdn)} type="video/mp4" />
                                    </video></div>
                                ) : (
                                  <video className="banner-video-pre" controls>
                                    <source src={inputImage} type="video/mp4" />
                                  </video>
                                )}
                              </div>
                            </div>
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

export default EditBannerScreen