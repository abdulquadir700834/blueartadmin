import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { toast, ToastContainer } from 'react-toastify';
import {
  useEditNewsMutation,
  useGetOneTeamMutation
} from "../Store/Store";
import { useParams } from 'react-router-dom'
import { Modal } from 'react-bootstrap';
import CryptoJS from 'crypto-js';
import Loader from '../components/loader/Loader';

const ViewTeams = () => {
  const { id } = useParams();
  const [showCategory, setShowCategory] = useState({});
  const [editdates, responseInfo2] = useGetOneTeamMutation();
  const [isImageBig, setIsImageBig] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleImageSize = () => {
    setIsImageBig(!isImageBig);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsImageBig(true);
  };

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
                  <Link className="btn btn-danger  btn-sm w-10" to="/teams" >
                    <i class="bi bi-chevron-double-left"></i>Back
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <Tabs className="border-0 mb-3 settings-tabs">
                <Tab eventKey="" title="View Teams">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                      <Form>
                        <div className="row g-4">
                          <div className="col-12 d-flex flex-wrap align-items-center">
                            <div className='col-6'>
                              <h6>Name</h6>
                            </div>
                            <div className='col-6'>
                              <p className='text-white'>{showCategory.Name}</p>

                            </div>
                          </div>
                          <div className='col-12 d-flex flex-wrap align-items-center'>
                            <div className='col-6'>
                              <h6>Position</h6>
                            </div>
                            <div className='col-6'>
                              <p className='text-white'>{showCategory.Position}</p>
                            </div>
                          </div>
                          <div className='col-12 d-flex flex-wrap align-items-center'>
                            <div className='col-6'>
                              <h6>Image</h6>
                            </div>
                            <div className='col-6'>
                              <img src={showCategory?.Image} style={{ width: "80px", height: "80px" }}
                                onClick={() => handleImageClick(showCategory?.Image)} />
                            </div>
                          </div>
                          <div className="col-12 d-flex flex-wrap align-items-center">
                            <div className='col-6'>
                              <h6>Facebook</h6>
                            </div>
                            <div className='col-6'>
                              <p className='text-white'>{showCategory.Facebook}</p>
                            </div>
                          </div>
                          <div className="col-12 d-flex flex-wrap align-items-center">
                            <div className='col-6'>
                              <h6>Linkedin</h6>
                            </div>
                            <div className='col-6'>
                              <p className='text-white'>{showCategory.Linkedin}</p>
                            </div>
                          </div>
                          <div className="col-12 d-flex flex-wrap align-items-center">
                            <div className='col-6'>
                              <h6>Instagram</h6>
                            </div>
                            <div className='col-6'>
                              <p className='text-white'>{showCategory.Instagram}</p>
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
      <Modal show={isImageBig} onHide={toggleImageSize} centered>
        <Modal.Body>
          {selectedImage && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={selectedImage}
                style={{ maxWidth: "100%", }}
                alt="Expanded Image"
              />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ViewTeams