import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import DashboardHeader from "../components/dashboard/header/DashboardHeader";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { toast, ToastContainer } from 'react-toastify';
import {
    useEditUserAgreementMutation,
  useGetOneUserRoleInfoMutation
} from "../Store/Store";
import { Link, useParams } from 'react-router-dom';
import Editor from '../components/CkEditor/CkEditor';
import CryptoJS from 'crypto-js';
import Loader from '../components/loader/Loader';

const ViewUserRole = () => {
  const { id } = useParams();
    //ck
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      setEditorLoaded(true);
    }, []);
    //ck

  const [showCategory, setShowCategory] = useState({});
  const [editdates, responseInfo2] = useGetOneUserRoleInfoMutation();
  const [editCategory, responseInfo] = useEditUserAgreementMutation();
  console.log("category data", responseInfo)

  const decryptedItem = CryptoJS.AES.decrypt(id, process.env.REACT_APP_SECRET_PASS).toString(CryptoJS.enc.Utf8);

  const getOneData = async () => {
    setIsLoading(true)
    const updateUserDetails = await editdates({ "Id": decodeURIComponent(decryptedItem) })
    .then(res => {
      setShowCategory(res?.data?.info, "res")
      setIsLoading(false)
    })
    console.log(updateUserDetails, "details")
  }

  useEffect(()=>{
    getOneData();
  },[])

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
                                <Link className="btn btn-danger  btn-sm w-10" to="/user-role" >
                                <i class="bi bi-chevron-double-left"></i>Back
                                </Link>
                            </div>
                        </div>
                    </div>
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <Tabs className="border-0 mb-3 settings-tabs">
                <Tab eventKey="" title="View User Role">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                        <h6>Content</h6>
                        <p className='text-white'>{showCategory.Agreement}</p>
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

export default ViewUserRole