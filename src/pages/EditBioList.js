import React from 'react'
import { useState, useEffect } from 'react'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { toast, ToastContainer } from 'react-toastify';
import {
  useGetBioListMoreInfoMutation
} from "../Store/Store";
import { Link, useParams } from 'react-router-dom'
import CryptoJS from 'crypto-js';
import Loader from '../components/loader/Loader';

const EditBioList = () => {
  const { id } = useParams();
  const [showCategory, setShowCategory] = useState({});
  const [editdates, responseInfo2] = useGetBioListMoreInfoMutation();
  const [isLoading, setIsLoading] = useState(false);
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
  useEffect(() => {
    getOneData();
  }, [])
  return (
    <>
     {isLoading && <Loader />}
      <div className="admin-wrapper">
        <ToastContainer></ToastContainer>
        <div className="">
          <div className="row g-4 justify-content-center">
            <div className='d-flex flex-wrap justify-content-end px-5'>
              <div className=''>
                <div className='btn-right'>
                  <Link className="btn btn-danger  btn-sm w-10" to="/bio-list" >
                    <i class="bi bi-chevron-double-left"></i>Back
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12">
              <Tabs className="border-0 mb-3 settings-tabs px-3">
                <Tab eventKey="" title="Bio More Info">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                      <div className="container">
                        <div className="row align-items-center">
                          <div className="col">
                            <label className="labes">Inspired</label>
                          </div>
                          <div className="col">
                            <p className='text-white'>{showCategory?.Inspired}</p>
                          </div>
                        </div>
                      </div>

                      <div className="container">
                        <div className="row align-items-center">
                          <div className="col">
                            <label className="labes">Overview</label>
                          </div>
                          <div className="col">
                            <p className='text-white'>{showCategory?.Overview}</p>
                          </div>
                        </div>
                      </div>

                      <div className="container">
                        <div className="row align-items-center">
                          <div className="col">
                            <label className="labes">created At</label>
                          </div>
                          <div className="col">
                            <p className='text-white'>
                              {new Date(showCategory?.createdAt).toLocaleString('en-US', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="container">
                        <div className="row align-items-center">
                          <div className="col">
                            <label className="labes">updated At</label>
                          </div>
                          <div className="col">
                            <p className='text-white'>
                              {new Date(showCategory?.updatedAt).toLocaleString('en-US', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
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

export default EditBioList