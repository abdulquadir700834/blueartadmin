import React from 'react'
import { useState, useEffect } from 'react'
import DashboardHeader from "../../components/dashboard/header/DashboardHeader";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import {
  useMintGiftNftMutation, useGetUserlistDetailsQuery, useGetOneGiftNFTMutation, useEditGiftNftMutation, useGetKycDetilsQueryQuery
} from "../../Store/Store";
import { useFormik } from 'formik';
import * as yup from "yup";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import Select from "react-select";
import CryptoJS from 'crypto-js';


const MintGift = () => {
  let parms = useParams()
  let navigate = useNavigate();
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryStatus, setCategoryStatus] = useState("Active");
  const [getGiftNFT, resgetGiftNFT] = useGetOneGiftNFTMutation();
  const [EditGift, resEditGift] = useEditGiftNftMutation();
  const [MintNFT, resMintNFT] = useMintGiftNftMutation();
  const GetUserList = useGetKycDetilsQueryQuery();
  const [userState, setUserState] = useState([]);
  const [selectedOptionUser, setSelectedOptionUser] = useState({ value: 'User', label: 'User' });

  const getUserList = useGetUserlistDetailsQuery();
  console.log("getUserList:", getUserList)

  const userList = getUserList?.data?.info?.map((user, index) => {
    return {
      label: user.Email,
      value: user._id,
      key: index
    }
  })

  const handleChangeSelectUser = (e) => {
    console.log(e, "option");
    setSelectedOptionUser(e)
  }

  const decryptedItem = CryptoJS.AES.decrypt(parms.id, process.env.REACT_APP_SECRET_PASS).toString(CryptoJS.enc.Utf8);



  const schema = yup.object().shape({
    UserId: yup.string()
      .required("please select a user"),
  });
  const formik = useFormik({
    initialValues: {
      Id: decodeURIComponent(decryptedItem),
      UserId: ""
    },
    validationSchema: schema,
    onSubmit: values => {
      setAPILoading(true)
      MintNFT({
        Id: values.Id,
        UserId: values.UserId
      }).then((res) => {
        setAPILoading(false)
        console.log("mintresponse:", res.data)
        if (res.data.status === true) {
          showToast(res.data.message)
          navigate('/gift');
        } else if (res.data.status === false) {
          showErroToast(res.data.message);
        }
      })
    },
  });
  const mintNFT = (id, UserId) => {

  }
  useEffect(() => {
    if (GetUserList?.status === 'fulfilled') {
      setUserState(GetUserList?.data?.info);
    }
  }, [GetUserList])
  useEffect(() => {
    getGiftNFT({
      Id: decodeURIComponent(decryptedItem)
    })
  }, [getGiftNFT])
  useEffect(() => {
    setAPILoading(true)
    if (resgetGiftNFT?.status === 'fulfilled') {
      setThumbURLstate(resgetGiftNFT?.data?.info[0]?.Thumb)
      setMediaURLstate(resgetGiftNFT?.data?.info[0]?.Media)
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
  const [MediaURLstate, setMediaURLstate] = useState("");
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
        setThumbURLstate(res.data?.Image);
      } else {
        showErroToast(res?.error?.data?.message);
      }
    })
  }
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
              <h3>Mint a Gift</h3>
              <div className="card">
                <div className="card-body p-4 p-sm-5">
                  <Form onSubmit={formik.handleSubmit}>
                    <div className="row g-4">
                      <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-6 col-form-label">Name</label>
                        <label for="inputEmail3" class="col-sm-6 col-form-label">{resgetGiftNFT?.data?.info[0].Name}</label>
                      </div>
                      <div className="container pt-3">
                        <div className="row align-items-center">
                          <div className="col">
                            <label className="labes">Thumb</label>
                          </div>
                          {<img height="500px" alt="" className="gift-image-pre" src={ThumbURLstate}></img>}
                        </div>
                      </div>
                      <div className="container pt-3">
                        <div className="row align-items-center">
                          <div className="col">
                            <label className="labes">Media</label>
                          </div>
                          {<img alt="" className="gift-image-pre" src={MediaURLstate}></img>}
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-6 col-form-label">Status</label>
                        <label for="inputEmail3" class="col-sm-6 col-form-label">{resgetGiftNFT?.data?.info[0]?.Status}</label>
                      </div>
                      <br />
                      <br />

                      <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-6 col-form-label">User</label>
                        <div className='col-sm-6'>
                          <Select
                            options={userList}
                            placeholder="Select a User"
                            onChange={(selectedOption) => formik.setFieldValue('UserId', selectedOption.value)}
                          />
                          <div className="form-error">{formik.errors.UserId}</div>
                        </div>
                      </div>

                      <div className="col-12">
                      </div>

                      <div className="col-12">
                        <input onClick={(e) => mintNFT()} disabled={apiLoading}
                          className="btn btn-primary w-100 rounded-pill"
                          type="submit" value="MINT"
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

export default MintGift;
