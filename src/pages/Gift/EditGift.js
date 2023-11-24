import React from 'react'
import { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import {
  useAddGiftNftMutation, useGetOneGiftNFTMutation, useEditGiftNftMutation
} from "../../Store/Store";
import { useFormik } from 'formik';
import * as yup from "yup";
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { Link } from 'react-router-dom';
import CryptoJS from 'crypto-js';


const EditGift = () => {
  let parms = useParams()
  let navigate = useNavigate();
  const [getGiftNFT, resgetGiftNFT] = useGetOneGiftNFTMutation();
  const [EditGift, resEditGift] = useEditGiftNftMutation();

  const schema = yup.object().shape({
    Name: yup.string()
      .min(4, "Gift name must be a four letters")
      .required("Gift name is required"),
    Thumb: yup.mixed().test(
      'fileFormat',
      'Unsupported Format',
      (value) => {
        if (!value) return true;
        return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
      },
    ),
    Media: yup.mixed().test(
      'fileFormat',
      'Unsupported Format',
      (value) => {
        if (!value) return true;
        return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
      },
    ),
  });
  const formik = useFormik({
    initialValues: {
      Name: "",
      Thumb: null,
      Media: null,
      Id: "",
      Status: "",
      Currency: ""
    },
    validationSchema: schema,
    onSubmit: values => {
      setAPILoading(true)
      EditGift({
        Name: values.Name,
        Thumb: ThumbURLstate|| ThumbURLstateOne,
        Media: MediaURLstate || MediaURLstateOne,
        IPFSThumb: ThumbIPFSURLstate,
        IPFSMedia: MediaIPFSURLstate,
        Status: values.Status,
        Id: values.Id,
        Currency: values.Currency
      }).then((res) => {
        setAPILoading(false)
        if (res.data.status) {
          showToast(res.data.info)
          navigate('/gift');
        } else {
          showErroToast(res.data.info);
        }
      })
    },
  });

  const decryptedItem = CryptoJS.AES.decrypt(parms.id, process.env.REACT_APP_SECRET_PASS).toString(CryptoJS.enc.Utf8);

  useEffect(() => {
    getGiftNFT({
      Id: decodeURIComponent(decryptedItem)
    })
  }, [getGiftNFT])
  useEffect(() => {
    setAPILoading(true)
    if (resgetGiftNFT?.status === 'fulfilled') {
      formik.setValues({
        Name: resgetGiftNFT?.data?.info[0]?.Name,
        Id: resgetGiftNFT?.data?.info[0]?._id,
        Status: resgetGiftNFT?.data?.info[0]?.Status,
        Currency: resgetGiftNFT?.data?.info[0]?.Currency
      })
      setThumbURLstateOne(resgetGiftNFT?.data?.info[0]?.Thumb)
      setMediaURLstateOne(resgetGiftNFT?.data?.info[0]?.Media)
      setAPILoading(false)
    }
  }, [resgetGiftNFT])
  const updateMediaupload = async (file) => {
    setAPILoading(true)
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
      console.log("res", res);
      setAPILoading(false)
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
  const [ThumbURLstateOne, setThumbURLstateOne] = useState("");
  const [MediaURLstate, setMediaURLstate] = useState("");
  const [MediaURLstateOne, setMediaURLstateOne] = useState("");
  const [ThumbIPFSURLstate, setThumbIPFSURLstate] = useState("");
  const [MediaIPFSURLstate, setMediaIPFSURLstate] = useState("");

  const [apiLoading, setAPILoading] = useState(false);
  const updateThumbupload = async (file) => {
    setAPILoading(true)
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
      setAPILoading(false)
      if (res?.data?.status) {
        setAPILoading(false)
        setThumbURLstate(res.data?.Image);
        setThumbIPFSURLstate(res.data?.IPFSImage)
        console.log("ThumbURLstateImage:" , res.data?.Image)
      } else {
        showErroToast(res?.error?.data?.message);
      }
    })
  }
console.log("ThumbURLstateImage:" , ThumbURLstate)
  return (
    <>
      <div className="admin-wrapper">
        <ToastContainer></ToastContainer>
        {apiLoading && <Loader />}
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
              <h3>Edit Gift</h3>
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

                          {ThumbURLstate ? 
                            <img height="500px" alt="" className="gift-image-pre" src={ThumbURLstate.CImage}></img>
                             : 
                            <img height="500px" alt="" className="gift-image-pre" src={ThumbURLstateOne}></img>
                          }

                          <div className="col">
                            <label className="labes">Thumb</label>
                          </div>

                          <div className="col">
                            <input className="form-control card shadow w-100"
                              type="file" name="Thumb"
                              placeholder="Image"
                              id="Image"
                              onChange={(e) => {
                                formik.setFieldValue('Thumb', e.currentTarget.files[0])
                                updateThumbupload(e.currentTarget.files[0])
                              }}
                            />
                            <div className='form-error '>{formik?.errors?.Thumb}</div>
                          </div>
                        </div>
                      </div>
                      <div className="container pt-3">
                        <div className="row align-items-center">
                          {MediaURLstate ? 
                            <img height="500px" alt="" className="gift-image-pre" src={MediaURLstate.CImage}></img>
                             : 
                            <img height="500px" alt="" className="gift-image-pre" src={MediaURLstateOne}></img>
                          }
                          <div className="col">
                            <label className="labes">Media</label>
                          </div>
                          <div className="col">
                            <input className="form-control card shadow w-100"
                              type="file"
                              placeholder="Image"
                              id="Image"
                              name="Media"
                              onChange={(e) => {
                                formik.setFieldValue('Media', e.currentTarget.files[0])
                                updateMediaupload(e.currentTarget.files[0])
                              }}
                            />
                            <div className='form-error '>{formik?.errors?.Media}</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="col">
                          <label htmlFor="block" className="form-label">Status</label>
                        </div>
                        <select className="filter-select bg-gray w-100" name="Status"
                          onChange={formik.handleChange}
                        >
                          <option selected={resgetGiftNFT?.data?.info[0]?.Status === 'Active'} value="Active" >Active</option>
                          <option selected={resgetGiftNFT?.data?.info[0]?.Status === 'Inactive'} value="Inactive" >Inactive</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <div className="col">
                          <label htmlFor="block" className="form-label">Currency</label>
                        </div>
                        <select className="filter-select bg-gray w-100" name="Currency" onChange={formik.handleChange} value={formik.values.Currency} >
                          <option value="">Select a chain</option>
                          <option selected={formik.values?.Currency === "ETH"} value="ETH">ETH</option>
                          <option selected={formik.values?.Currency === "MATIC"} value="MATIC">MATIC</option>
                        </select>
                      </div>
                      <div className="errors">{formik.errors.Currency}</div>
                      <div className="col-12">
                        <input disabled={apiLoading}
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

export default EditGift;
