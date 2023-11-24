import React from 'react'
import { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import {
  useAddArtistCategoryMutation, useAddGiftNftMutation
} from "../../Store/Store";
import { useFormik } from 'formik';
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';

const Gift = () => {
  let navigate = useNavigate();
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryStatus, setCategoryStatus] = useState("Active");
  const [addMaterial, responseInfo] = useAddArtistCategoryMutation();
  const [addGift, resaddGift] = useAddGiftNftMutation();
  const [inputImage, setInputImage] = useState("");
  const [inputImageMedia, setInputImageMedia] = useState("");
  const [logoFile, setLogoFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiLoading, setAPILoading] = useState(false);

  const ImagehandleChange = (e) => {
    setLogoFile(e.target.files[0])
    setInputImage(URL.createObjectURL(e.target.files[0]));
  }

  const ImagehandleChangeMedia = (e) => {
    setLogoFile(e.target.files[0])
    setInputImageMedia(URL.createObjectURL(e.target.files[0]));
  }

  const fetchData = async () => {
    setAPILoading(true)
    const token = sessionStorage.getItem('myToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    var formData = new FormData();
    formData.append("Type", "ArtistCategory")
    if (logoFile) {
      formData.append("Image", logoFile);
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}UpdateArtistCategoryImage`, formData, config)
      .then((res) => {
        const newPost = {
          "Title": categoryTitle,
          "Status": categoryStatus,
          "Image": res.data?.Image
        }
        addMaterial(newPost)
        setAPILoading(false)
      })
      .catch((error) => {
        setAPILoading(false)
        console.error(error);
      });
  };

  const schema = yup.object().shape({
    Name: yup.string()
      .min(4, "Gift name must be a four letters")
      .required("Gift name is required"),
    Thumb: yup.mixed().required('Thumb image is required').test(
      'fileFormat',
      'Unsupported Format',
      (value) => {
        if (!value) return false;
        return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
      },
    ),
    Media: yup.mixed().required('Media image is required').test(
      'fileFormat',
      'Unsupported Format',
      (value) => {
        if (!value) return false;
        return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
      },
    ),
    Currency: yup.string()      
      .required("Currency is required"),
  });
  const formik = useFormik({
    initialValues: {
      Name: "",
      Thumb: null,
      Media: null,
      Currency: ""
    },
    validationSchema: schema,
    onSubmit: values => {
      setAPILoading(true)
      addGift({
        Name: values.Name,
        Thumb: ThumbURLstate,
        IPFSThumb:ThumbIPFSURLstate,
        IPFSMedia:MediaIPFSURLstate,
        Media: MediaURLstate,
        Status: values.Status,
        Currency:values.Currency
      }).then((res) => {
        setAPILoading(false)
        if (res.data.status) {
          showToast(res.data.info)
           window.location.pathname = '/gift';
        } else {
          showErroToast(res.data.info);
        }
      }).catch((error) => {
        setAPILoading(false);
        if (error.response && error.response.StatusCode === 403) {
          // Handle 403 error (API data is available in error.response.data)
          console.log("API data for 403 error:", error.response.data);
          // Display the API data as required
        } else {
          // Handle other errors
          console.error("Error:", error);
        }
      });
    },
  });

  const handleSubmit = async (e) => {
    setAPILoading(true)
    fetchData()
    e.preventDefault();
  }


  useEffect(() => {
    if (responseInfo?.data?.status) {
      setAPILoading(false)
      toast?.success(responseInfo?.data?.info)
       setTimeout(() => navigate("/artist-categories"), 2000);
    } else if(responseInfo?.data?.info){
      setAPILoading(false)
      toast?.error(responseInfo?.data?.info)
    }
  }, [responseInfo])
  const updateMediaupload = async (file) => {
    let formdata = new FormData();
    formdata.append("Type", "Media")
    formdata.append("Media", file)
    const response = axios.post(`${process.env.REACT_APP_BACKEND_URL}GiftNftMedia`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${sessionStorage.getItem("myToken")}`
      }
    })
    response.then(res => {
      if (res?.data?.status) {
        setMediaURLstate(res.data?.Image);
        setMediaIPFSURLstate(res.data?.IPFSImage)
      } else {
        showErroToast(res?.error?.data?.message);
      }
    })
  }
  const showToast = (text) => {
    toast.success(text)
  }
  const showErroToast = (text) => {
    toast.error(text);
  }
  const [ThumbURLstate, setThumbURLstate] = useState("");
  const [ThumbIPFSURLstate, setThumbIPFSURLstate] = useState("");
  const [MediaURLstate, setMediaURLstate] = useState("");
  const [MediaIPFSURLstate, setMediaIPFSURLstate] = useState("");

  const updateThumbupload = async (file) => {
    let formdata = new FormData();
    formdata.append("Type", "Thumb")
    formdata.append("Thumb", file)
    const response = axios.post(`${process.env.REACT_APP_BACKEND_URL}GiftNftThumb`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${sessionStorage.getItem("myToken")}`
      }
    })
    response.then(res => {
      if (res?.data?.status) {
        setThumbURLstate(res.data?.Image);
        setThumbIPFSURLstate(res.data?.IPFSImage)
      } else {
        showErroToast(res?.error?.data?.message);
      }
    })
  }
  return (
    <>
      {apiLoading && <Loader />}
      <div className="admin-wrapper">
        <ToastContainer></ToastContainer>
        <div className="container">
          <div className="row g-4 justify-content-center">
          <div className='d-flex flex-wrap justify-content-end px-5'>
                        <div className=''>
                            <div className='btn-right'>
                                <Link className="btn btn-danger  btn-sm w-10" to="/gift" >
                                <i class="bi bi-chevron-double-left"></i>Back
                                </Link>
                            </div>
                        </div>
                    </div>

            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <h3>Add Gift</h3>
              <div className="card">
                <div className="card-body p-4 p-sm-5">
                  <Form onSubmit={formik.handleSubmit}>
                    <div className="row g-4">
                      <div className="col-12">
                        <input
                          className="form-control card shadow"
                          type="text"
                          id="name"
                          name="Name"
                          placeholder="Gift name"
                          onChange={formik.handleChange}
                          value={formik.values.Name}
                        />
                        <div className='form-error '>{formik?.errors?.Name}</div>
                      </div>
                      <div className="container pt-3">
                        <div className="row align-items-center">
                          <div className="col">
                            <label className="labes">Thumb</label>
                          </div>
                          <div className="col">
                            <input className="form-control card shadow w-100"
                              type="file" name="Thumb"
                              placeholder="Image"
                              id="Image"
                              required
                              onChange={(e) => {
                                ImagehandleChange(e)
                                formik.setFieldValue('Thumb', e.currentTarget.files[0])
                                updateThumbupload(e.currentTarget.files[0])
                              }}
                            />
                            {inputImage === "" ? "" : <img alt="" className="banner-image-pre" src={inputImage}></img>}

                          </div>
                        </div>
                      </div>
                      <div className="container pt-3">
                        <div className="row align-items-center">
                          <div className="col">
                            <label className="labes">Media</label>
                          </div>
                          <div className="col">
                            <input className="form-control card shadow w-100"
                              type="file"
                              placeholder="Image"
                              id="Image"
                              name="Media"
                              required
                              onChange={(e) => {
                                ImagehandleChangeMedia(e)
                                formik.setFieldValue('Media', e.currentTarget.files[0])
                                updateMediaupload(e.currentTarget.files[0])
                              }}
                            />
                            {inputImageMedia === "" ? "" : <img alt="" className="banner-image-pre" src={inputImageMedia}></img>}

                          </div>
                        </div>
                      </div>
                      <div className="container pt-3">
                        <div className="row align-items-center">
                          <div className="col">
                            <label htmlFor="block" className="form-label">Currency</label>
                          </div>
                          <div className="col">
                            <select className="form-control card shadow form-select" name="Currency" onChange={formik.handleChange} value={formik.values.Currency} 
                            aria-label="Default select example">
                              <option value=""></option>
                              <option value="ETH">ETH</option>
                              <option value="MATIC">MATIC</option>
                            </select>
                          </div>
                        </div>
                        <div className="errors">{formik.errors.Currency}</div>
                      </div>
                      <div className="col-12">
                        <input 
                          className="btn btn-primary w-100 rounded-pill"
                          type="submit"
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

export default Gift;
