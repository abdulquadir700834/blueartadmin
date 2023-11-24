import React from 'react'
import { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  useUpdateMaterialSectionMutation
} from "../Store/Store";
import { useParams } from 'react-router-dom'
import CryptoJS from 'crypto-js';
import Loader from '../components/loader/Loader';

const ViewMaterial = () => {
  const { id } = useParams();
  const [showCategory, setShowCategory] = useState({});
  const [editdates, responseInfo2] = useUpdateMaterialSectionMutation();
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
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className='d-flex flex-wrap justify-content-end px-5'>
              <div className=''>
                <div className='btn-right'>
                  <Link className="btn btn-danger  btn-sm w-10" to="/material" >
                    <i class="bi bi-chevron-double-left"></i>Back
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <Tabs className="border-0 mb-3 settings-tabs">
                <Tab eventKey="" title="View Material">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                      <Form>
                        <div className="row g-4">
                          <div className="col-12 d-flex flex-wrap align-items-center">
                            <div className='col-6'>
                              <h6>Title</h6>
                            </div>
                            <div className='col-6'>
                              <input
                                className="form-control card shadow"
                                type="text"
                                id="name"
                                name="title"
                                readOnly
                                placeholder="Your Category Title..."
                                value={showCategory.Title}
                                onChange={e => {
                                  setShowCategory({
                                    ...showCategory,
                                    Title: e.target.value
                                  })
                                }}
                              />
                            </div>
                          </div>

                          <div className="col-12 d-flex flex-wrap align-items-center">
                            <div className='col-6'>
                              <h6>Status</h6>
                            </div>
                            <div className='col-6'>
                              <p className='text-white'>{showCategory.Status}</p>
                            </div>
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

export default ViewMaterial